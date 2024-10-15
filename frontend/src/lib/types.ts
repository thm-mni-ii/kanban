export type CardStatus = "backlog" | "working_on" | "review" | "done";

export type NewCard = {
    name: string;
    description: string;
    dueDate: Date;
    status: CardStatus;
}

export type Card = NewCard & {kantask_id: number}
