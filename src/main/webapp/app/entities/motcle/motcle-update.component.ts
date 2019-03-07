import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMotcle } from 'app/shared/model/motcle.model';
import { MotcleService } from './motcle.service';
import { INotification } from 'app/shared/model/notification.model';
import { NotificationService } from 'app/entities/notification';
import { ISource } from 'app/shared/model/source.model';
import { SourceService } from 'app/entities/source';

@Component({
    selector: 'jhi-motcle-update',
    templateUrl: './motcle-update.component.html'
})
export class MotcleUpdateComponent implements OnInit {
    motcle: IMotcle;
    isSaving: boolean;

    notifications: INotification[];

    sources: ISource[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected motcleService: MotcleService,
        protected notificationService: NotificationService,
        protected sourceService: SourceService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ motcle }) => {
            this.motcle = motcle;
        });
        this.notificationService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<INotification[]>) => mayBeOk.ok),
                map((response: HttpResponse<INotification[]>) => response.body)
            )
            .subscribe((res: INotification[]) => (this.notifications = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.sourceService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISource[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISource[]>) => response.body)
            )
            .subscribe((res: ISource[]) => (this.sources = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.motcle.id !== undefined) {
            this.subscribeToSaveResponse(this.motcleService.update(this.motcle));
        } else {
            this.subscribeToSaveResponse(this.motcleService.create(this.motcle));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMotcle>>) {
        result.subscribe((res: HttpResponse<IMotcle>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackNotificationById(index: number, item: INotification) {
        return item.id;
    }

    trackSourceById(index: number, item: ISource) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
