```markdown
# My Prompts (Agent used: Gemini 3.1 pro)

This project was built using AI-assisted coding Gemini. The primary goal of the prompts was to dictate the system architecture and enforce the usage of specific Cloudflare primitives, rather than just asking for generic code.

Here are the key prompts used during the development lifecycle:

### 1. Architectural Definition & Scaffold Generation
**Intent:** To force the LLM to use modern Cloudflare primitives (Durable Objects, Workflows) instead of a standard CRUD architecture.

> "I am building a high-end technical demo for a Cloudflare Software Engineering application. The project is 'Edge-Guardian': a distributed multi-agent robotics control system that offloads robot intelligence to the Cloudflare Edge. 
> 
> The Tech Stack:
> 1. Frontend: Cloudflare Assets (HTML/Tailwind) for a command dashboard.
> 2. Brain/State: Cloudflare Durable Objects to act as the 'Digital Twin' for each robot, maintaining real-time state.
> 3. Reasoning: Cloudflare Workers AI (Llama 3.3) to parse natural language commands into structured JSON mission parameters.
> 4. Coordination: Cloudflare Workflows to manage multi-step, long-running 'Missions'.
>
> Goal: Provide the full project structure (`wrangler.jsonc`, Worker scripts, Durable Object class) that demonstrates a 'Production-Ready' mindset."

### 2. UI / UX Generation
**Intent:** To generate a clean, modern UI that matches Cloudflare's brand identity without wasting time on CSS boilerplate.

> "Create a single-file HTML/JS dashboard for 'Edge-Guardian'. Use Tailwind CSS via CDN. 
> The design must use the Cloudflare 'Cloud-Native' theme: Background `#05274E`, Accents `#F6821F`. It should look like a high-tech control room with a 2D canvas/grid to visualize Robot movements, a command input box, and a streaming system log. Include the Javascript `fetch` call to hit my `/api/command` endpoint."

### 3. Debugging Llama 3.3 JSON Output
**Intent:** To fix a common issue where LLMs wrap requested JSON output in Markdown blocks, breaking the frontend parsing.

> "My UI is throwing a JSON parsing error: `Unexpected token '`', "```json...`. 
> The Llama 3.3 model is wrapping the output in markdown backticks even though `response_format` is set to JSON. Give me the JavaScript logic to sanitize and strip the markdown from the `apiResult.response` string before passing it to `JSON.parse()`."

### 4. Simulating Workflow Execution in the UI
**Intent:** To visually represent the asynchronous nature of the backend workflow.

> "Update the frontend Javascript. When a valid command is parsed and returned from the LLM, I want to simulate the Cloudflare Workflow dispatching the robot. Add a `setTimeout` function that waits 1 second, then uses CSS absolute positioning to smoothly animate the bot's icon to a new random sector on the grid."