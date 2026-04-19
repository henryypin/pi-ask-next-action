# pi-ask-next-action

A small pi package that adds an `ask_next_action` tool and an `ask-next-action` skill.

The goal is simple: after the agent finishes the current task, it can hand control back to the user with an interactive editor instead of inventing follow-up steps on its own.

## What it includes

- `index.ts` — registers the `ask_next_action` tool
- `skills/ask-next-action/SKILL.md` — instructs the agent to use the tool after completing a task

## Install locally

Install from the package directory:

```bash
pi install .
```

Or install from an absolute path:

```bash
pi install /absolute/path/to/pi-ask-next-action
```

## Install from GitHub

If the repository is pushed to GitHub, users can install it directly from git:

```bash
pi install git:github.com/henryypin/pi-ask-next-action
```

Or with a raw HTTPS URL:

```bash
pi install https://github.com/henryypin/pi-ask-next-action
```

## Publish to npm

If you want users to install it through npm, pi expects this syntax:

```bash
pi install npm:@henryypin/pi-ask-next-action
```

> Note: the correct pi syntax is `npm:@scope/package`.
> It is **not** `npm@henryypin:pi-ask-next-action`.

Before publishing a scoped package, update `package.json`:

```json
{
  "name": "@henryypin/pi-ask-next-action",
  "publishConfig": {
    "access": "public"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/henryypin/pi-ask-next-action.git"
  },
  "homepage": "https://github.com/henryypin/pi-ask-next-action#readme",
  "bugs": {
    "url": "https://github.com/henryypin/pi-ask-next-action/issues"
  }
}
```

Then publish:

```bash
npm login
npm pack --dry-run
npm publish --access public
```

After publishing, users can install a pinned version too:

```bash
pi install npm:@henryypin/pi-ask-next-action@0.1.0
```

If you prefer an unscoped npm package name, keep `"name": "pi-ask-next-action"` and install it with:

```bash
pi install npm:pi-ask-next-action
```

## GitHub release flow

A simple release flow looks like this:

```bash
git init
git add .
git commit -m "Initial release"
git branch -M main
git remote add origin git@github.com:henryypin/pi-ask-next-action.git
git push -u origin main
```

Then create tags when you publish updates:

```bash
git tag v0.1.0
git push origin v0.1.0
```

## Use

Once installed, pi can load the skill automatically when the task matches.

If you want to force the behavior in the current conversation, run:

```bash
/skill:ask-next-action
```

The skill tells the agent to call this tool after finishing the current task:

```json
{}
```

You can also pass a custom prompt:

```json
{
  "question": "任務已完成，請輸入下一步的行動或提示："
}
```

## Notes

- The tool uses `ctx.ui.editor()` so it works best in interactive pi sessions.
- In non-interactive mode, the tool returns an error message instead of opening a UI.
- If the editor is submitted empty, the tool returns a cancelled/empty result so the agent does not have to guess the next step.
- This package already uses the `pi` manifest in `package.json`:
  - `extensions`: `./index.ts`
  - `skills`: `./skills`
