import { INotification } from 'app/shared/model/notification.model';
import { IMotcle } from 'app/shared/model/motcle.model';

export interface ISource {
    id?: number;
    nom?: string;
    uml?: string;
    dataHandler?: string;
    notification?: INotification;
    motcles?: IMotcle[];
}

export class Source implements ISource {
    constructor(
        public id?: number,
        public nom?: string,
        public uml?: string,
        public dataHandler?: string,
        public notification?: INotification,
        public motcles?: IMotcle[]
    ) {}
}
