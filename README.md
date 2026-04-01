# Smart Search Web Component

  **A reusable, accessible, framework-agnostic smart search component built for banking applications.**
  
  Designed to be dropped into any banking platform (React, Angular, Vue, plain HTML, etc.) for searching accounts, transactions, customers, and **other banking entities**.
  
  ![Smart Search Demo](demo.gif)  
  *(Replace this line with a short 10-second screen recording of your demo page — highly recommended)*

## Features
  - Interactive search input with clear button
  - Dynamic results dropdown with keyboard navigation (↑ ↓ Enter Esc)
  - Fully configurable category filters (All, Accounts, Customers, Transactions, Funds, Branches, etc.)
  - Search term highlighting in results
  - Hybrid theming (`theme` attribute + `prefers-color-scheme`)
  - Dynamic positioning with automatic flip (above/below the input)
  - Click-outside dismissal + proper overlay behavior
  - Full ARIA combobox pattern and screen-reader support
  - Mobile & touch friendly
  - Style isolation via Shadow DOM
  - Clean custom events for easy integration
  - 300ms debounce for realistic UX

## Quick Start
  ```bash
  git clone https://github.com/yourusername/smart-search.git
  cd smart-search
  npm install
  npm run dev          # Start development server with demo
  ```

## Scripts
  ```bash
    npm run dev      # Start demo
    npm run build    # Production build
    npm run preview  # Preview built demo
    npm test         # Run tests
  ```

## Usage
- Basic usage (HTML)
  ```bash
  <script type="module" src="smart-search.js"></script>
  <smart-search placeholder="Search accounts, customers..."></smart-search>
  ```
- With custom categories (recommended for banking apps)
     ```bash
  <smart-search id="search" theme="auto"></smart-search>

  <script type="module">
    const search = document.getElementById('search');
    
    // Fully configurable for any banking entity
    search.categories = [
      { value: 'all',         label: 'All'},
      { value: 'account',     label: 'Accounts'},
      { value: 'customer',    label: 'Customers'},
      { value: 'transaction', label: 'Transactions'},
      { value: 'fund',        label: 'Funds'},
    ];
    
    search.addEventListener('smart-search', (e) => {
      console.log('Search requested:', e.detail);
      // Parent handles the actual search here
    });
    
    search.addEventListener('smart-search-select', (e) => {
      console.log('User selected:', e.detail.result);
    });
  </script>
  ```

## Theming
  The component supports three theming modes:
  
  - theme="auto" (default) → automatically follows the user’s OS/browser preference (prefers-color-scheme)
  - theme="light" → forces light theme
  - theme="dark" → forces dark theme
  
  You can also fully customize the look using CSS custom properties:
  ```bash
    smart-search {
  --search-primary:      #e63946;   /* your brand color */
  --search-font-family:  'Inter', sans-serif;
  --search-font-size:    15px;
  --search-radius:       4px;
  /* ... any other --search-* variable */
  }
  ```
  All colors, shadows, borders, and fonts are controlled via CSS variables defined inside the Shadow DOM.

## API Reference
  ### Attributes / Properties
  
  | Name          | Type                              | Default       | Description                          |
  |---------------|-----------------------------------|---------------|--------------------------------------|
  | `value`       | `string`                          | `""`          | Current search query (two-way)       |
  | `placeholder` | `string`                          | (auto)        | Input placeholder                    |
  | `loading`     | `boolean`                         | `false`       | Show loading spinner                 |
  | `disabled`    | `boolean`                         | `false`       | Disable the component                |
  | `theme`       | `"light" \| "dark" \| "auto"`     | `"auto"`      | Theme mode                           |
  | `results`     | `SearchResult[]`                  | `[]`          | Results to display                   |
  | `categories`  | `SearchCategory_Option[]`         | (built-in)    | Filter tabs                          |
  
  ### Events
  
  | Event                    | Detail Type                                      | Description |
  |--------------------------|--------------------------------------------------|-----------|
  | `smart-search`           | `{ query: string, category: string }`            | Fired after 300ms debounce |
  | `smart-search-select`    | `{ result: SearchResult }`                       | User selected a result |
  | `smart-search-clear`     | —                                                | Clear button clicked |

## Data Types
  ```bash
  interface SearchResult {
    id: string;
    category: string;
    title: string;
    subtitle?: string;
    meta?: string;
    [key: string]: any; 
  }
  
  interface SearchCategory_Option {
    value: string;
    label: string;
  }
  ```

## Project structure
  ```bash
  src/
    smart-search.ts          # Component implementation
    smart-search.test.ts     # Vitest test suite
    index.ts                 # Package entry point
    types/
      search.types.ts        # TypeScript interfaces
  index.html                 # Demo application
  vite.config.ts             # Vite + Vitest configuration
  ```
## Testing
  ```bash
    npm test
  ```
  Tests cover rendering, events, keyboard navigation, filtering, highlighting, clear button, click-outside, accessibility, and more.

## Tech Stack
  - Lit 3 – Lightweight web components
  - TypeScript
  - Vite
  - Vitest

  
