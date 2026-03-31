# Project AGENTS

## Local Workflow Expectations

This project follows the workspace multi-agent workflow:

User -> Claude -> Codex Extension -> Codex CLI

Claude remains the primary architectural lead when available.

The Codex Extension should be the main Codex coordination surface for this project.

The Codex CLI should be used when terminal-heavy or repo-wide work is the better tool.

## Before Major Work

Codex should check the project notes before major work.

Codex should also review any relevant global notes if they may affect the task.

## After Completed Sessions

Codex should update the project notes after completed work.

Reusable cross-project learnings should go into Codex global notes rather than being duplicated here.

## Note Separation

Claude notes and Codex notes must remain separate.

Do not mix Codex project notes with Claude project notes.

## Edit Safety

- only one surface should edit a file at a time
- prefer analysis before implementation
- keep changes additive and low-risk unless broader changes are explicitly approved
- avoid unnecessary restructuring or cleanup during active task work

## Coordination Guidance

Use the extension for:
- file-level analysis
- focused edits
- local explanations
- task continuity

Use the CLI for:
- repo-wide search
- tests, linting, and builds
- terminal diagnostics
- pattern and dependency investigation

## Default Working Style

- keep plans concise
- avoid overengineering
- preserve the existing project layout
- document follow-up cleanup ideas without applying them unless approved
