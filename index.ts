import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { Type, type Static } from "@sinclair/typebox";

const DEFAULT_QUESTION = "任務已完成，請輸入下一步的行動或提示：";

const AskNextActionParams = Type.Object({
  question: Type.Optional(
    Type.String({
      description: `The prompt shown to the user. Defaults to: ${DEFAULT_QUESTION}`,
    }),
  ),
});

type AskNextActionParamsType = Static<typeof AskNextActionParams>;

interface AskNextActionDetails {
  question: string;
  answer: string | null;
  cancelled: boolean;
}

export default function registerExtension(pi: ExtensionAPI) {
  pi.registerTool({
    name: "ask_next_action",
    label: "Ask Next Action",
    description: "Ask the user what to do next after the current task is complete.",
    promptSnippet: "After finishing the current task, briefly summarize what was completed, then ask the user for the next action.",
    promptGuidelines: [
      "When you have finished the current task, first give a brief summary of what you completed, then call ask_next_action instead of inventing follow-up steps yourself.",
    ],
    parameters: AskNextActionParams,

    async execute(_toolCallId, params: AskNextActionParamsType, _signal, _onUpdate, ctx) {
      const question = params.question?.trim() || DEFAULT_QUESTION;

      if (!ctx.hasUI) {
        return {
          content: [{ type: "text", text: "Error: ask_next_action requires an interactive UI." }],
          details: {
            question,
            answer: null,
            cancelled: true,
          } satisfies AskNextActionDetails,
        };
      }

      const answer = await ctx.ui.editor(question, "");
      const trimmedAnswer = answer?.trim() ?? "";

      if (!trimmedAnswer) {
        return {
          content: [{ type: "text", text: "User did not provide a next action." }],
          details: {
            question,
            answer: null,
            cancelled: true,
          } satisfies AskNextActionDetails,
        };
      }

      return {
        content: [{ type: "text", text: trimmedAnswer }],
        details: {
          question,
          answer: trimmedAnswer,
          cancelled: false,
        } satisfies AskNextActionDetails,
      };
    },
  });
}
