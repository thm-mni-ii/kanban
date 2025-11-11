import {Card, CardStatus, NewCard, NewTimeTrack} from "@/lib/types";
import {ApiService} from "@/lib/api.service";
import {TimeTrackingService} from "@/lib/timetracking.service";

export type Identifier = number|string;

export class BoardService extends ApiService {
    public static getBoards(groupId: Identifier) {
        return ApiService.fetchApiJson(`/groups/${groupId}/boards/`)
    }

    public static createBoard(groupId: Identifier, name: string) {
        return ApiService.postApiJson(`/groups/${groupId}/boards/`, {name})
    }

    public static getCards(groupId: Identifier, boardId: Identifier): Promise<Card> {
        return ApiService.fetchApiJson(`/groups/${groupId}/boards/${boardId}/cards/`);
    }

    public static createCard(groupId: Identifier, boardId: Identifier, card: NewCard): Promise<Card> {
        return ApiService.postApiJson(`/groups/${groupId}/boards/${boardId}/cards/`, card);
    }

    public static updateCard(groupId: Identifier, boardId: Identifier, card: Card): Promise<void> {
        return ApiService.postApiJson(`/groups/${groupId}/boards/${boardId}/cards/${card.kantask_id}`, card, "PUT");
    }

    public static updateCardStatus(groupId: Identifier, boardId: Identifier, cardId: Identifier, status: CardStatus): Promise<void> {
        return ApiService.postApiJson(`/groups/${groupId}/boards/${boardId}/cards/${cardId}/status`, {status}, "PUT");
    }

    public static updateCardPosition(groupId: Identifier, boardId: Identifier, cardId: Identifier, position: number, status: CardStatus): Promise<void> {
        return ApiService.postApiJson(`/groups/${groupId}/boards/${boardId}/cards/${cardId}/position`, {position, status}, "PUT");
    }

    public static deleteCard(groupId: Identifier, boardId: Identifier, card: Card): Promise<void> {
        return ApiService.fetchApiJson(`/groups/${groupId}/boards/${boardId}/cards/${card.kantask_id}`, {method: "DELETE"});
    }

    public static async trackTime(groupId: Identifier, boardId: Identifier, cardId: Identifier, timeTrack: NewTimeTrack) {
        await TimeTrackingService.createTimeTracker(timeTrack)
        await ApiService.postApiJson(`/groups/${groupId}/boards/${boardId}/cards/${cardId}/time_spent`, {time_spent: timeTrack.activity_duration}, "PUT")
    }
}
