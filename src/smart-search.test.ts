import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import './smart-search.js';
import type { SmartSearch } from './smart-search.js';
import type { SearchResult, SearchCategory_Option } from './types/search.types.js';

// ── Helpers ──────────────────────────────────────────────────────────────────

const MOCK_RESULTS: SearchResult[] = [
  { id: '1', category: 'account',     title: 'Checking — ****4821', subtitle: 'John Doe',  meta: '$12,430.00' },
  { id: '2', category: 'account',     title: 'Savings — ****9034',  subtitle: 'John Doe',  meta: '$5,200.00'  },
  { id: '3', category: 'customer',    title: 'Jane Smith',           subtitle: 'C-00291',   meta: ''           },
  { id: '4', category: 'transaction', title: 'Wire Transfer #8821',  subtitle: 'Mar 2026',  meta: '-$500.00'   },
];

async function createElement(attrs: Record<string, string | boolean> = {}): Promise<SmartSearch> {
  const el = document.createElement('smart-search') as SmartSearch;
  for (const [k, v] of Object.entries(attrs)) {
    if (v === true) el.setAttribute(k, '');
    else el.setAttribute(k, String(v));
  }
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

function getInput(el: SmartSearch): HTMLInputElement {
  return el.shadowRoot!.querySelector('input')!;
}

async function typeInInput(el: SmartSearch, value: string) {
  const input = getInput(el);
  input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true }));
  await el.updateComplete;
}

async function pressKey(el: SmartSearch, key: string) {
  getInput(el).dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  await el.updateComplete;
}

// ── Rendering ────────────────────────────────────────────────────────────────

describe('Rendering', () => {
  let el: SmartSearch;
  beforeEach(async () => { el = await createElement(); });
  afterEach(() => el.remove());

  it('renders a search input', () => {
    expect(getInput(el)).toBeTruthy();
  });

  it('renders the default four category chips', () => {
    expect(el.shadowRoot!.querySelectorAll('.chip').length).toBe(4);
  });

  it('renders custom categories when the categories property is set', async () => {
    el.categories = [
      { value: 'all',    label: 'All'      },
      { value: 'fund',   label: 'Funds',   icon: '💰' },
      { value: 'branch', label: 'Branches', icon: '🏢' },
    ];
    await el.updateComplete;
    const chips = el.shadowRoot!.querySelectorAll('.chip');
    expect(chips.length).toBe(3);
    expect(chips[1].textContent?.trim()).toBe('Funds');
  });

  it('resets active category to first when current tab is removed', async () => {
    // Start on the Accounts tab
    const accountsChip = [...el.shadowRoot!.querySelectorAll('.chip')]
      .find(c => c.textContent?.trim() === 'Accounts') as HTMLButtonElement;
    accountsChip.click();
    await el.updateComplete;

    // Replace categories with a list that doesn't include 'account'
    el.categories = [{ value: 'all', label: 'All' }, { value: 'fund', label: 'Funds', icon: '💰' }];
    await el.updateComplete;

    const activeChip = el.shadowRoot!.querySelector('.chip.active');
    expect(activeChip?.textContent?.trim()).toBe('All');
  });

  it('does not render the dropdown initially', () => {
    expect(el.shadowRoot!.querySelector('.dropdown')).toBeNull();
  });

  it('applies custom placeholder', async () => {
    const c = await createElement({ placeholder: 'Find a transaction…' });
    expect(getInput(c).placeholder).toBe('Find a transaction…');
    c.remove();
  });

  it('disables input when disabled attribute is set', async () => {
    const c = await createElement({ disabled: true });
    expect(getInput(c).disabled).toBe(true);
    c.remove();
  });
});

// ── Search events ─────────────────────────────────────────────────────────────

describe('Search events', () => {
  let el: SmartSearch;
  beforeEach(async () => { el = await createElement(); });
  afterEach(() => el.remove());

  it('fires smart-search when user types', async () => {
    const handler = vi.fn();
    el.addEventListener('smart-search', handler);
    await typeInInput(el, 'john');
    expect(handler).toHaveBeenCalledOnce();
    expect(handler.mock.calls[0][0].detail).toMatchObject({ query: 'john', category: 'all' });
  });

  it('includes active category in the event detail', async () => {
    const handler = vi.fn();
    el.addEventListener('smart-search', handler);
    const accountsChip = [...el.shadowRoot!.querySelectorAll('.chip')]
      .find(c => c.textContent?.trim() === 'Accounts') as HTMLButtonElement;
    accountsChip.click();
    await el.updateComplete;
    await typeInInput(el, 'savings');
    expect(handler.mock.calls[0][0].detail.category).toBe('account');
  });

  it('does not fire smart-search when input is cleared', async () => {
    await typeInInput(el, 'john');
    const handler = vi.fn();
    el.addEventListener('smart-search', handler);
    await typeInInput(el, '');
    expect(handler).not.toHaveBeenCalled();
  });
});

