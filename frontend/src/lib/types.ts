export type CardStatus = "backlog" | "working_on" | "review" | "done";

export type NewCard = {
    name: string;
    description: string;
    dueDate: Date;
    status: CardStatus;
}

export type Card = NewCard & {kantask_id: number}

export type NewTimeTrack = {
    group_id: number,
    activity_start: string,
    activity_duration: string,
    title: string,
    description: string,
}

export type TimeTrack = NewTimeTrack & { time_tracking_id: number }

export type Group = {id: number, name: string};
