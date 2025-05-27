import {ApiService} from "@/lib/api.service";

export class StatisticsService extends ApiService {
    public static getTasksPerGroup(): Promise<any[]> {
        return ApiService.fetchApiJson(`/stats/taskspergroup`);
    }

    public static getTasksDoneInPercent(): Promise<any[]> {
        return ApiService.fetchApiJson(`/stats/tasks/done/in/percent`);
    }

    public static getTasksPerLabel(): Promise<any[]> {
        return ApiService.fetchApiJson(`/stats/tasks/per/label`);
    }

    public static getTasksByGroup(groupId: string): Promise<any[]> {
        return ApiService.fetchApiJson(`/stats/tasks/by/group/${groupId}`);
    }

    public static getTasksByMember(): Promise<any[]> {
        return ApiService.fetchApiJson(`/stats/tasks/by/member`);
    }

    public static getLatestDoneTask(): Promise<any[]> {
        return ApiService.fetchApiJson(`/stats/latest/done/task`);
    }
}
