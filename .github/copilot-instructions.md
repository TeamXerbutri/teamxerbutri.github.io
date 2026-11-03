# Copilot instructions for Team Xerbutri website

## Project overview
- This project is a Vite-based website built with vanilla JavaScript and CSS.
- Keep the implementation lightweight, readable, and easy to maintain.
- Prefer small, focused changes over large rewrites or framework additions.
- The site is a front-end for Team Xerbutri content and uses API-backed data for dynamic content.

## Stack and constraints
- Use JavaScript in the browser with plain ES modules; do not introduce React, Vue, TypeScript, or a new CSS framework unless explicitly requested.
- Keep styling in CSS and use the existing design language rather than creating new patterns.
- Favor simple DOM APIs and small utility functions over complex abstraction layers.
- Do not add dependencies at any cost. Only open-layers and photoswipe are allowed as external libraries.

## Architecture and data flow
- The app reads data from JSON fetched through an API.
- A local API server may be required for development; the app can fall back to the live Team Xerbutri API if no local `.env` configuration is present.
- When changing data access or API usage, keep the fetch flow compatible with the existing environment-based config.
- Do not hardcode API URLs in new code unless absolutely necessary; prefer existing configuration patterns.

## File conventions
- `index.html` is the app shell.
- `main.js` is the entry point for the application.
- `style.css` is the entry point containing the visual styling of the components
- `shell.css` contains the styling for a javascript-disabled application.
- `assets/` contains the JavaScript and CSS assets, ordered in a folder structure that reflects the component hierarchy. The assets folder only contains files to be bundled.
- `public/` is for static content to be served directly without processing.
- Prefer extending existing code patterns instead of introducing new file organization conventions.

## Styling guidance
Follow the project style guide from the README:
- Use a simple visual language: “less is more.”
- Styling is loosely based on material design principles.
- Keep layouts clean and uncluttered.
- Reuse the established UI patterns: floating action buttons, menu, nav-buttons, cards.
- Use the project color palette as the default source of truth:
  - background: `#18121e`
  - panels/menu: `#233237`
  - accent warmth: `#EAC67A`
  - rust-brown accents for detail

### Interaction principles
- Hover states: lighter color with soft shadow to create lift.
- Active/clicked states: darker, inset shadow for depth and pressure.
- Focus states: bright ring or outline for accessibility.
- Card hover behavior: subtle motion toward the cursor is preferred.

## Accessibility and UX
- Keep focus styling visible and consistent.
- Ensure tap targets, keyboard focus, and semantic HTML remain accessible.
- Do not rely on color alone to communicate state.
- Maintain simple and understandable navigation patterns.

## Quality bar for code changes
- Prefer clear naming and small functions.
- Keep logic easy to follow for a static site.
- Avoid over-engineering or speculative abstractions.
- Prefer CSS classes that match the current naming/style patterns already in the project.
- Preserve existing behavior unless the task specifically requires a change.

## Validation workflow
Before finalizing a change, run the smallest relevant validation:
- `npm run build` to verify the site still compiles
- `npm run dev` for local manual verification when UI behavior changes
- Use `npm run preview` only after a successful build when previewing the production bundle

For local testing, ensure the API server is running locally. This involves starting the API project and configuring the `.env` file to point to the local server.

## What to avoid
- Do not add large dependency chains or front-end frameworks.
- Do not rewrite the styling system without matching the current design language.
- Do not break the API fallback behavior or local development workflow.
- Do not overuse animations or heavy visual effects that conflict with the “simple and immersive” design direction.
