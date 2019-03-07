export interface INotification {
    id?: number;
    note?: string;
    type?: string;
}

export class Notification implements INotification {
    constructor(public id?: number, public note?: string, public type?: string) {}
}
