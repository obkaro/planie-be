import type { Environment } from "@/env";
import { createOpenAI } from "@ai-sdk/openai";

export const getProviders = (env: Environment) => {
  const openai = createOpenAI({
    apiKey: env.OPENAI_API_KEY,
  });
  const openaiProvider = openai("gpt-4o");

  return {
    openaiProvider,
  };
};
