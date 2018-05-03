import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { verifCaracteres } from '../shared/caracteres-validator';
import { TypeProblemeService } from './type-probleme.service';
import { ITypeProbleme } from './typeProbleme';
import { emailMatcherValidator } from '../shared/emailMatcher-validator';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  typeProblemeProduit: ITypeProbleme[];
  errorMessage: string;

  constructor(private fb: FormBuilder, private typeProbleme: TypeProblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['', Validators.compose([verifCaracteres.longueurMinimum(), Validators.required])],
      nom: ['', Validators.compose([verifCaracteres.longueurMinimum(), Validators.required])],
      noTypeProbleme: ['', Validators.required],
      telephone: [{ value: '', disabled: true }],
      groupCourriel: this.fb.group({
        courriel: [{ value: '', disabled: true }],
        confirmationCourriel: [{ value: '', disabled: true }]
      }),
      radio: ['non'],
      descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
      noUnite: '',
      dateProbleme: { value: Date(), disabled: true }
    });

    this.typeProbleme.obtenirTypeProbleme().subscribe(cat => this.typeProblemeProduit = cat, error => this.errorMessage = <any>error);

    this.problemeForm.get('radio').valueChanges.subscribe(value => this.appliquerNotifications(value))
  }

  appliquerNotifications(typeNotification: string): void {
    const telephoneControl = this.problemeForm.get('telephone')
    const courrielGroup = this.problemeForm.get('groupCourriel');
    const courrielControl = this.problemeForm.get('groupCourriel.courriel');
    const confirmationControl = this.problemeForm.get('groupCourriel.confirmationCourriel');

    courrielGroup.clearValidators();
    courrielGroup.reset();
    courrielGroup.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

    confirmationControl.clearValidators();
    confirmationControl.reset();
    confirmationControl.disable();

    if (typeNotification == 'courriel') {
      courrielGroup.setValidators(emailMatcherValidator.courrielDifferents());

      courrielControl.setValidators(Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+$')]));
      courrielControl.enable();

      confirmationControl.setValidators(Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+$')]));
      confirmationControl.enable();
    } else if (typeNotification == 'text') {
      telephoneControl.setValidators(Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]));
      telephoneControl.enable();
    }

    telephoneControl.updateValueAndValidity();
    courrielControl.updateValueAndValidity();
    confirmationControl.updateValueAndValidity();
    courrielGroup.updateValueAndValidity();
  }
}
