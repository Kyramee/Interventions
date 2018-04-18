import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemeComponent ],
      imports: [ AngularFontAwesomeModule, ReactiveFormsModule ]
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

  it('Zone PRÉNOM invalide avec 2 caractères',() =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    let errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 3 caractères',() =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    let errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });

  it('Zone PRÉNOM valide avec 200 caractères',() =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('Allo'.repeat(50));
    let errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });

  it('Zone PRÉNOM invalide avec aucune valeur',() =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('');
    let errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec 1 caractère',() =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(1));
    let errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec 50 espaces',() =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(50));
    let errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec 2 espaces et 1 caractère',() =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('  a');
    let errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeTruthy();
  });
});
