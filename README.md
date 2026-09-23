# greenlit-sparring

Small, dependency-free utilities with a test suite. The repository exists to give an autonomous engineering
pipeline real work: issues are filed the way people file them, CI runs on every pull request, and a maintainer
reviews and merges. Contributions from autonomous tools are welcome when the pull request says so (see CONTRIBUTING.md).

## Modules

| Module | What it promises |
|---|---|
| `src/duration.js` | `parseDuration('1h30m')` → milliseconds; compound values (`1h30m`, `2m15s`) add up; `formatDuration(ms)` is the inverse |
| `src/paginate.js` | `paginate(items, page, perPage)` never loses an item: the last, partial page is a page |
| `src/retry.js` | `retry(fn, { attempts, delayMs })` returns the first success or rejects with the last error |
| `src/fetch-json.js` | `fetchJson(url, { timeoutMs })` gives up after `timeoutMs` (default 10 s) instead of waiting on a stalled server |
| `src/slug.js` | `slugify('Hello,  World!')` → `hello-world`: separators collapse to one dash, none at the edges |

## Development

```bash
npm ci
npm test
npm run lint
```

Node 22 or newer. Pull requests need a green CI run and one approving review (CODEOWNERS).
