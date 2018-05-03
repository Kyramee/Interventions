import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeProblemeService } from './type-probleme.service';
import { HttpClientModule } from '@angular/common/http';
import { error } from 'util';
import { element } from 'protractor';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProblemeComponent],
      imports: [AngularFontAwesomeModule, ReactiveFormsModule, HttpClientModule],
      providers: [TypeProblemeService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec 2 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    let errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });

  it('Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    let errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('Allo'.repeat(50));
    let errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec aucune valeur', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('');
    let errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });

  it('Zone PRÉNOM invalide avec 1 caractère', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(1));
    let errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });

  it('Zone PRÉNOM invalide avec 50 espaces', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(50));
    let errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });

  it('Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('  a');
    let errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });

  describe('Test des radio bouton =>', () => {
    it('Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
      component.appliquerNotifications('non');
      let zone = component.problemeForm.get('telephone');
      expect(zone.status).toEqual('DISABLED');
    });

    it('Zone TELEPHONE est vide quand ne pas me notifier', () => {
      component.appliquerNotifications('non');
      let zone = component.problemeForm.get('telephone');
      expect(zone.value).toBeNull;
    });

    it('Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
      component.appliquerNotifications('non');
      let zone = component.problemeForm.get('groupCourriel.courriel');
      expect(zone.status).toEqual('DISABLED');
    });

    it('Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
      component.appliquerNotifications('non');
      let zone = component.problemeForm.get('groupCourriel.confirmationCourriel');
      expect(zone.status).toEqual('DISABLED');
    });

    it('Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
      component.appliquerNotifications('courriel');
      let zone = component.problemeForm.get('groupCourriel.confirmationCourriel');
      zone.setValue('');
      expect(zone.valid).toBeFalsy();
    });

    it('Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
      component.appliquerNotifications('courriel');
      let zone = component.problemeForm.get('groupCourriel.courriel');
      zone.setValue('asd');
      expect(zone.valid).toBeFalsy();
    });

    it('Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null ', () => {
      component.appliquerNotifications('courriel');
      let c = component.problemeForm.get('groupCourriel.courriel');
      let cc = component.problemeForm.get('groupCourriel.confirmationCourriel');
      c.setValue('');
      cc.setValue('aaad@gmail.com');

      let group = component.problemeForm.get('groupCourriel');
      let error = group.errors || {};
      expect(error['erreurDifferent']).toBeFalsy();
    });

    it('Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
      component.appliquerNotifications('courriel');
      let c = component.problemeForm.get('groupCourriel.courriel');
      let cc = component.problemeForm.get('groupCourriel.confirmationCourriel');
      c.setValue('aaad@gmail.com');
      cc.setValue('');

      let group = component.problemeForm.get('groupCourriel');
      let error = group.errors || {};
      expect(error['erreurDifferent']).toBeFalsy();
    });

    it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
      component.appliquerNotifications('courriel');
      let c = component.problemeForm.get('groupCourriel.courriel');
      let cc = component.problemeForm.get('groupCourriel.confirmationCourriel');
      c.setValue('aassda@hotmail.com');
      cc.setValue('aaad@gmail.com');

      let group = component.problemeForm.get('groupCourriel');
      let error = group.errors || {};
      expect(error['erreurDifferent']).toBeFalsy();
    });

    it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
      component.appliquerNotifications('courriel');
      let c = component.problemeForm.get('groupCourriel.courriel');
      let cc = component.problemeForm.get('groupCourriel.confirmationCourriel');
      c.setValue('a@gmail.com');
      cc.setValue('a@gmail.com');

      let group = component.problemeForm.get('groupCourriel');
      let error = group.errors || {};
      expect(error['erreurDifferent']).toBeUndefined();
    });
  });
  describe('Test du telephone =>', () => {
    it('Zone TELEPHONE est activée quand notifier par messagerie texte ', () => {
      component.appliquerNotifications('text');
      let zone = component.problemeForm.get('telephone');
      expect(zone.status).not.toEqual('DISABLED');
    });
    
    it('Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
      component.appliquerNotifications('text');
      let zone = component.problemeForm.get('groupCourriel.courriel');
      expect(zone.status).toEqual('DISABLED');
    });
    it('Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
      component.appliquerNotifications('text');
      let zone = component.problemeForm.get('groupCourriel.confirmationCourriel');
      expect(zone.status).toEqual('DISABLED');
    });

    it('Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte ', () => {
      component.appliquerNotifications('text');
      let zone = component.problemeForm.get('telephone');
      expect(zone.valid).toBeFalsy();
    });

    it('Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte ', () => {
      component.appliquerNotifications('text');
      let zone = component.problemeForm.get('telephone');
      zone.setValue('invalide')
      expect(zone.valid).toBeFalsy();
    });

    it('Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte ', () => {
      component.appliquerNotifications('text');
      let zone = component.problemeForm.get('telephone');
      zone.setValue('123456789');
      expect(zone.valid).toBeFalsy();
    });

    it('Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte ', () => {
      component.appliquerNotifications('text');
      let zone = component.problemeForm.get('telephone');
      zone.setValue('12345678910');
      expect(zone.valid).toBeFalsy();
    });

    it('Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte ', () => {
      component.appliquerNotifications('text');
      let zone = component.problemeForm.get('telephone');
      zone.setValue('0123456789');
      expect(zone.valid).toBeTruthy();
    });
  });
});
