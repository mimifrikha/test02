/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NotificationComponentsPage, NotificationDeleteDialog, NotificationUpdatePage } from './notification.page-object';

const expect = chai.expect;

describe('Notification e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let notificationUpdatePage: NotificationUpdatePage;
    let notificationComponentsPage: NotificationComponentsPage;
    let notificationDeleteDialog: NotificationDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Notifications', async () => {
        await navBarPage.goToEntity('notification');
        notificationComponentsPage = new NotificationComponentsPage();
        await browser.wait(ec.visibilityOf(notificationComponentsPage.title), 5000);
        expect(await notificationComponentsPage.getTitle()).to.eq('Notifications');
    });

    it('should load create Notification page', async () => {
        await notificationComponentsPage.clickOnCreateButton();
        notificationUpdatePage = new NotificationUpdatePage();
        expect(await notificationUpdatePage.getPageTitle()).to.eq('Create or edit a Notification');
        await notificationUpdatePage.cancel();
    });

    it('should create and save Notifications', async () => {
        const nbButtonsBeforeCreate = await notificationComponentsPage.countDeleteButtons();

        await notificationComponentsPage.clickOnCreateButton();
        await promise.all([notificationUpdatePage.setNoteInput('note'), notificationUpdatePage.setTypeInput('type')]);
        expect(await notificationUpdatePage.getNoteInput()).to.eq('note');
        expect(await notificationUpdatePage.getTypeInput()).to.eq('type');
        await notificationUpdatePage.save();
        expect(await notificationUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await notificationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Notification', async () => {
        const nbButtonsBeforeDelete = await notificationComponentsPage.countDeleteButtons();
        await notificationComponentsPage.clickOnLastDeleteButton();

        notificationDeleteDialog = new NotificationDeleteDialog();
        expect(await notificationDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Notification?');
        await notificationDeleteDialog.clickOnConfirmButton();

        expect(await notificationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
