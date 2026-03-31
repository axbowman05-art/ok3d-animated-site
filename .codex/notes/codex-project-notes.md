# Codex Project Notes

Purpose: project-specific insights, decisions, patterns, issues, and follow-ups.

## Date: 2026-03-26

### Session Summary
- created additive support structure for this existing project
- documented the current top-level layout without changing project code or organization

### Project Status
- Active priorities: not set yet
- Blocked items: none recorded

### Key Decisions
- treated this folder as a project because it contains `.git`, `package.json`, and `src/`
- preserved the existing animated-marketing structure as-is

### Patterns & Insights
- top-level structure includes `src/`, `.next/`, `node_modules/`, and standard Next.js config files
- `package.json` identifies the project as `ok3d-prints-animated`
- available scripts are `build`, `dev`, `lint`, and `start`
- README describes this as an animated marketing site with a scroll-driven, high-polish presentation goal

### Issues & Fixes
- no issues were fixed during this setup-only phase

### Pitfalls to Avoid
- avoid flattening or simplifying interaction-heavy code without checking the intended visual goals
- do not treat generated folders as meaningful project structure

### Next Steps
- inspect README and `src/` before implementation work to understand animation architecture and UX priorities
- consider future cleanup review for documenting animation dependencies and performance-sensitive areas
