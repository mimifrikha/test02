import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'source',
                loadChildren: './source/source.module#JhipsterSampleApplicationSourceModule'
            },
            {
                path: 'motcle',
                loadChildren: './motcle/motcle.module#JhipsterSampleApplicationMotcleModule'
            },
            {
                path: 'notification',
                loadChildren: './notification/notification.module#JhipsterSampleApplicationNotificationModule'
            },
            {
                path: 'source',
                loadChildren: './source/source.module#JhipsterSampleApplicationSourceModule'
            },
            {
                path: 'motcle',
                loadChildren: './motcle/motcle.module#JhipsterSampleApplicationMotcleModule'
            },
            {
                path: 'notification',
                loadChildren: './notification/notification.module#JhipsterSampleApplicationNotificationModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}
