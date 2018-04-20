import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { verifCaracteres } from '../shared/caracteres-validator';
import { TypeProblemeService } from './type-probleme.service';
import { ITypeProbleme } from './typeProbleme';

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
      prenom: ['',Validators.compose([verifCaracteres.longueurMinimum(), Validators.required])],
      nom: ['',Validators.compose([verifCaracteres.longueurMinimum(), Validators.required])],
      noTypeProbleme: ['', Validators.required],
      telephone:['pasNotifier'],
      groupCourriel: this.fb.group({
        courriel: [{value: '', disabled: true}],
        confirmationCourriel: [{value: '', disabled: true}]
      })
    });

    this.typeProbleme.obtenirTypeProbleme().subscribe(cat => this.typeProblemeProduit = cat, error => this.errorMessage = <any>error);
  }

  appliquerNotifications(typeNotification: string): void {
    const telephoneControl = this.problemeForm.get('telephone')
    const courrielControl = this.problemeForm.get('groupCourriel.courriel');
    const confirmationControl = this.problemeForm.get('groupCourriel.confirmationCourriel');

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

    confirmationControl.clearValidators();
    confirmationControl.reset();
    confirmationControl.disable();

    if(typeNotification == 'oui'){
      telephoneControl.setValidators([Validators.required]);
      telephoneControl.enable();

      courrielControl.setValidators([Validators.required]);
      courrielControl.enable();

      confirmationControl.setValidators([Validators.required]);
      confirmationControl.enable();
    }

    telephoneControl.updateValueAndValidity();
    courrielControl.updateValueAndValidity();
    confirmationControl.updateValueAndValidity();
  }
}
