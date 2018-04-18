import { verifCaracteres } from "./caracteres-validator";
import { AbstractControl } from "@angular/forms/src/model";

describe('sansEspace Validator', () => {
    it('une chaîne vide est invalide ', () => {
        let control = { value: "" };
        let validator = verifCaracteres.sansEspace();
        let result = validator(control as AbstractControl);
        expect(result['sansEspace']).toBe(false);
    });

    it('une chaîne avec 10 espaces est invalide', () => {
        let control = { value: "          " };
        let validator = verifCaracteres.sansEspace();
        let result = validator(control as AbstractControl);
        expect(result['sansEspace']).toBe(false);
    });

    it('une phrase avec des mots est valide', () => {
        let control = { value: "hello world how are you?" };
        let validator = verifCaracteres.sansEspace();
        let result = validator(control as AbstractControl);
        expect(result['sansEspace']).toBe(true);
    });

    it('une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
        let control = { value: "hello   world   how   are   you  ?" };
        let validator = verifCaracteres.sansEspace();
        let result = validator(control as AbstractControl);
        expect(result['sansEspace']).toBe(true);
    });
});

describe('longueurMinimum Validator', () => {
    it('une expression avec 1 espace et 2 caractère est invalide', () => {
        let control = { value: " xx" };
        let validator = verifCaracteres.longueurMinimum();
        let result = validator(control as AbstractControl);
        expect(result['longueurMinimum']).toBe(true);
    });

    it('une expression avec 2 espaces et 1 caractère est invalide', () => {
        let control = { value: "  x" };
        let validator = verifCaracteres.longueurMinimum();
        let result = validator(control as AbstractControl);
        expect(result['longueurMinimum']).toBe(true);
    });

    it('une phrase avec 3 espaces et 3 caractères est valide', () => {
        let control = { value: "  J’aime Angular" };
        let validator = verifCaracteres.longueurMinimum();
        let result = validator(control as AbstractControl);
        expect(result['longueurMinimum']).toBe(false);
    });

    it('une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
        let control = { value: "  J’aime Angular  " };
        let validator = verifCaracteres.longueurMinimum();
        let result = validator(control as AbstractControl);
        expect(result['longueurMinimum']).toBe(false);
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