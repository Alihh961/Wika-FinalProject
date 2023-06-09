
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export const passwordDoesntMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  let password = control.get("password");
  let passwordConf = control.get("confPassword");
  if (password && passwordConf && password?.value === passwordConf?.value) {
    return null;
  }
  return {
    doesntMatchError: true
  }
}
