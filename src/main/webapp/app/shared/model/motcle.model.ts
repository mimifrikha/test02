import { INotification } from 'app/shared/model/notification.model';
import { ISource } from 'app/shared/model/source.model';

export interface IMotcle {
    id?: number;
    nom?: string;
    etat?: string;
    notification?: INotification;
    sources?: ISource[];
}

export class Motcle implements IMotcle {
    constructor(
        public id?: number,
        public nom?: string,
        public etat?: string,
        public notification?: INotification,
        public sources?: ISource[]
    ) {}
}
