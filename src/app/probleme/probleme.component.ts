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
      noTypeProbleme: ['', Validators.required]
    });

    this.typeProbleme.obtenirTypeProbleme().subscribe(cat => this.typeProblemeProduit = cat, error => this.errorMessage = <any>error);
  }
}