// ── Results & dropdown ────────────────────────────────────────────────────────

describe('Results & dropdown', () => {
  let el: SmartSearch;

  beforeEach(async () => {
    el = await createElement();
    await typeInInput(el, 'john');
    el.results = MOCK_RESULTS;
    await el.updateComplete;
  });
  afterEach(() => el.remove());

  it('opens the dropdown after typing', () => {
    expect(el.shadowRoot!.querySelector('.dropdown')).toBeTruthy();
  });

  it('renders the correct number of result items', () => {
    expect(el.shadowRoot!.querySelectorAll('.result-item').length).toBe(MOCK_RESULTS.length);
  });

  it('shows a loading spinner when loading is true', async () => {
    el.loading = true;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.spinner')).toBeTruthy();
    expect(el.shadowRoot!.querySelectorAll('.result-item').length).toBe(0);
  });

  it('shows no-results message when results array is empty', async () => {
    el.results = [];
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.no-results')).toBeTruthy();
  });

  it('filters results by active category', async () => {
    const accountsChip = [...el.shadowRoot!.querySelectorAll('.chip')]
      .find(c => c.textContent?.trim() === 'Accounts') as HTMLButtonElement;
    accountsChip.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelectorAll('.result-item').length).toBe(2);
  });

  it('highlights matching terms in result text', () => {
    expect(el.shadowRoot!.innerHTML.toLowerCase()).toContain('<mark>');
  });
});

// ── Keyboard navigation ───────────────────────────────────────────────────────

describe('Keyboard navigation', () => {
  let el: SmartSearch;

  beforeEach(async () => {
    el = await createElement();
    await typeInInput(el, 'john');
    el.results = MOCK_RESULTS;
    await el.updateComplete;
  });
  afterEach(() => el.remove());

  it('ArrowDown moves focus to the first result', async () => {
    await pressKey(el, 'ArrowDown');
    const options = el.shadowRoot!.querySelectorAll('[role="option"]');
    expect(options[0].getAttribute('aria-selected')).toBe('true');
  });

  it('ArrowDown cannot go past the last result', async () => {
    for (let i = 0; i < MOCK_RESULTS.length + 5; i++) await pressKey(el, 'ArrowDown');
    const options = [...el.shadowRoot!.querySelectorAll('[role="option"]')];
    const selectedIdx = options.findIndex(o => o.getAttribute('aria-selected') === 'true');
    expect(selectedIdx).toBe(MOCK_RESULTS.length - 1);
  });

  it('ArrowDown then ArrowUp returns to no selection', async () => {
    await pressKey(el, 'ArrowDown');
    await pressKey(el, 'ArrowUp');
    expect(getInput(el).hasAttribute('aria-activedescendant')).toBe(false);
  });

  it('Enter on a focused result fires smart-search-select', async () => {
    const handler = vi.fn();
    el.addEventListener('smart-search-select', handler);
    await pressKey(el, 'ArrowDown');
    await pressKey(el, 'Enter');
    expect(handler).toHaveBeenCalledOnce();
    expect(handler.mock.calls[0][0].detail.result).toEqual(MOCK_RESULTS[0]);
  });

  it('Enter with no focused result fires smart-search', async () => {
    const handler = vi.fn();
    el.addEventListener('smart-search', handler);
    await pressKey(el, 'Enter');
    expect(handler).toHaveBeenCalledOnce();
  });

  it('Escape closes the dropdown', async () => {
    await pressKey(el, 'Escape');
    expect(el.shadowRoot!.querySelector('.dropdown')).toBeNull();
  });
});

// ── Clear ─────────────────────────────────────────────────────────────────────

