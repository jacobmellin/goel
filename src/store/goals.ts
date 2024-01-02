import { GoalRecord } from "../types/Goal";
import { invoke } from "@tauri-apps/api";
import { createResource } from "solid-js";

const [goals, { refetch }] = createResource<GoalRecord[]>(async () => {
    const goals: string = await invoke("get_goals");
    return JSON.parse(goals);
});

export function useGoals() { return [goals, refetch] as const };
