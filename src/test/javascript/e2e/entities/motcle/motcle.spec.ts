/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MotcleComponentsPage, MotcleDeleteDialog, MotcleUpdatePage } from './motcle.page-object';

const expect = chai.expect;

describe('Motcle e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let motcleUpdatePage: MotcleUpdatePage;
    let motcleComponentsPage: MotcleComponentsPage;
    let motcleDeleteDialog: MotcleDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Motcles', async () => {
        await navBarPage.goToEntity('motcle');
        motcleComponentsPage = new MotcleComponentsPage();
        await browser.wait(ec.visibilityOf(motcleComponentsPage.title), 5000);
        expect(await motcleComponentsPage.getTitle()).to.eq('Motcles');
    });

    it('should load create Motcle page', async () => {
        await motcleComponentsPage.clickOnCreateButton();
        motcleUpdatePage = new MotcleUpdatePage();
        expect(await motcleUpdatePage.getPageTitle()).to.eq('Create or edit a Motcle');
        await motcleUpdatePage.cancel();
    });

    it('should create and save Motcles', async () => {
        const nbButtonsBeforeCreate = await motcleComponentsPage.countDeleteButtons();

        await motcleComponentsPage.clickOnCreateButton();
        await promise.all([
            motcleUpdatePage.setNomInput('nom'),
            motcleUpdatePage.setEtatInput('etat'),
            motcleUpdatePage.notificationSelectLastOption()
        ]);
        expect(await motcleUpdatePage.getNomInput()).to.eq('nom');
        expect(await motcleUpdatePage.getEtatInput()).to.eq('etat');
        await motcleUpdatePage.save();
        expect(await motcleUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await motcleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Motcle', async () => {
        const nbButtonsBeforeDelete = await motcleComponentsPage.countDeleteButtons();
        await motcleComponentsPage.clickOnLastDeleteButton();

        motcleDeleteDialog = new MotcleDeleteDialog();
        expect(await motcleDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Motcle?');
        await motcleDeleteDialog.clickOnConfirmButton();

        expect(await motcleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
