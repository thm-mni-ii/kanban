import {Card, CardStatus, NewCard} from "@/lib/types";
import {ApiService} from "@/lib/api.service";

export type Identifier = number|string;

export class BoardService extends ApiService {
    public static createCard(groupId: Identifier, boardId: Identifier, card: NewCard): Promise<Card> {
        return ApiService.postApiJson(`/groups/${groupId}/boards/${boardId}/cards/`, card);
    }

    public static updateCard(groupId: Identifier, boardId: Identifier, card: Card): Promise<void> {
        return ApiService.postApiJson(`/groups/${groupId}/boards/${boardId}/cards/${card.kantask_id}`, card, "PUT");
    }

    public static updateCardStatus(groupId: Identifier, boardId: Identifier, cardId: Identifier, status: CardStatus): Promise<void> {
        return ApiService.postApiJson(`/groups/${groupId}/boards/${boardId}/cards/${cardId}/status`, {status}, "PUT");
    }

    public static deleteCard(groupId: Identifier, boardId: Identifier, card: Card): Promise<void> {
        return ApiService.fetchApiJson(`/groups/${groupId}/boards/${boardId}/cards/${card.kantask_id}`, {method: "DELETE"});
    }
}
