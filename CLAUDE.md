# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Playwright-based test automation framework for the OrangeHRM web application (`https://opensource-demo.orangehrmlive.com`). Combines UI (Page Object Model) and API testing, with a Playwright MCP server integration for AI-assisted test development.

## Commands

```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install --with-deps

# Run tests (default: QA env, 01_authorization.spec.ts)
npm test

# Run a specific test file
npx cross-env TEST_ENV=QA npx playwright test tests/01_authorization.spec.ts

# Run a specific Playwright project
npx cross-env TEST_ENV=QA npx playwright test --project=automation-playwright-mcp-server

# Run tests headed (visible browser)
npx cross-env TEST_ENV=QA npx playwright test --headed

# Generate and open Allure report
npm run allure-reporter

# Start Playwright MCP server (for AI-assisted development)
npx playwright run-test-mcp-server
```

## Environment Configuration

Set `TEST_ENV` to `QA`, `PROD`, or leave unset (defaults to `dev`). Each environment reads credentials from `.env`:

- `QA_ADMIN_USERNAME` / `QA_ADMIN_PASSWORD`
- `PROD_ADMIN_USERNAME` / `PROD_ADMIN_PASSWORD`
- `DEV_ADMIN_USERNAME` / `DEV_ADMIN_PASSWORD`

See `.env.example` for the template. `properties.config.ts` maps `TEST_ENV` to base URLs and credentials.

## Architecture

### Test Projects (playwright.config.ts)

- **`authentication-setup`** — runs `tests/setup/authentication.setup.ts` first; performs CSRF-aware login and saves session to `.auth/auth.json`
- **`automation-playwright-mcp-server`** — depends on authentication-setup; matches `**/01**` test files; uses saved auth session
- **`orangeHrm`** — standalone browser tests matching `**/orangeHrm.spec.ts`; no auth dependency

### Custom Fixtures (test-options.ts)

Import `test` and `expect` from `./test-options` (not from `@playwright/test`) to access:

- `api` — a pre-configured `RequestHandler` instance for API calls
- `pageManager` — a `PageManager` instance with the browser navigated to dashboard
- `loginPage`, `dashboardPage` — individual page object fixtures

### API Layer (`src/`)

Follows a three-layer pattern:

1. **DTOs** (`src/requestDto/`) — TypeScript interfaces for request payloads
2. **Entities** (`src/entities/`) — TypeScript interfaces for response shapes
3. **API classes** (`src/api/`) — Named `VERB_resource.ts` (e.g., `GET_users.ts`, `POST_new_employee.ts`). Each extends `BaseEntities` and exposes a `send()` method that calls `this.api` (a `RequestHandler`) with the fluent builder pattern.
4. **Controllers** (`src/controllers/`) — Orchestrate multiple API classes into higher-level operations (e.g., `UserManagementController` combines create employee → create user → update contact details).

### RequestHandler (`utils/requestHandler.ts`)

Fluent builder for HTTP calls, wrapping Playwright's `APIRequestContext`. Chain calls then end with `.GET(expectedStatus)`, `.POST(expectedStatus)`, etc. Throws on status code mismatch with recent log context. State is reset after each request (`cleanUp()`).

```ts
await api.path('/web/index.php/api/v2/...').body(dto).POST(200);
```

### Page Object Model (`page-objects/`)

- `BasePage` — abstract class with shared locators and navigation helpers for the OrangeHRM sidebar
- Individual page classes extend `BasePage` and add page-specific locators/actions
- `PageManager` — single entry point that instantiates all pages; access via `pm.onDashboardPage()`, `pm.onPIMPage()`, etc.

### Logging

- `utils/logger.ts` — Pino logger (pretty-printed, colorized) used for general console output
- `utils/apiLogger.ts` — `APILogger` class maintains an in-memory ring buffer of request/response entries (max 50); attached to `RequestHandler` for error context; headers/body can be redacted per-call via `logRequestHeaders`/`logRequestBody`/`logResponseBody` options

## Adding New API Endpoints

1. Add a request DTO interface in `src/requestDto/`
2. Add a response entity interface in `src/entities/`
3. Create an API class in `src/api/VERB_resource.ts` extending `BaseEntities`
4. Expose the operation from `UserManagementController` (or a new controller) in `src/controllers/`
