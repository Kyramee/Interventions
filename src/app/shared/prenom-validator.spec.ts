import { VerifPrenomValidator } from "./prenom-validator";

describe('Prenom validator', () => {
    it('plage pour le nombre  limite de caractere 1', () => {
        let validator = VerifPrenomValidator.plage();
        let result = validator(null);
        expect(result['plage']).toBe(true);
    });
});