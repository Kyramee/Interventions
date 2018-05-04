import { AppPage } from './app.po';
import { element, by } from 'protractor';

describe('interventions App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('doit afficher le titre du formulaire Déclarer un problème', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Déclarer un problème');
  });

  it('doit activer le bouton Sauvegarder avec champs valides scénario nominal', () => {
    expect(page.setChampsValidesScenarioNominal()).toBeTruthy();
  });

  it('doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par message TEXTE', () => {
    expect(page.setChampsValidesScenarioAlternatifParMessageTexte()).toBeTruthy();
  });

  it('doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par message courriel', () => {
    expect(page.setChampsValidesScenarioAlternatifParCourriel()).toBeTruthy();
  });

  it('zone DESCRIPTION DU PROBLÈME a une bordure VERTE si nombre de caractères suffisant', () => {
    expect(page.setZoneDescriptionProblemeCaracteresSuffisants()).toContain('is-valid');
  });

  it('zone DESCRIPTION DU PROBLÈME a une bordure ROUGE si nombre de caractères insuffisant ', () => {
    expect(page.obtenirClasseZoneDescriptionProbleme()).toContain('is-invalid');
  });
});
