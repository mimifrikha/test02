import { element, by, ElementFinder } from 'protractor';

export class MotcleComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-motcle div table .btn-danger'));
    title = element.all(by.css('jhi-motcle div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class MotcleUpdatePage {
    pageTitle = element(by.id('jhi-motcle-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nomInput = element(by.id('field_nom'));
    etatInput = element(by.id('field_etat'));
    notificationSelect = element(by.id('field_notification'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNomInput(nom) {
        await this.nomInput.sendKeys(nom);
    }

    async getNomInput() {
        return this.nomInput.getAttribute('value');
    }

    async setEtatInput(etat) {
        await this.etatInput.sendKeys(etat);
    }

    async getEtatInput() {
        return this.etatInput.getAttribute('value');
    }

    async notificationSelectLastOption() {
        await this.notificationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async notificationSelectOption(option) {
        await this.notificationSelect.sendKeys(option);
    }

    getNotificationSelect(): ElementFinder {
        return this.notificationSelect;
    }

    async getNotificationSelectedOption() {
        return this.notificationSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class MotcleDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-motcle-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-motcle'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
