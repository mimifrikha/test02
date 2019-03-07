import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    MotcleComponent,
    MotcleDetailComponent,
    MotcleUpdateComponent,
    MotcleDeletePopupComponent,
    MotcleDeleteDialogComponent,
    motcleRoute,
    motclePopupRoute
} from './';

const ENTITY_STATES = [...motcleRoute, ...motclePopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MotcleComponent, MotcleDetailComponent, MotcleUpdateComponent, MotcleDeleteDialogComponent, MotcleDeletePopupComponent],
    entryComponents: [MotcleComponent, MotcleUpdateComponent, MotcleDeleteDialogComponent, MotcleDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationMotcleModule {}
