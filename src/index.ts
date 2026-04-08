import { DurableObject } from "cloudflare:workers";
import { MissionWorkflow } from "./workflow";

/**
 * The "Digital Twin" for each Robot.
 * This lives at the Edge and stays alive to manage real-time state.
 */
export class RobotAgent extends DurableObject {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }

  async getStatus() {
    let state = await this.ctx.storage.get("status") || { 
      id: this.ctx.id.toString(), 
      battery: 100, 
      lat: 0, 
      lng: 0, 
      task: "Idle" 
    };
    return state;
  }

  async updateTask(task: string) {
    await this.ctx.storage.put("status", { ...(await this.getStatus()), task });
    return { success: true };
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // AI Endpoint: Translates human voice/text to robot commands
    if (url.pathname === "/api/command") {
      const { prompt } = await request.json() as any;
      
      const aiResponse = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
        messages: [
          { role: "system", content: "You are a Robot Fleet Commander. Turn user requests into JSON: { robotId: string, action: string }" },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      });

      return new Response(JSON.stringify(aiResponse), { headers: { "Content-Type": "application/json" } });
    }

    // Default: Serve the Frontend Assets
    return env.ASSETS.fetch(request);
  }
}

export { MissionWorkflow }