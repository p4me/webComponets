import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { SearchCategory, SearchCategory_Option, SearchResult, SearchEventDetail } from './types/search.types.js';

/**
 * Smart Search — Web Component
 *
 * @fires smart-search        — search requested  { query, category }
 * @fires smart-search-select — result selected   { result }
 * @fires smart-search-clear  — input cleared
 *
 * @attr placeholder  — input placeholder text
 * @attr loading      — show spinner while fetching
 * @attr disabled     — disable the component
 * @attr value        — current search query (reflected)
 */
@customElement('smart-search')
export class SmartSearch extends LitElement {
  static styles = css`
    /* ── Light theme (default) ── */
    :host {
      display: block;

      /*
       * ── Branding tokens ──────────────────────────────────────────────────────
       * Override any of these from outside to apply custom branding:
       *
       *   smart-search {
       *     --search-font-family: 'Inter', sans-serif;
       *     --search-font-size:   15px;
       *     --search-primary:     #e63946;
       *     --search-radius:      4px;
       *   }
       *
       * Or inline:
       *   <smart-search style="--search-primary:#e63946;">
       * ─────────────────────────────────────────────────────────────────────── */
      --search-font-family:  -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --search-font-size:    14px;
      --search-primary:      #0057b8;
      --search-border:       #9ca3af;
      --search-border-focus: #0057b8;
      --search-bg:           #ffffff;
      --search-bg-hover:     #f3f4f6;
      --search-text:         #111827;
      --search-text-muted:   #6b7280;
      --search-radius:       8px;
      --search-shadow:       0 4px 12px rgba(0, 0, 0, 0.10);
      --search-chip-bg:      #e0edff;
      --search-chip-color:   #0057b8;

      font-family: var(--search-font-family);
      font-size:   var(--search-font-size);
    }

    /* ── Dark theme (explicit) ── */
    :host([theme="dark"]) {
      --search-primary:      #4d9eff;
      --search-border:       #374151;
      --search-border-focus: #4d9eff;
      --search-bg:           #1e293b;
      --search-bg-hover:     #273549;
      --search-text:         #f1f5f9;
      --search-text-muted:   #94a3b8;
      --search-shadow:       0 4px 12px rgba(0, 0, 0, 0.40);
      --search-chip-bg:      #1e3a5f;
      --search-chip-color:   #4d9eff;
    }

    /* ── Auto: follow OS preference when theme="auto" or unset ── */
    @media (prefers-color-scheme: dark) {
      :host(:not([theme="light"])) {
        --search-primary:      #4d9eff;
        --search-border:       #374151;
        --search-border-focus: #4d9eff;
        --search-bg:           #1e293b;
        --search-bg-hover:     #273549;
        --search-text:         #f1f5f9;
        --search-text-muted:   #94a3b8;
        --search-shadow:       0 4px 12px rgba(0, 0, 0, 0.40);
        --search-chip-bg:      #1e3a5f;
        --search-chip-color:   #4d9eff;
      }
    }

    .wrapper {
      position: relative;
      width: 100%;
    }

    /* ── Search bar ──────────────────────────────────────── */
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
      font-family: var(--search-font-family);
      font-size: var(--search-font-size);
      color: var(--search-text);
      padding: 12px 0;
      min-width: 0;
      min-height: 44px;
    }

    input::placeholder { color: var(--search-text-muted); }
    input[type="search"]::-webkit-search-cancel-button { display: none; }

    .clear-btn {
      flex-shrink: 0;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--search-text-muted);
      padding: 4px;
      min-width: 44px;
      min-height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s, color 0.15s;
    }
    .clear-btn:hover {
      background: var(--search-bg-hover);
      color: var(--search-text);
    }

    /* ── Category chips ──────────────────────────────────── */
    .category-bar {
      display: flex;
      gap: 6px;
      margin-top: 8px;
      flex-wrap: wrap;
    }

    .chip {
      padding: 4px 12px;
      min-height: 44px;
      border-radius: 999px;
      font-size: calc(var(--search-font-size) - 1px);
      border: 1.5px solid var(--search-border);
      background: var(--search-bg);
      color: var(--search-text-muted);
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
    }
    .chip:hover { border-color: var(--search-border-focus); color: var(--search-primary); }
    .chip.active {
      background: var(--search-chip-bg);
      border-color: var(--search-primary);
      color: var(--search-chip-color);
      font-weight: 600;
    }

    /* ── Results dropdown ────────────────────────────────── */
    .dropdown {
      position: fixed;
      background: var(--search-bg, #ffffff);
      border: 1.5px solid var(--search-border);
      border-radius: var(--search-radius);
      box-shadow: var(--search-shadow);
      z-index: 9999;
      max-height: 320px;
      overflow-y: auto;
      overscroll-behavior: contain;
    }

    /* ── Result items ────────────────────────────────────── */
    .result-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      cursor: pointer;
      transition: background 0.12s;
    }
    .result-item:hover,
    .result-item[aria-selected="true"] { background: var(--search-bg-hover); }

    .result-icon {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 16px;
      background: var(--search-chip-bg);
      color: var(--search-primary);
    }

    .result-text { flex: 1; min-width: 0; }

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
      margin-top: 2px;
    }

    .result-meta {
      font-size: 12px;
      color: var(--search-text-muted);
      flex-shrink: 0;
    }

    mark {
      background: rgba(0, 87, 184, 0.12);
      color: var(--search-primary);
      border-radius: 2px;
      padding: 0 1px;
      font-weight: 600;
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

    @keyframes spin { to { transform: rotate(360deg); } }

    .spinner {
      width: 18px;
      height: 18px;
      border: 2px solid var(--search-border);
      border-top-color: var(--search-primary);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }

    .sr-only {
      position: absolute;
      width: 1px; height: 1px;
      padding: 0; margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;

  // ── Public API ──────────────────────────────────────────────

  @property({ type: String, reflect: true }) value = '';
  /** Override to set a fixed placeholder. Defaults to auto-generated from categories. */
  @property({ type: String }) placeholder = '';
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** "light" | "dark" | "auto"  — auto follows prefers-color-scheme */
  @property({ type: String, reflect: true }) theme: 'light' | 'dark' | 'auto' = 'auto';
  /** Set from outside after receiving the `smart-search` event */
  @property({ type: Array }) results: SearchResult[] = [];
  /**
   * Filter tabs shown below the search bar.
   * Override to add, remove, or rename categories.
   * The first entry is selected by default.
   * Each entry: { value: string, label: string, icon?: string }
   *
   * @example
   * search.categories = [
   *   { value: 'all',    label: 'All' },
   *   { value: 'fund',   label: 'Funds' },
   *   { value: 'branch', label: 'Branches' },
   * ];
   */
  private _categories: SearchCategory_Option[] = [
    { value: 'all',         label: 'All' },
    { value: 'account',     label: 'Accounts' },
    { value: 'customer',    label: 'Customers'},
    { value: 'transaction', label: 'Transactions'},
  ];

  @property({ type: Array })
  get categories() { return this._categories; }
  set categories(val: SearchCategory_Option[]) {
    this._categories = val;
    if (val.length > 0 && !val.some((c) => c.value === this._category)) {
      this._category = val[0].value;
    }
    this.requestUpdate('categories');
  }

  // ── Internal state ──────────────────────────────────────────

  @state() private _category: SearchCategory = 'all';
  @state() private _open = false;
  @state() private _focusedIndex = -1;
  private _debounceTimer = 0;

  @query('input')    private _input!: HTMLInputElement;
  @query('.wrapper') private _wrapper!: HTMLElement;
  @query('.dropdown') private _dropdown?: HTMLElement;

  // ── Lifecycle ────────────────────────────────────────────────

  private readonly _onDocPointerDown = (e: PointerEvent) => {
    // composedPath() pierces shadow roots — close only when truly outside
    if (!e.composedPath().includes(this)) {
      this._open = false;
      this._focusedIndex = -1;
    }
  };

  private readonly _reposition = () => {
    if (this._open) this._positionDropdown();
  };

  private _positionDropdown() {
    if (!this._dropdown || !this._wrapper) return;
    const rect = this._wrapper.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;

    this._dropdown.style.left  = `${rect.left}px`;
    this._dropdown.style.width = `${rect.width}px`;

    if (spaceBelow < 200 && rect.top > spaceBelow) {
      // flip above
      this._dropdown.style.bottom = `${window.innerHeight - rect.top + 6}px`;
      this._dropdown.style.top    = 'auto';
    } else {
      this._dropdown.style.top    = `${rect.bottom + 6}px`;
      this._dropdown.style.bottom = 'auto';
    }
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('pointerdown', this._onDocPointerDown);
    window.addEventListener('resize', this._reposition);
    window.addEventListener('scroll', this._reposition, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('pointerdown', this._onDocPointerDown);
    window.removeEventListener('resize', this._reposition);
    window.removeEventListener('scroll', this._reposition, true);
  }

  // Lifecycle (update hooks)

  updated(changed: Map<string, unknown>) {
    if (changed.has('_open') && this._open) {
      this._positionDropdown();
    }
  }

  /** Auto-builds placeholder from category labels (excluding the first "All" tab)
   *  unless the parent has explicitly provided one. */
  private get _placeholder(): string {
    if (this.placeholder) return this.placeholder;
    const labels = this.categories
      .slice(1)                          // skip the first "show all" tab
      .map((c) => c.label.toLowerCase());
    return labels.length ? `Search ${labels.join(', ')}…` : 'Search…';
  }

  private get _filteredResults(): SearchResult[] {
    // 'all' (or any first-tab "show everything" convention) returns the full list
    const firstValue = this.categories[0]?.value;
    if (this._category === firstValue) return this.results;
    return this.results.filter((r) => r.category === this._category);
  }

  // Event handlers

  private _onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this._focusedIndex = -1;
    clearTimeout(this._debounceTimer);

    if (this.value.trim()) {
      this._open = true;
      this._debounceTimer = window.setTimeout(() => {
        this._dispatch('smart-search', { query: this.value.trim(), category: this._category });
      }, 300);
    } else {
      this._open = false;
      this.results = [];
    }
  }

  private _onKeyDown(e: KeyboardEvent) {
    const items = this._filteredResults;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!this._open && this.value.trim()) { this._open = true; return; }
        this._focusedIndex = Math.min(this._focusedIndex + 1, items.length - 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._focusedIndex = Math.max(this._focusedIndex - 1, -1);
        break;
      case 'Enter':
        if (this._focusedIndex >= 0 && items[this._focusedIndex]) {
          this._selectResult(items[this._focusedIndex]);
        } else {
          this._dispatch('smart-search', { query: this.value.trim(), category: this._category });
        }
        break;
      case 'Escape':
        this._open = false;
        this._focusedIndex = -1;
        this._input?.blur();
        break;
      case 'Tab':
        this._open = false;
        this._focusedIndex = -1;
        break;
    }
  }

  private _selectResult(result: SearchResult) {
    this._dispatch('smart-search-select', { result });
    this._open = false;
    this._focusedIndex = -1;
  }

  private _clear() {
    this.value = '';
    this.results = [];
    this._open = false;
    this._focusedIndex = -1;
    this._input?.focus();
    this._dispatch('smart-search-clear');
  }

  private _setCategory(cat: SearchCategory) {
    this._category = cat;
    this._focusedIndex = -1;
    if (this.value.trim()) {
      this._dispatch('smart-search', { query: this.value.trim(), category: cat });
    }
  }

  private _dispatch(name: string, detail?: object) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  // Highlight

  private _highlight(text: string) {
    const query = this.value.trim();
    if (!query) return html`${text}`;

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const idx = lowerText.indexOf(lowerQuery);

    if (idx === -1) return html`${text}`;

    return html`
      ${text.slice(0, idx)}
      <mark>${text.slice(idx, idx + query.length)}</mark>
      ${text.slice(idx + query.length)}
    `;
  }

  // Render

  render() {
    const focused = this._filteredResults[this._focusedIndex];
    const results = this._filteredResults;

    return html`
      <div class="wrapper">

