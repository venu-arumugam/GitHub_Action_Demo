@"
# GitHub_Action_Demo

Enterprise-style Cypress test automation framework demonstrating UI and API testing, integrated with a GitHub Actions CI/CD pipeline.

## Tech Stack

- **Test framework:** Cypress 15.x
- **Language:** JavaScript (Page Object Model)
- **CI/CD:** GitHub Actions
- **Linting:** ESLint (flat config)
- **Security:** npm audit, Dependabot, CodeQL (see Security & Quality below)

## Project Structure

cypress/
├── e2e/
│   ├── UI_Test/        # UI test specs (drag-and-drop)
│   └── API_Test/       # API test specs (booking CRUD, token auth)
├── pages/               # Page Object classes + locators
├── services/            # API service layer (endpoints, request methods)
├── fixtures/            # Test data (JSON)
├── support/             # Custom Cypress commands
└── utils/               # Reusable helper functions

## Applications Under Test

This framework targets two independent applications:

| App | Purpose | Base URL |
|---|---|---|
| the-internet.herokuapp.com | UI tests | baseUrl in cypress.config.js |
| restful-booker.herokuapp.com | API tests | Cypress.env("apiBaseUrl") |

## Getting Started

npm install
npx cypress open      # interactive mode
npx cypress run       # headless, all specs
npm run test:ui       # UI specs only
npm run test:api      # API specs only
npm run lint           # ESLint check

## What's Tested

**UI:**
- Drag and drop (native HTML5 drag events)

**API:**
- Booking CRUD (GET, POST) - positive, negative, and failure scenarios
- Token-authenticated operations (PUT, PATCH, DELETE) - including negative auth rejection tests

## CI/CD Pipeline

Workflow: .github/workflows/cypress-tests.yml

- **Trigger:** Pull requests targeting main or qa, or manual dispatch
- **Runs on:** Ubuntu (GitHub-hosted runner)
- **Matrix:** Tests run in parallel across Chrome and Edge
- **Caching:** npm dependencies cached between runs
- **Artifacts:** Screenshots (on failure) and videos (always) uploaded, 7-day retention

## Security & Quality

| Tool | Status | Purpose |
|---|---|---|
| ESLint | Active | Code linting |
| npm audit | Active | Dependency vulnerability check (build-time) |
| Dependabot | Active | Ongoing dependency vulnerability alerts + auto-PRs |
| Dependency Review Action | Active | Flags new vulnerable dependencies per PR |
| CodeQL | Configured, not enabled | Static security analysis - requires GitHub Advanced Security (organization-tier), not available on personal private repos |

## Branch Strategy

feature/*  ->  qa  ->  main
"@ | Out-File -FilePath "README.md" -Encoding utf8