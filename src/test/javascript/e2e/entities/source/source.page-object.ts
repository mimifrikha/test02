import { element, by, ElementFinder } from 'protractor';

export class SourceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-source div table .btn-danger'));
    title = element.all(by.css('jhi-source div h2#page-heading span')).first();

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

export class SourceUpdatePage {
    pageTitle = element(by.id('jhi-source-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nomInput = element(by.id('field_nom'));
    umlInput = element(by.id('field_uml'));
    dataHandlerInput = element(by.id('field_dataHandler'));
    notificationSelect = element(by.id('field_notification'));
    motcleSelect = element(by.id('field_motcle'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNomInput(nom) {
        await this.nomInput.sendKeys(nom);
    }

    async getNomInput() {
        return this.nomInput.getAttribute('value');
    }

    async setUmlInput(uml) {
        await this.umlInput.sendKeys(uml);
    }

    async getUmlInput() {
        return this.umlInput.getAttribute('value');
    }

    async setDataHandlerInput(dataHandler) {
        await this.dataHandlerInput.sendKeys(dataHandler);
    }

    async getDataHandlerInput() {
        return this.dataHandlerInput.getAttribute('value');
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

    async motcleSelectLastOption() {
        await this.motcleSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async motcleSelectOption(option) {
        await this.motcleSelect.sendKeys(option);
    }

    getMotcleSelect(): ElementFinder {
        return this.motcleSelect;
    }

    async getMotcleSelectedOption() {
        return this.motcleSelect.element(by.css('option:checked')).getText();
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

export class SourceDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-source-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-source'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