        <!-- Live region for screen readers -->
        <div class="sr-only" aria-live="polite" aria-atomic="true">
          ${this._open && !this.loading
            ? `${results.length} result${results.length !== 1 ? 's' : ''} found`
            : ''}
        </div>

        <!-- Search bar -->
        <div class=${classMap({ 'search-bar': true, disabled: this.disabled })}>
          <span class="icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>

          <input
            type="search"
            role="combobox"
            autocomplete="off"
            spellcheck="false"
            .value=${this.value}
            placeholder=${this._placeholder}
            ?disabled=${this.disabled}
            aria-label="Search banking information"
            aria-autocomplete="list"
            aria-expanded=${this._open ? 'true' : 'false'}
            aria-controls="search-listbox"
            aria-activedescendant=${focused ? `result-${focused.id}` : nothing}
            @input=${this._onInput}
            @keydown=${this._onKeyDown}
            @focus=${() => { if (this.value.trim()) this._open = true; }}
          />

          ${this.value ? html`
            <button class="clear-btn" aria-label="Clear search" @click=${this._clear}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>` : nothing}
        </div>

        <!-- Category filter chips -->
        <div class="category-bar" role="tablist" aria-label="Filter by category">
          ${this.categories.map((c) => html`
            <button
              class=${classMap({ chip: true, active: this._category === c.value })}
              role="tab"
              aria-selected=${this._category === c.value ? 'true' : 'false'}
              @click=${() => this._setCategory(c.value)}
            >${c.label}</button>
          `)}
        </div>

        <!-- Results dropdown -->
        ${this._open ? html`
          <div
            id="search-listbox"
            class="dropdown"
            role="listbox"
            aria-label="Search results"
          >
            ${this.loading
              ? html`<div class="loading-row"><div class="spinner"></div> Searching…</div>`
              : results.length === 0
                ? html`<div class="no-results">No results for "<strong>${this.value}</strong>"</div>`
                : results.map((r, i) => html`
                  <div
                    id="result-${r.id}"
                    class="result-item"
                    role="option"
                    aria-selected=${this._focusedIndex === i ? 'true' : 'false'}
                    @click=${() => this._selectResult(r)}
                    @mouseenter=${() => { this._focusedIndex = i; }}
                  >
                    <div class="result-text">
                      <div class="result-title">${this._highlight(r.title)}</div>
                      ${r.subtitle
                        ? html`<div class="result-subtitle">${this._highlight(r.subtitle)}</div>`
                        : nothing}
                    </div>
                    ${r.meta ? html`<div class="result-meta">${r.meta}</div>` : nothing}
                  </div>
                `)
            }
          </div>` : nothing}

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'smart-search': SmartSearch; }
}
