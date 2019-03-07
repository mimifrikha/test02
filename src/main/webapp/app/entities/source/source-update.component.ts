import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISource } from 'app/shared/model/source.model';
import { SourceService } from './source.service';
import { INotification } from 'app/shared/model/notification.model';
import { NotificationService } from 'app/entities/notification';
import { IMotcle } from 'app/shared/model/motcle.model';
import { MotcleService } from 'app/entities/motcle';

@Component({
    selector: 'jhi-source-update',
    templateUrl: './source-update.component.html'
})
export class SourceUpdateComponent implements OnInit {
    source: ISource;
    isSaving: boolean;

    notifications: INotification[];

    motcles: IMotcle[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected sourceService: SourceService,
        protected notificationService: NotificationService,
        protected motcleService: MotcleService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ source }) => {
            this.source = source;
        });
        this.notificationService
            .query({ filter: 'source-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<INotification[]>) => mayBeOk.ok),
                map((response: HttpResponse<INotification[]>) => response.body)
            )
            .subscribe(
                (res: INotification[]) => {
                    if (!this.source.notification || !this.source.notification.id) {
                        this.notifications = res;
                    } else {
                        this.notificationService
                            .find(this.source.notification.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<INotification>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<INotification>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: INotification) => (this.notifications = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.motcleService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMotcle[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMotcle[]>) => response.body)
            )
            .subscribe((res: IMotcle[]) => (this.motcles = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.source.id !== undefined) {
            this.subscribeToSaveResponse(this.sourceService.update(this.source));
        } else {
            this.subscribeToSaveResponse(this.sourceService.create(this.source));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISource>>) {
        result.subscribe((res: HttpResponse<ISource>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMotcleById(index: number, item: IMotcle) {
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
