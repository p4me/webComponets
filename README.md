# smart-search

A reusable, accessible, framework-agnostic smart search web component built for banking applications. Drop it into any platform — React, Angular, Vue, or plain HTML — with no build pipeline required on the consumer side.

**[Live Demo](https://p4me.github.io/webComponets/)**

---

## Features

- Interactive search input with clear button
- Dynamic results dropdown with keyboard navigation (↑ ↓ Enter Escape Tab)
- Configurable category filter chips (All, Accounts, Customers, Transactions, or any custom set)
- 300ms debounced search — realistic for banking UX
- Search term highlighting in results
- Light / Dark / Auto theming (follows `prefers-color-scheme`)
- Fully customisable via CSS custom properties
- Dynamic dropdown positioning — repositions on resize and scroll, flips above when viewport space is limited
- Click-outside dismissal and proper overlay stacking
- Shadow DOM style isolation
- Mobile and touch friendly (44px minimum touch targets)
- Full ARIA combobox pattern — screen reader compatible
- Clean custom events for easy parent integration

---

## Installation

```bash
git clone https://github.com/p4me/webComponets.git
cd webComponets
npm install
```

---

## Getting Started

```bash
npm run dev       # Start demo at http://localhost:5173
npm run build     # Production build → dist/
npm run preview   # Preview the production build
npm test          # Run test suite
```

---

## Usage

### Basic (plain HTML)

```html
<script type="module" src="dist/banking-search.js"></script>

<smart-search id="search" theme="light"></smart-search>

<script>
  const search = document.getElementById('search');

  search.addEventListener('smart-search', (e) => {
    const { query, category } = e.detail;
    search.loading = true;

    fetchResults(query, category).then(results => {
      search.loading = false;
      search.results = results;
    });
  });

  search.addEventListener('smart-search-select', (e) => {
    console.log('Selected:', e.detail.result);
  });

  search.addEventListener('smart-search-clear', () => {
    search.results = [];
  });
</script>
```

### Custom categories

Arrays must be set as a JavaScript property (not an HTML attribute):

```js
search.categories = [
  { value: 'all',         label: 'All' },
  { value: 'account',     label: 'Accounts' },
  { value: 'customer',    label: 'Customers' },
  { value: 'transaction', label: 'Transactions' },
  { value: 'fund',        label: 'Funds' },
];
```

### Custom branding via CSS custom properties

```html
<smart-search
  style="
    --search-primary:      #e63946;
    --search-border-focus: #e63946;
    --search-chip-bg:      #fde8ea;
    --search-chip-color:   #e63946;
    --search-font-family:  'Georgia', serif;
    --search-radius:       4px;
  "
></smart-search>
```

---

## Theming

| Value | Behaviour |
|-------|-----------|
| `theme="auto"` (default) | Follows OS `prefers-color-scheme` |
| `theme="light"` | Always light |
| `theme="dark"` | Always dark |

---

## API Reference

### Attributes / Properties

| Name          | Type                              | Default    | Description                                         |
|---------------|-----------------------------------|------------|-----------------------------------------------------|
| `theme`       | `"light" \| "dark" \| "auto"`    | `"auto"`   | Colour scheme                                       |
| `value`       | `string`                          | `""`       | Current search query (reflected as attribute)       |
| `placeholder` | `string`                          | (auto)     | Input placeholder — auto-generated from categories if omitted |
| `loading`     | `boolean`                         | `false`    | Shows spinner, hides results                        |
| `disabled`    | `boolean`                         | `false`    | Disables the component                              |
| `results`     | `SearchResult[]`                  | `[]`       | Results to display — set after receiving `smart-search` |
| `categories`  | `SearchCategory_Option[]`         | (4 built-in) | Filter tabs — set as JS property                  |

### Events

| Event                 | Detail                                  | Fired when                                       |
|-----------------------|-----------------------------------------|--------------------------------------------------|
| `smart-search`        | `{ query: string, category: string }`   | User types (debounced 300ms) or presses Enter    |
| `smart-search-select` | `{ result: SearchResult }`              | User clicks or presses Enter on a result         |
| `smart-search-clear`  | —                                       | User clicks the clear (×) button                 |

All events `bubble` and are `composed` — they cross shadow DOM boundaries to reach any parent listener.

### CSS Custom Properties

| Property               | Default                           | Description                  |
|------------------------|-----------------------------------|------------------------------|
| `--search-font-family` | system-ui                         | Font stack                   |
| `--search-font-size`   | `14px`                            | Base font size               |
| `--search-primary`     | `#0057b8`                         | Brand / accent colour        |
| `--search-border`      | `#9ca3af`                         | Idle border colour           |
| `--search-border-focus`| `#0057b8`                         | Focused border colour        |
| `--search-bg`          | `#ffffff`                         | Surface background           |
| `--search-bg-hover`    | `#f3f4f6`                         | Hovered row background       |
| `--search-text`        | `#111827`                         | Primary text colour          |
| `--search-text-muted`  | `#6b7280`                         | Placeholder / secondary text |
| `--search-radius`      | `8px`                             | Corner radius                |
| `--search-shadow`      | `0 4px 12px rgba(0,0,0,0.10)`    | Dropdown shadow              |
| `--search-chip-bg`     | `#e0edff`                         | Active chip background       |
| `--search-chip-color`  | `#0057b8`                         | Active chip text colour      |

---

## Data Types

```ts
interface SearchResult {
  id:        string;
  category:  string;
  title:     string;
  subtitle?: string;
  meta?:     string;       // e.g. account balance, transaction amount
  [key: string]: any;      // flexible — supports any additional fields
}

interface SearchCategory_Option {
  value: string;
  label: string;
}
```

---

## Testing

```bash
npm test              # Run all tests once
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

Tests are written with [Vitest](https://vitest.dev/) and run in [happy-dom](https://github.com/capricorn86/happy-dom).

### Test coverage

| Suite                | What is covered                                                        |
|----------------------|------------------------------------------------------------------------|
| Rendering            | Input, chips, custom categories, placeholder, disabled state           |
| Search events        | `smart-search` fires with correct query and category, debounce handled |
| Results & dropdown   | Open/close, result count, loading state, category filtering, highlighting |
| Keyboard navigation  | ArrowDown/Up, Enter to select, Escape to close                         |
| Clear                | Button visibility, `smart-search-clear` event, state reset             |
| Click outside        | Closes on external click, stays open on internal click                 |
| Accessibility        | ARIA roles, `aria-expanded`, `aria-activedescendant`, live region      |
| Event communication  | Events bubble and are composed across shadow DOM                       |

---

## Project Structure

```
src/
  smart-search.ts        # Component implementation
  smart-search.test.ts   # Vitest test suite
  index.ts               # Package entry point
  types/
    search.types.ts      # TypeScript interfaces
index.html               # Demo application
vite.config.ts           # Vite + Vitest configuration
```

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Lit 3](https://lit.dev/) | Web component framework — reactive properties, Shadow DOM, CSS template tags |
| TypeScript | Type safety |
| Vite | Dev server + production build |
| Vitest + happy-dom | Unit testing |
