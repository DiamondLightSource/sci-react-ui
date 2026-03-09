# Contributing to sci-react-ui

Thanks for your interest in contributing! We’re working together to build high‑quality, accessible, and consistent React components for scientific UIs. We encourage early discussion and aim to keep a high bar for quality, reliability, and accessibility. Wherever possible, we prefer using existing MUI components instead of building custom ones.

**TLDR**
- Start with a GitHub issue.
- Wait for the issue to be accepted by a maintainer before opening a PR.
- Be clear about *what* you are changing and *why*.

---

## Core Principles

- **Discussion before code**: agree on approach early.
- **Quality matters**: accessibility, tests, and docs are expected.
- **Clarity**: explain purpose, behaviour, and interfaces plainly.
- **Stability**: changes should be predictable for consumers.
- **Reuse over reinvention**: prefer MUI components and patterns over custom implementations.

---

## Contribution Flow

1. **Open a GitHub Issue**
   - Ideally, open an issue before writing any code.
   - Describe the change or addition.
   - Explain *why* it is needed.
   - Describe expected behaviour and appearance.

2. **Maintainer Review**
   - A maintainer reviews the issue.
   - If accepted, it will be labeled `accepted`.

3. **Open a Pull Request**
   - Only after the issue is accepted.
   - The PR must address the accepted issue.
   - Include appropriate tests, stories, docs, and a changelog entry where relevant.

4. **Approval and Merge**
   - Once approved and CI passes, the PR can be merged.

---

## Issues

Issues are required for **all contributions**.

We provide GitHub issue templates to help structure discussion:

- [Change Proposal](.github/ISSUE_TEMPLATE/change-proposal.md) for proposing changes, enhancements, or new components
- [Bug Report](.github/ISSUE_TEMPLATE/bug-report.md) for reporting bugs or unexpected behaviour

Using a template is recommended but not required.

### Bug Reports

Include:
- What is broken
- Expected vs actual behaviour
- Steps to reproduce
- Environment details (browser, OS, version if relevant)

### Updating an Existing Component

Include:
- **Why** the change is needed (bug fix, improvement, behaviour change)
- Any **API or interface changes**
- Potential impact on existing usage

### New Components

Include:
- **Purpose**: the problem the component solves
- **Why it belongs in this library**
- A clear description of the **interface**
- Any accessibility considerations

Designs or sketches are welcome if they help with explanation.

### Other Changes (Documentation, Tooling, Chores)

For changes that do **not** affect component behaviour or APIs (for example documentation updates, tooling, or CI improvements):

- Open a GitHub issue describing the change and motivation.
- A maintainer must still accept the issue before a PR is opened.
- Keep PRs small and focused.
- Tests and changelog entries are not required unless behaviour is affected.

---

## Pull Requests

### Requirements

- Reference the accepted issue.
- Clearly describe the change and its motivation, including any API or behaviour differences.
- Add or update tests where behaviour changes.
- Maintain accessibility and keyboard support.

Expected in PRs:
- Unit and accessibility tests
- Storybook stories (states and variants)
- Documentation updates
- Changelog entry
- Screenshots for UI changes

No commented‑out code or TODOs.

### Review & Merging

- CI must pass.
- Maintainer approval is required.
- All review comments must be resolved.

---

## Design & Accessibility

- Use semantic HTML and ARIA where appropriate.
- Follow existing accessibility and interaction patterns.
- Avoid unnecessary complexity or abstraction.
- Support `className` and `style` passthrough.
- Keep modules small and tree‑shakable.
- Use British English

---

## Storybook
Each component should include:
   - `<component-name>.stories.tsx` with example controls
   - Stories covering common states and edge cases (e.g. default, disabled, focus, error, loading). 

---

## API & Breaking Changes

- Prefer additive changes.
- Breaking or user‑visible changes must be clearly stated in:
  - The issue
  - The PR description
- Migration notes are appreciated when relevant.
- For breaking changes:
  - Label `breaking-change`
  - Provide migration notes
  - Update changelog

---

## Versioning & Changelog

- **SemVer**: `MAJOR.MINOR.PATCH`.
- Maintain `CHANGELOG.md` (Keep-a-Changelog style).
- Each PR that changes behavior should add a changelog entry under **Unreleased**:
  - Added / Changed / Deprecated / Removed / Fixed / Security
- Releases promote **Unreleased** to a dated version section.

### Alpha & Beta Releases

We may publish **pre‑release versions** to gather feedback before a stable release:

- **Alpha (`x.y.z-alpha.n`)**
  - Early, incomplete, or experimental features
  - APIs and behaviour may change without notice
  - Not recommended for production use

- **Beta (`x.y.z-beta.n`)**
  - Features may still be under validation
  - APIs should be mostly stable, but changes are still possible
  - Intended for early adopters and testing

Pre‑release versions do not require the same stability guarantees as stable releases, and changes between pre‑releases may be breaking.

---

## Code Style & Tooling

- TypeScript strict mode
- ESLint and Prettier
- Conventional commits (`feat(Button): add aria-expanded`)
- Co‑locate tests and stories
- Do not add unnecessary dependencies
- Branch naming: `initials/short-description`

---

## AI‑Assisted Contributions

AI may assist, but contributors are responsible for correctness.

- Understand every line submitted
- No unverifiable AI-generated content
- Never include prompts

---

## Security

- Never commit secrets or credentials.
- Report vulnerabilities privately to maintainers.

---

## Final Notes

If you are unsure whether a change belongs here, **open an issue and ask**. Early discussion is strongly preferred.

Thanks for contributing