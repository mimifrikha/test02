/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SourceComponentsPage, SourceDeleteDialog, SourceUpdatePage } from './source.page-object';

const expect = chai.expect;

describe('Source e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let sourceUpdatePage: SourceUpdatePage;
    let sourceComponentsPage: SourceComponentsPage;
    let sourceDeleteDialog: SourceDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Sources', async () => {
        await navBarPage.goToEntity('source');
        sourceComponentsPage = new SourceComponentsPage();
        await browser.wait(ec.visibilityOf(sourceComponentsPage.title), 5000);
        expect(await sourceComponentsPage.getTitle()).to.eq('Sources');
    });

    it('should load create Source page', async () => {
        await sourceComponentsPage.clickOnCreateButton();
        sourceUpdatePage = new SourceUpdatePage();
        expect(await sourceUpdatePage.getPageTitle()).to.eq('Create or edit a Source');
        await sourceUpdatePage.cancel();
    });

    it('should create and save Sources', async () => {
        const nbButtonsBeforeCreate = await sourceComponentsPage.countDeleteButtons();

        await sourceComponentsPage.clickOnCreateButton();
        await promise.all([
            sourceUpdatePage.setNomInput('nom'),
            sourceUpdatePage.setUmlInput('uml'),
            sourceUpdatePage.setDataHandlerInput('dataHandler'),
            sourceUpdatePage.notificationSelectLastOption()
            // sourceUpdatePage.motcleSelectLastOption(),
        ]);
        expect(await sourceUpdatePage.getNomInput()).to.eq('nom');
        expect(await sourceUpdatePage.getUmlInput()).to.eq('uml');
        expect(await sourceUpdatePage.getDataHandlerInput()).to.eq('dataHandler');
        await sourceUpdatePage.save();
        expect(await sourceUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await sourceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Source', async () => {
        const nbButtonsBeforeDelete = await sourceComponentsPage.countDeleteButtons();
        await sourceComponentsPage.clickOnLastDeleteButton();

        sourceDeleteDialog = new SourceDeleteDialog();
        expect(await sourceDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Source?');
        await sourceDeleteDialog.clickOnConfirmButton();

        expect(await sourceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