describe('Clear', () => {
  let el: SmartSearch;

  beforeEach(async () => {
    el = await createElement();
    await typeInInput(el, 'jane');
    el.results = MOCK_RESULTS;
    await el.updateComplete;
  });
  afterEach(() => el.remove());

  it('shows the clear button when value is non-empty', () => {
    expect(el.shadowRoot!.querySelector('.clear-btn')).toBeTruthy();
  });

  it('hides the clear button when value is empty', async () => {
    await typeInInput(el, '');
    expect(el.shadowRoot!.querySelector('.clear-btn')).toBeNull();
  });

  it('fires smart-search-clear when clear button is clicked', async () => {
    const handler = vi.fn();
    el.addEventListener('smart-search-clear', handler);
    el.shadowRoot!.querySelector<HTMLButtonElement>('.clear-btn')!.click();
    await el.updateComplete;
    expect(handler).toHaveBeenCalledOnce();
  });

  it('resets value and results after clear', async () => {
    el.shadowRoot!.querySelector<HTMLButtonElement>('.clear-btn')!.click();
    await el.updateComplete;
    expect(el.value).toBe('');
    expect(el.results).toHaveLength(0);
  });
});

// ── Click outside ─────────────────────────────────────────────────────────────

describe('Click outside', () => {
  let el: SmartSearch;

  beforeEach(async () => {
    el = await createElement();
    await typeInInput(el, 'john');
    el.results = MOCK_RESULTS;
    await el.updateComplete;
  });
  afterEach(() => el.remove());

  it('closes dropdown on click outside the component', async () => {
    const outside = document.createElement('div');
    document.body.appendChild(outside);
    const event = new PointerEvent('pointerdown', { bubbles: true, composed: true });
    Object.defineProperty(event, 'composedPath', {
      value: () => [outside, document.body, document],
    });
    document.dispatchEvent(event);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.dropdown')).toBeNull();
    outside.remove();
  });

  it('does not close when clicking inside the component', async () => {
    const event = new PointerEvent('pointerdown', { bubbles: true, composed: true });
    Object.defineProperty(event, 'composedPath', {
      value: () => [getInput(el), el.shadowRoot, el, document.body, document],
    });
    document.dispatchEvent(event);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.dropdown')).toBeTruthy();
  });
});

// ── Accessibility ─────────────────────────────────────────────────────────────

describe('Accessibility', () => {
  let el: SmartSearch;

  beforeEach(async () => {
    el = await createElement();
    await typeInInput(el, 'john');
    el.results = MOCK_RESULTS;
    await el.updateComplete;
  });
  afterEach(() => el.remove());

  it('input has role="combobox"', () => {
    expect(getInput(el).getAttribute('role')).toBe('combobox');
  });

  it('aria-expanded is true when dropdown is open', () => {
    expect(getInput(el).getAttribute('aria-expanded')).toBe('true');
  });

  it('aria-expanded is false after Escape', async () => {
    await pressKey(el, 'Escape');
    expect(getInput(el).getAttribute('aria-expanded')).toBe('false');
  });

  it('each result has role="option"', () => {
    expect(el.shadowRoot!.querySelectorAll('[role="option"]').length).toBe(MOCK_RESULTS.length);
  });

  it('aria-activedescendant points to the focused result', async () => {
    await pressKey(el, 'ArrowDown');
    expect(getInput(el).getAttribute('aria-activedescendant')).toBe(`result-${MOCK_RESULTS[0].id}`);
  });

  it('aria-live region is present', () => {
    expect(el.shadowRoot!.querySelector('[aria-live="polite"]')).toBeTruthy();
  });
});

// ── Event communication ───────────────────────────────────────────────────────

describe('Event communication', () => {
  let el: SmartSearch;
  beforeEach(async () => { el = await createElement(); });
  afterEach(() => el.remove());

  it('smart-search event bubbles and is composed', async () => {
    const handler = vi.fn();
    document.addEventListener('smart-search', handler);
    await typeInInput(el, 'test');
    expect(handler).toHaveBeenCalled();
    document.removeEventListener('smart-search', handler);
  });

  it('smart-search-select event bubbles and is composed', async () => {
    const handler = vi.fn();
    document.addEventListener('smart-search-select', handler);
    await typeInInput(el, 'john');
    el.results = MOCK_RESULTS;
    await el.updateComplete;
    el.shadowRoot!.querySelector<HTMLElement>('.result-item')!.click();
    await el.updateComplete;
    expect(handler).toHaveBeenCalled();
    document.removeEventListener('smart-search-select', handler);
  });
});
