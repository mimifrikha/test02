import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    NotificationComponent,
    NotificationDetailComponent,
    NotificationUpdateComponent,
    NotificationDeletePopupComponent,
    NotificationDeleteDialogComponent,
    notificationRoute,
    notificationPopupRoute
} from './';

const ENTITY_STATES = [...notificationRoute, ...notificationPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NotificationComponent,
        NotificationDetailComponent,
        NotificationUpdateComponent,
        NotificationDeleteDialogComponent,
        NotificationDeletePopupComponent
    ],
    entryComponents: [
        NotificationComponent,
        NotificationUpdateComponent,
        NotificationDeleteDialogComponent,
        NotificationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationNotificationModule {}
