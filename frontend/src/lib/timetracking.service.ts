import {ApiService} from "@/lib/api.service";
import {NewTimeTrack} from "@/lib/types";
import {Identifier} from "@/lib/board.service";

export class TimeTrackingService extends ApiService {
    public static async createTimeTracker(timeTrackingData: NewTimeTrack) {
        await ApiService.postApiJson("/time", timeTrackingData)
    }
    public static async updateTimeTracker(timeTrackingData: NewTimeTrack) {
        await ApiService.postApiJson("/time", timeTrackingData, "PUT")
    }
}
