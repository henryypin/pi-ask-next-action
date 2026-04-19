---
name: ask-next-action
description: Ask the user for the next action after the current task is complete. Use when you should hand control back to the user instead of inventing follow-up steps yourself.
metadata:
  short-description: Ask user for next action after every completed task
---

# Ask Next Action

Whenever you finish the user's current task, immediately call the `ask_next_action` tool.

## Core Rule

- Do **not** invent the next step yourself.
- Do **not** end the response immediately after saying the task is done.
- Do **not** ask a plain-text follow-up question when the tool can be used.
- Hand control back to the user through the tool UI.

## Tool Call

Call `ask_next_action` with no arguments unless you need a custom prompt.

Default usage:

```json
{}
```

Optional custom prompt:

```json
{
  "question": "任務已完成，請輸入下一步的行動或提示："
}
```

## After the Tool Returns

- Treat the returned text as the user's next instruction.
- Continue from that instruction instead of generating your own follow-up plan.
- If the user leaves the editor empty or cancels, stop and wait rather than guessing what to do next.

## Forbidden Behavior

- Finishing a task and stopping without calling `ask_next_action`
- Proposing your own next-step checklist instead of handing control back
- Replacing the tool with a normal assistant question when the tool is available
