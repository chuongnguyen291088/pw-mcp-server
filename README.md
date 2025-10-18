# Playwright Test Automation Framework

## Overview

This is a test automation framework built using Playwright and TypeScript, implementing the Page Object Model pattern. The framework is designed to provide a robust, maintainable, and scalable solution for automated testing of web applications.

## Features

- Page Object Model (POM) design pattern
- TypeScript support
- Allure reporting
- Cross-browser testing capability
- Environment configuration using dotenv
- Parallel test execution
- Screenshot and video capture
- Error handling and logging

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- Visual Studio Code (recommended)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/chuongnguyen291088/pw-mcp-server.git
```

2. Navigate to the project directory:

```bash
cd pw-mcp-server
```

3. Install dependencies:

```bash
npm install
```

## Project Structure

```
├── page-objects/          # Page Object Model implementations
│   ├── basePage.ts       # Base page with common functionality
│   ├── loginPage.ts      # Login page object
│   ├── dashboardPage.ts  # Dashboard page object
│   └── pageManager.ts    # Page object manager
├── tests/                # Test files
│   └── orangeHrm.spec.ts # Test specifications
├── allure-results/       # Allure test results
├── allure-report/        # Generated Allure reports
├── playwright-report/    # Playwright HTML reports
├── test-results/        # Test execution artifacts
├── playwright.config.ts  # Playwright configuration
└── package.json         # Project dependencies and scripts
```

## Configuration

The framework uses `playwright.config.ts` for Playwright settings and `.env` for environment variables.

### Key Configuration Options

- Browser settings
- Screenshot/video capture
- Viewport settings
- Parallel execution
- Reporting options

## Available Scripts

- `npm test` - Run all tests
- `npm run test:ui` - Run tests with Playwright UI mode
- `npm run allure:clean` - Clean previous test reports
- `npm run allure:generate` - Generate Allure report
- `npm run allure:open` - Open Allure report in browser
- `npm run test:allure` - Run complete test cycle with Allure reporting

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Specific Test File

```bash
npx playwright test tests/orangeHrm.spec.ts
```

### Run Tests with Allure Reporting

```bash
npm run test:allure
```

## Test Reports

### Allure Reports

The framework generates detailed Allure reports including:

- Test execution results
- Screenshots
- Videos
- Test steps
- Environment information

To view the Allure report:

```bash
npm run test:allure
```

### Playwright HTML Report

A built-in HTML report is also generated and can be accessed after test execution.

## Framework Components

### Base Page

The `BasePage` class provides common functionality for all page objects:

- Navigation methods
- Wait conditions
- Element visibility checks
- URL verifications

### Page Objects

Each page in the application has its corresponding page object class:

- `LoginPage` - Handles login functionality
- `DashboardPage` - Dashboard page interactions
- `PageManager` - Manages page object instances

### Test Structure

Tests are organized using the Given/When/Then pattern for better readability and maintenance.

## Best Practices

1. Use Page Object Model for better maintenance
2. Keep test data separate from test logic
3. Use meaningful names for methods and variables
4. Add proper comments and documentation
5. Follow TypeScript best practices
6. Implement proper error handling
7. Use await for all asynchronous operations
8. Maintain test independence

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
BASE_URL=https://opensource-demo.orangehrmlive.com
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

For support and questions, please create an issue in the repository.

## License

ISC License
