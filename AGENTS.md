# Agent instructions

## Stack and layout

- React 18 with Vite; use JavaScript and JSX.
- `src/App.jsx` owns application state.
- `src/components/` contains one component per file.
- `src/utils/expenses.js` contains pure expense validation and calculation logic.
- `src/**/*.test.*` contains Vitest and React Testing Library tests.
- `cypress/e2e/` contains Cypress end-to-end specs.

## Commands

- Install: `npm install`
- Start the app: `npm run dev`
- Unit and component tests: `npm run test:run`
- Coverage: `npx vitest run --coverage`
- End-to-end tests: start `npm run dev` in another terminal, then run `npm run cy:run`
- Interactive Cypress: `npm run cy:open`
- Lint: `npm run lint`
- Production build: `npm run build`

## Conventions and workflow

- Keep all application state in `App`; components receive data and callbacks through props.
- Keep each React component in its own file and add a short comment describing its props/state.
- Use the existing category list, pure validation/calculation helpers, and stable `data-cy` selectors.
- Do not add dependencies without asking first.
- Work on a feature branch, make focused changes, and summarize the changes and verification in the pull request.
- Ask for a plan and approval before editing. Review the diff, run the app, and verify edge cases after each task.
