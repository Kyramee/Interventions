import { browser, by, element } from 'protractor';
import { REACTIVE_DRIVEN_DIRECTIVES } from '@angular/forms/src/directives';

export class AppPage {
  navigateTo() {
    return browser.get('/probleme');
  }

  getParagraphText() {
    return element(by.className('card-header')).getText();
  }

  setChampsValidesScenarioNominal() {
    this.navigateTo();
    element(by.id('prenom')).sendKeys('Adrien');
    element(by.id('nom')).sendKeys('Cote');
    element(by.id('noProblemeId')).all(by.tagName('option')).get(2).click();
    element(by.id('descriptionProblemeId')).sendKeys('User probleme');
    return element(by.id('save')).isEnabled();
  }

  setChampsValidesScenarioAlternatifParMessageTexte() {
    this.navigateTo();
    element(by.id('prenom')).sendKeys('Adrien');
    element(by.id('nom')).sendKeys('Cote');
    element(by.id('noProblemeId')).all(by.tagName('option')).get(2).click();
    element(by.id('notifierText')).click();
    element(by.id('telephoneId')).sendKeys('0123456789');
    element(by.id('descriptionProblemeId')).sendKeys('User probleme');
    return element(by.id('save')).isEnabled();
  }

  setChampsValidesScenarioAlternatifParCourriel() {
    this.navigateTo();
    element(by.id('prenom')).sendKeys('Adrien');
    element(by.id('nom')).sendKeys('Cote');
    element(by.id('noProblemeId')).all(by.tagName('option')).get(2).click();
    element(by.id('notifierCourriel')).click();
    element(by.id('courrielId')).sendKeys('asd@asd');
    element(by.id('confirmationCourrielId')).sendKeys('asd@asd');
    element(by.id('descriptionProblemeId')).sendKeys('User probleme');
    return element(by.id('save')).isEnabled();
  }

  setZoneDescriptionProblemeCaracteresSuffisants() {
    this.navigateTo();
    element(by.id('descriptionProblemeId')).sendKeys('User probleme');
    return element(by.id('descriptionProblemeId')).getAttribute('class');
  }

  obtenirClasseZoneDescriptionProbleme() {
    this.navigateTo();
    element(by.id('descriptionProblemeId')).sendKeys('Us');
    return element(by.id('descriptionProblemeId')).getAttribute('class');
  }
}
