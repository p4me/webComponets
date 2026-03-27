import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { SearchCategory, SearchResult, SearchEventDetail } from './types/search.types.js';

/**
 * Banking Search Component
 *
 * @fires banking-search - Fired when the user submits a search. Detail: { query, category }
 * @fires banking-search-select - Fired when a result is selected. Detail: { result }
 * @fires banking-search-clear - Fired when the search is cleared.
 *
 * @attr {string} placeholder - Input placeholder text
 * @attr {boolean} loading - Shows a loading spinner in the results area
 * @attr {boolean} disabled - Disables the entire component
 * @attr {string} value - Current search query (reflected)
 */
@customElement('banking-search')
export class BankingSearch extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: inherit;
      --search-primary: #0057b8;
      --search-border: #d1d5db;
      --search-border-focus: #0057b8;
      --search-bg: #ffffff;
      --search-bg-hover: #f3f4f6;
      --search-text: #111827;
      --search-text-muted: #6b7280;
      --search-radius: 8px;
      --search-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      --search-chip-bg: #e0edff;
      --search-chip-color: #0057b8;
    }

    .wrapper {
      position: relative;
      width: 100%;
    }

    .search-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 12px;
      border: 1.5px solid var(--search-border);
      border-radius: var(--search-radius);
      background: var(--search-bg);
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .search-bar:focus-within {
      border-color: var(--search-border-focus);
      box-shadow: 0 0 0 3px rgba(0, 87, 184, 0.15);
    }

    .search-bar.disabled {
      opacity: 0.5;
      pointer-events: none;
      background: #f9fafb;
    }

    .icon {
      flex-shrink: 0;
      color: var(--search-text-muted);
      display: flex;
      align-items: center;
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font-size: 15px;
      color: var(--search-text);
      padding: 12px 0;
      min-width: 0;
    }

    input::placeholder {
      color: var(--search-text-muted);
    }

    .clear-btn {
      flex-shrink: 0;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--search-text-muted);
      padding: 4px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      transition: background 0.15s, color 0.15s;
    }

    .clear-btn:hover {
      background: var(--search-bg-hover);
      color: var(--search-text);
    }

    .category-bar {
      display: flex;
      gap: 6px;
      margin-top: 8px;
      flex-wrap: wrap;
    }

    .chip {
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 13px;
      border: 1.5px solid var(--search-border);
      background: var(--search-bg);
      color: var(--search-text-muted);
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
    }

    .chip:hover {
      border-color: var(--search-border-focus);
      color: var(--search-primary);
    }

    .chip.active {
      background: var(--search-chip-bg);
      border-color: var(--search-primary);
      color: var(--search-chip-color);
      font-weight: 600;
    }

    .dropdown {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      right: 0;
      background: var(--search-bg);
      border: 1.5px solid var(--search-border);
      border-radius: var(--search-radius);
      box-shadow: var(--search-shadow);
      z-index: 100;
      overflow: hidden;
    }

    .result-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      cursor: pointer;
      transition: background 0.15s;
    }

    .result-item:hover,
    .result-item.focused {
      background: var(--search-bg-hover);
    }

    .result-icon {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 15px;
      background: var(--search-chip-bg);
      color: var(--search-primary);
    }

    .result-text {
      flex: 1;
      min-width: 0;
    }

    .result-title {
      font-size: 14px;
      font-weight: 500;
      color: var(--search-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .result-subtitle {
      font-size: 12px;
      color: var(--search-text-muted);
      margin-top: 1px;
    }

    .result-meta {
      font-size: 12px;
      color: var(--search-text-muted);
      flex-shrink: 0;
    }

    .no-results {
      padding: 20px 14px;
      text-align: center;
      color: var(--search-text-muted);
      font-size: 14px;
    }

    .loading-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 18px;
      color: var(--search-text-muted);
      font-size: 14px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .spinner {
      width: 18px;
      height: 18px;
      border: 2px solid var(--search-border);
      border-top-color: var(--search-primary);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
  `;

  @property({ type: String, reflect: true }) value = '';
  @property({ type: String }) placeholder = 'Search accounts, transactions, customers…';
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Results to display — set these from outside after handling the `banking-search` event */
  @property({ type: Array }) results: SearchResult[] = [];

  @state() private _category: SearchCategory = 'all';
  @state() private _open = false;
  @state() private _focusedIndex = -1;

  @query('input') private _input!: HTMLInputElement;

  private readonly _categories: { value: SearchCategory; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'account', label: 'Accounts' },
    { value: 'customer', label: 'Customers' },
    { value: 'transaction', label: 'Transactions' },
  ];

  private get _filteredResults(): SearchResult[] {
    if (this._category === 'all') return this.results;
    return this.results.filter((r) => r.category === this._category);
  }

  private _categoryIcon(cat: SearchCategory): string {
    const icons: Record<SearchCategory, string> = {
      all: '🔍',
      account: '🏦',
      customer: '👤',
      transaction: '💳',
    };
    return icons[cat];
  }

  private _onInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this._focusedIndex = -1;

    if (this.value.trim().length > 0) {
      this._open = true;
      this._dispatchSearch();
    } else {
      this._open = false;
    }
  }

  private _onKeyDown(e: KeyboardEvent) {
    const items = this._filteredResults;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._focusedIndex = Math.min(this._focusedIndex + 1, items.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._focusedIndex = Math.max(this._focusedIndex - 1, -1);
    } else if (e.key === 'Enter') {
      if (this._focusedIndex >= 0 && items[this._focusedIndex]) {
        this._selectResult(items[this._focusedIndex]);
      } else {
        this._dispatchSearch();
      }
    } else if (e.key === 'Escape') {
      this._open = false;
      this._focusedIndex = -1;
    }
  }

  private _dispatchSearch() {
    this.dispatchEvent(
      new CustomEvent<SearchEventDetail>('banking-search', {
        detail: { query: this.value.trim(), category: this._category },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _selectResult(result: SearchResult) {
    this.dispatchEvent(
      new CustomEvent('banking-search-select', {
        detail: { result },
        bubbles: true,
        composed: true,
      })
    );
    this._open = false;
  }

  private _clear() {
    this.value = '';
    this.results = [];
    this._open = false;
    this._focusedIndex = -1;
    this._input?.focus();
    this.dispatchEvent(new CustomEvent('banking-search-clear', { bubbles: true, composed: true }));
  }

  private _setCategory(cat: SearchCategory) {
    this._category = cat;
    this._focusedIndex = -1;
    if (this.value.trim()) this._dispatchSearch();
  }

  private _renderDropdown() {
    if (!this._open) return nothing;

    const results = this._filteredResults;

    return html`
      <div class="dropdown" role="listbox">
        ${this.loading
          ? html`<div class="loading-row"><div class="spinner"></div> Searching…</div>`
          : results.length === 0
          ? html`<div class="no-results">No results found for "<strong>${this.value}</strong>"</div>`
          : results.map(
              (r, i) => html`
                <div
                  class=${classMap({ 'result-item': true, focused: this._focusedIndex === i })}
                  role="option"
                  @click=${() => this._selectResult(r)}
                >
                  <div class="result-icon">${this._categoryIcon(r.category)}</div>
                  <div class="result-text">
                    <div class="result-title">${r.title}</div>
                    <div class="result-subtitle">${r.subtitle}</div>
                  </div>
                  ${r.meta ? html`<div class="result-meta">${r.meta}</div>` : nothing}
                </div>
              `
            )}
      </div>
    `;
  }

  render() {
    return html`
      <div class="wrapper">
        <div class=${classMap({ 'search-bar': true, disabled: this.disabled })}>
          <span class="icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>

          <input
            type="search"
            autocomplete="off"
            spellcheck="false"
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            aria-label="Search banking information"
            aria-autocomplete="list"
            aria-expanded=${this._open ? 'true' : 'false'}
            @input=${this._onInput}
            @keydown=${this._onKeyDown}
            @focus=${() => { if (this.value.trim()) this._open = true; }}
            @blur=${() => setTimeout(() => { this._open = false; }, 150)}
          />

          ${this.value
            ? html`
              <button class="clear-btn" aria-label="Clear search" @click=${this._clear}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>`
            : nothing}
        </div>

        <div class="category-bar" role="tablist" aria-label="Search category">
          ${this._categories.map(
            (c) => html`
              <button
                class=${classMap({ chip: true, active: this._category === c.value })}
                role="tab"
                aria-selected=${this._category === c.value ? 'true' : 'false'}
                @click=${() => this._setCategory(c.value)}
              >${c.label}</button>
            `
          )}
        </div>

        ${this._renderDropdown()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'banking-search': BankingSearch;
  }
}
