# Playwright Cucumber Framework

A robust test automation framework combining Playwright and Cucumber for BDD-style testing with TypeScript.

## 🚀 Features

- ✅ **BDD with Cucumber** - Write tests in Gherkin syntax
- ✅ **Playwright** - Fast, reliable browser automation
- ✅ **TypeScript** - Type-safe test code
- ✅ **Page Object Model** - Maintainable test architecture
- ✅ **Parallel Execution** - Run tests concurrently for speed
- ✅ **Video Recording** - Automatic video capture for debugging
- ✅ **Screenshots on Failure** - Visual evidence of failed tests
- ✅ **HTML Reports** - Beautiful test execution reports
- ✅ **Retry Mechanism** - Auto-retry failed tests

## 📋 Prerequisites

- **Node.js** - v16 or higher
- **npm** - v7 or higher

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/iamkrishnagawade/playwright-cucumber-framework.git
cd playwright-cucumber-framework
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install chromium
```

4. Create environment file (optional):

```bash
cp .env.example .env
```

## 🎯 Running Tests

### Run all tests:

```bash
npm test
```

### Run in headed mode (visible browser):

```bash
HEADLESS=false npm test
```

### Run with slow motion (for debugging):

```bash
SLOW_MO=500 npm test
```

### Run specific tests by tags:

```bash
TAGS=@smoke npm test
```

### Run against different environment:

```bash
BASE_URL=https://staging.example.com npm test
```

## 🌍 Environment Variables

Create a `.env` file in the root directory to configure test execution:

| Variable   | Description                        | Default                     |
| ---------- | ---------------------------------- | --------------------------- |
| `HEADLESS` | Run tests in headless mode         | `true`                      |
| `SLOW_MO`  | Slow down execution (milliseconds) | `0`                         |
| `BASE_URL` | Application base URL               | `https://www.saucedemo.com` |
| `TAGS`     | Cucumber tags to filter tests      | `not @skip`                 |

## 📁 Project Structure

```
playwright-cucumber-framework/
├── features/              # Feature files (Gherkin scenarios)
│   └── login.feature
├── step-definitions/      # Step definition implementations
│   └── login.steps.ts
├── pages/                 # Page Object Models
│   └── LoginPage.ts
├── support/               # Test hooks and world setup
│   ├── hooks.ts          # Before/After hooks
│   └── world.ts          # Custom world with shared context
├── test-results/          # Test artifacts (videos, screenshots)
│   └── videos/
├── cucumber.js            # Cucumber configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 📝 Writing Tests

### 1. Create a Feature File

Create a `.feature` file in the `features/` directory:

```gherkin
Feature: User Login

  Scenario: Successful login with valid credentials
    Given I navigate to the login page
    When I enter "standard_user" and "secret_sauce"
    Then I should see the "Products" title
```

### 2. Create a Page Object

Create a page class in the `pages/` directory:

```typescript
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
  }

  async navigate() {
    await this.page.goto(process.env.BASE_URL || 'https://example.com');
  }
}
```

### 3. Implement Step Definitions

Create step definitions in the `step-definitions/` directory:

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { OurWorld } from '../support/world';

Given('I navigate to the login page', async function (this: OurWorld) {
  await this.loginPage.navigate();
});
```

### 4. Register Page Objects

Add your page object to `support/world.ts`:

```typescript
export class OurWorld extends World {
  loginPage!: LoginPage;

  async initPages() {
    this.loginPage = new LoginPage(this.page);
  }
}
```

## 🧪 Test Configuration

### Cucumber Configuration (`cucumber.js`)

- **Parallel execution**: 2 workers (configurable)
- **Retry mechanism**: 1 retry for failed tests
- **Report formats**: Progress bar, summary, HTML report
- **Tag filtering**: Run specific tests using tags

### TypeScript Configuration (`tsconfig.json`)

- **Strict mode**: Enabled for type safety
- **Target**: ESNext for modern JavaScript features
- **Module**: CommonJS for Node.js compatibility

## 📊 Test Reports

After test execution, find the HTML report at:

```
cucumber-report.html
```

Open it in a browser to view:

- Test execution summary
- Pass/fail status for each scenario
- Execution time
- Screenshots (for failures)

## 🎥 Video & Screenshots

- **Videos**: Automatically recorded for all tests in `test-results/videos/`
- **Screenshots**: Captured on test failure and attached to reports

## 🔍 Debugging

### Run single test:

```bash
TAGS=@your-tag npm test
```

### Run in headed mode with slow motion:

```bash
HEADLESS=false SLOW_MO=1000 npm test
```

### Disable parallel execution:

Edit `cucumber.js` and set `parallel: 1`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🐛 Troubleshooting

### Tests fail to start

- Ensure Node.js version is 16+
- Run `npm install` to install dependencies
- Run `npx playwright install chromium`

### Browser doesn't launch

- Check `HEADLESS` environment variable
- Verify Playwright browsers are installed
- Try running with `HEADLESS=false`

### Parallel execution issues

- Set `parallel: 1` in `cucumber.js`
- Check if browser resources are sufficient

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 👨‍💻 Author

Krishna Gawade

---

**Happy Testing! 🚀**
