# Playwright Test Automation Framework (OrangeHRM)

A Playwright + TypeScript test automation framework targeting the [OrangeHRM demo](https://opensource-demo.orangehrmlive.com). It combines UI tests (Page Object Model with reusable element wrappers) and API tests (fluent `RequestHandler` + Zod-validated payloads and responses), and exposes a Playwright MCP server for AI-assisted test development.

## Features

- Page Object Model with a shared `BasePage` (`isOnPage()` via waitFor/try-catch) and a `PageManager` entry point
- Reusable UI element wrappers (`Button`, `Textbox`, `DropdownList`, `Checkbox`, `Table`, `Datepicker`, `Dialog`, `Menu`, `Tab`, `Toggle`, `Slider`, `FileUpload`, `Link`, `Label`, `RadioButton`)
- API layer with a fluent `RequestHandler` (path/params/headers/body/form → `GET/POST/PUT/DELETE`) and per-call logging options
- **Zod schemas** for both request DTOs and response entities — payloads are parsed/validated on the way in and out
- Faker-based test data factories (`prepareNewEmployeePayload`, `prepareNewUserPayload`, `prepareContactDetailsPayload`) with partial overrides
- Environment-aware config (`TEST_ENV=QA|PROD|dev`) via `properties.config.ts` + `.env`
- Pino structured logging (`src/utils/logger.ts`) and an in-memory `APILogger` ring buffer that attaches recent request/response context to failed assertions
- Allure and HTML reporters; retained videos/traces on failure; full-page screenshots on
- Playwright MCP server integration for AI-assisted authoring

## Prerequisites

- Node.js 18+ and npm
- Git

## Installation

```bash
git clone https://github.com/chuongnguyen291088/pw-mcp-server.git
cd pw-mcp-server
npm ci
npx playwright install --with-deps
```

## Environment Configuration

Set `TEST_ENV` to `QA`, `PROD`, or leave unset (defaults to `dev`). `properties.config.ts` maps the selected env to base URLs and credentials read from `.env`:

```env
QA_ADMIN_USERNAME=
QA_ADMIN_PASSWORD=
PROD_ADMIN_USERNAME=
PROD_ADMIN_PASSWORD=
DEV_ADMIN_USERNAME=
DEV_ADMIN_PASSWORD=
```

All three environments currently point at `https://opensource-demo.orangehrmlive.com` for both `base_url` and `api_host`.

## Project Structure

```
├── page-objects/ (legacy — active page objects live under src/ui/page-objects)
├── src/
│   ├── api/                     # VERB_resource.ts API classes (GET_users, POST_new_employee, ...)
│   ├── baseEntities.ts          # Base class injecting RequestHandler
│   ├── controllers/             # Higher-level orchestrators (UserManagementController)
│   ├── entities/
│   │   ├── factories/           # Faker + Zod payload builders
│   │   │   ├── ContactDetails.factory.ts
│   │   │   ├── NewEmployee.factory.ts
│   │   │   └── NewUser.factory.ts
│   │   └── schemas/
│   │       ├── requests/        # Zod request schemas
│   │       └── responses/       # Zod response schemas (NewEmployee, NewUser, UserList)
│   ├── helpers/                 # TestDataFactory scaffolding
│   ├── requestDto/              # Legacy DTO interfaces (being replaced by Zod schemas)
│   ├── ui/
│   │   ├── page-elements/       # Reusable element wrappers + BaseElement
│   │   └── page-objects/        # BasePage, PageManager, and per-screen classes
│   └── utils/                   # logger.ts, apiLogger.ts, requestHandler.ts
├── tests/
│   ├── 01_authorization.spec.ts # API flow using UserManagementController + Zod-validated responses
│   ├── 01_navigation.spec.ts    # UI navigation coverage via PageManager
│   ├── orangeHrm.spec.ts        # Standalone browser tests (no auth dependency)
│   ├── seed.spec.ts             # Scratch file for MCP/exploratory work
│   └── setup/
│       ├── authentication.setup.ts             # CSRF-aware login → .auth/auth.json
│       └── talk_first_authentication.setup.ts
├── playwright.config.ts
├── properties.config.ts
├── test-options.ts              # Custom fixtures: api, pageManager, pre-navigated page
├── tsconfig.json                # Path aliases: @api/*, @controller/*, @schemas/*, @factories/*, ...
└── package.json
```

## Available Scripts

```bash
# Runs the three main spec files against the QA env
npm test

# Standalone Talk First scenario
npm run talk-first-test
```

The `npm test` script is defined as:

```
npx cross-env TEST_ENV=qa playwright test tests/01_authorization.spec.ts tests/01_navigation.spec.ts tests/orangeHrm.spec.ts
```

### Useful one-off commands

```bash
# Run a specific spec
npx cross-env TEST_ENV=QA npx playwright test tests/01_authorization.spec.ts

# Run a specific Playwright project
npx cross-env TEST_ENV=QA npx playwright test --project="Orange HRM Execution"

# Run headed
npx cross-env TEST_ENV=QA npx playwright test --headed

# Open the last HTML report
npx playwright show-report

# Allure (results are written to ./allure-results)
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report

# Start the Playwright MCP server for AI-assisted authoring
npx playwright run-test-mcp-server
```

## Playwright Projects (`playwright.config.ts`)

- **`Orange HRM Setup`** — runs `tests/setup/authentication.setup.ts`, performs a CSRF-aware login, and saves the session to `.auth/auth.json`
- **`Orange HRM Execution`** — depends on the setup project; matches `**/01_**.spec.ts` and reuses the stored auth state
- **`orangeHrm`** — standalone browser tests for `**/orangeHrm.spec.ts`; no auth dependency
- **`Talk Fist Setup` / `Talk First Execution`** — parallel setup + execution pair for the Talk First scenario, storing state in `.auth/talkFirstAuth.json`

Global `use` options: `baseURL` from `properties.config.ts`, headless by default, 1920×1080 viewport, full-page screenshots on, video retained on failure, trace retained on failure, 90 s test timeout.

## Custom Fixtures (`test-options.ts`)

Always import from `@test-options` (not `@playwright/test`) so tests pick up the custom fixtures:

```ts
import { test, expect } from '@test-options';
```

Exposed fixtures:

- `api` — pre-constructed `RequestHandler` backed by an `APILogger` ring buffer
- `pageManager` — `PageManager` instance, already navigated to the dashboard
- `page` — overridden to navigate to the dashboard and wait for the Dashboard heading before each test

## API Layer

The stack is organized into four concerns:

1. **Zod request schemas** (`src/entities/schemas/requests/`) — define the shape/constraints of outbound payloads
2. **Factories** (`src/entities/factories/`) — build payloads from Faker defaults with `Partial<T>` overrides, validated through the schema before being returned
3. **API classes** (`src/api/VERB_resource.ts`) — extend `BaseEntities`; each exposes a `send()` method that drives `this.api` (the `RequestHandler`)
4. **Controllers** (`src/controllers/`) — orchestrate multiple API classes into higher-level flows. `UserManagementController` composes create-employee → create-user → update-contact-details and parses the user list through `UserListResponseSchema`

### `RequestHandler` (`src/utils/requestHandler.ts`)

Fluent builder around `APIRequestContext`:

```ts
await api
    .path('/web/index.php/api/v2/pim/employees')
    .body(payload)
    .POST(200, { logRequestBody: true, logResponseBody: true });

await api
    .path('/web/index.php/api/v2/admin/users')
    .params({ limit: '50' })
    .GET(200);
```

- Chain methods: `.url()`, `.path()`, `.params()`, `.headers()`, `.body()`, `.form()`
- Terminal methods: `.GET(expectedStatus)`, `.POST(expectedStatus)`, `.PUT(expectedStatus)`, `.DELETE(expectedStatus)`
- Each terminal method accepts `RequestOptions`: `logRequestHeaders`, `logRequestBody`, `logResponseBody`
- On a status-code mismatch, the handler throws with the last 50 log entries from `APILogger` for context
- Internal state resets (`cleanUp()`) after every request so a single `api` fixture can be reused across calls
- `POST`/`PUT`/`PATCH` automatically switch between `multipart` (FormData), `form` (`application/x-www-form-urlencoded`), and JSON `data`

### Response validation

Responses are parsed through Zod schemas in `src/entities/schemas/responses/` (`NewEmployee`, `NewUser`, `UserList`). `z.infer<typeof Schema>` gives typed access without maintaining parallel hand-written interfaces — the legacy `src/entities/*.ts` interfaces have been removed in favor of this.

## Adding a New API Endpoint

1. Add a Zod schema in `src/entities/schemas/requests/YourRequest.schema.ts`
2. Add a Zod schema in `src/entities/schemas/responses/YourResponse.schema.ts`
3. Add a factory in `src/entities/factories/YourThing.factory.ts` using Faker + `Schema.parse({ ...defaults, ...overrides })`
4. Create `src/api/VERB_resource.ts` extending `BaseEntities` with a `send()` method
5. Expose the operation on `UserManagementController` (or a new controller) and parse responses through the response schema

## Page Object Model

- `BasePage` (`src/ui/page-objects/BasePage.ts`) — abstract base exposing `isOnPage()` (shared waitFor/try-catch against a protected `pageHeading` locator), `expandMenu()` for the collapsed sidebar, and `navigateTo<Section>Page()` helpers for every OrangeHRM area
- Per-screen classes extend `BasePage` and only add screen-specific locators/actions
- `BasePageIndexes.ts` re-exports every page class — always import from the barrel rather than individual files
- `PageManager` wires all pages together; tests access them through `pm.onDashboardPage()`, `pm.onPIMPage()`, `pm.onAdminPage()`, etc.
- Element interactions are built on the wrappers in `src/ui/page-elements/`, all of which extend `BaseElement` (which uses the Pino logger for structured error output)

## Logging

- `src/utils/logger.ts` — Pino (pretty-printed, colorized) for general console output
- `src/utils/apiLogger.ts` — `APILogger` maintains a ring buffer (max 50 entries) of request/response data. Headers and bodies are redacted by default and only recorded when explicitly enabled per-call via `RequestOptions`. On assertion failures the buffer is surfaced in the error message.

## Test Data

Use `@faker-js/faker` via the factories in `src/entities/factories/`. Example:

```ts
import { prepareNewEmployeePayload } from '@entities/factories/NewEmployee.factory';

const employee = prepareNewEmployeePayload({ firstName: 'Alice' });
```

The factory fills the remaining fields from Faker and parses the result through the matching Zod request schema, so invalid overrides fail fast.

## Reports

- Allure results → `allure-results/`, generated report → `allure-report/`
- Playwright HTML report → `playwright-report/` (open with `npx playwright show-report`)
- Traces and videos are retained on failure under `test-results/`

## Contributing

1. Create a feature branch
2. Follow the existing Zod-schema-first pattern for any new API work
3. Reuse `BasePage` / element wrappers instead of rolling new locators
4. Open a Pull Request

## License

ISC
