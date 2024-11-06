import { Instructor } from "@instructor-ai/instructor";
import { AnthropicClient } from "@anthropic-ai/sdk";
import { z } from "zod"

const claude = new AnthropicClient({
    apiKey: process.env.ANTHROPIC_API_KEY || 'dummy-key'
});

const instructor = new Instructor({
    client: claude,
    mode: "anthropic"
});

export { instructor };


