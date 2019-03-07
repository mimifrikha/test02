import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    SourceComponent,
    SourceDetailComponent,
    SourceUpdateComponent,
    SourceDeletePopupComponent,
    SourceDeleteDialogComponent,
    sourceRoute,
    sourcePopupRoute
} from './';

const ENTITY_STATES = [...sourceRoute, ...sourcePopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [SourceComponent, SourceDetailComponent, SourceUpdateComponent, SourceDeleteDialogComponent, SourceDeletePopupComponent],
    entryComponents: [SourceComponent, SourceUpdateComponent, SourceDeleteDialogComponent, SourceDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationSourceModule {}
