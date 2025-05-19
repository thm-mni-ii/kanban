import {ApiService} from "@/lib/api.service";
import {Group} from "@/lib/types";

export class GroupService extends ApiService {
    public static getMyGroups(): Promise<Group[]> {
        return ApiService.fetchApiJson(`/groups`);
    }
}
