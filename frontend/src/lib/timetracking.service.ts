import { ApiService } from "@/lib/api.service";
import { NewTimeTrack, TimeTrack } from "@/lib/types";
import { Identifier } from "@/lib/board.service";

export class TimeTrackingService extends ApiService {
    public static async createTimeTracker(timeTrackingData: NewTimeTrack): Promise<TimeTrack> {
        return await ApiService.postApiJson("/time", timeTrackingData)
    }

    public static async updateTimeTracker(timeTrackingId: number, timeTrackingData: Partial<NewTimeTrack>): Promise<TimeTrack> {
        return await ApiService.postApiJson(`/time/${timeTrackingId}`, timeTrackingData, "PUT")
    }

    public static async deleteTimeTracker(timeTrackingId: number): Promise<void> {
        await ApiService.fetchApi(`/time/${timeTrackingId}`, { method: 'DELETE' })
    }

    public static async getTimeTrackersByUser(userId: number): Promise<TimeTrack[]> {
        return await ApiService.fetchApiJson(`/time/user/${userId}`)
    }

    public static async getTimeTrackersByGroup(groupId: number): Promise<TimeTrack[]> {
        return await ApiService.fetchApiJson(`/time/group/${groupId}`)
    }
}
