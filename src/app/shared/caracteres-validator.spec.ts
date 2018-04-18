import { verifCaracteres } from "./caracteres-validator";
import { AbstractControl } from "@angular/forms/src/model";

describe('sansEspaces Validator', () => {
    it('une chaîne vide est invalide ', () => {
        let control = { value: "" };
        let validator = verifCaracteres.sansEspace();
        let result = validator(control as AbstractControl);
        expect(result['chaine']).toBe(false);
    });

    it('une chaîne avec 10 espaces est invalide', () => {
        let control = { value: "          " };
        let validator = verifCaracteres.sansEspace();
        let result = validator(control as AbstractControl);
        expect(result['chaine']).toBe(false);
    });

    it('une phrase avec des mots est valide', () => {
        let control = { value: "hello world how are you?" };
        let validator = verifCaracteres.sansEspace();
        let result = validator(control as AbstractControl);
        expect(result['chaine']).toBe(true);
    });

    it('une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
        let control = { value: "hello   world   how   are   you  ?" };
        let validator = verifCaracteres.sansEspace();
        let result = validator(control as AbstractControl);
        expect(result['chaine']).toBe(true);
    });
});

describe('Prenom validator', () => {
    it('plage pour le nombre limite de caractere 0 (invalide)', () => {
        let control = { value: 0 };
        let validator = verifCaracteres.plage();
        let result = validator(control as AbstractControl);
        expect(result['plage']).toBe(false);
    });
});