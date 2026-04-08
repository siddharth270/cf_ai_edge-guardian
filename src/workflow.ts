import { WorkflowEntrypoint, WorkflowStep } from "cloudflare:workers";

export class MissionWorkflow extends WorkflowEntrypoint<Env, { robotId: string, missionType: string }> {
  async run(event: any, step: WorkflowStep) {
    // Step 1: Dispatch
    await step.do("dispatch-robot", async () => {
      const stub = this.env.ROBOT_AGENT.get(this.env.ROBOT_AGENT.idFromName(event.robotId));
      await stub.updateTask(`Moving to ${event.missionType} site...`);
    });

    // Step 2: Simulate travel time (Edge-native sleep!)
    await step.sleep("travel-time", "30 seconds");

    // Step 3: Complete
    await step.do("complete-mission", async () => {
      const stub = this.env.ROBOT_AGENT.get(this.env.ROBOT_AGENT.idFromName(event.robotId));
      await stub.updateTask("Mission Accomplished. Returning to dock.");
    });
  }
}