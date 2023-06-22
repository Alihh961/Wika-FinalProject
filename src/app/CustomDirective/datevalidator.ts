import { FormControl } from '@angular/forms';

export function isValidDate(control: FormControl) {
  const inputDate = new Date(control.value);
  const isValid = !isNaN(inputDate.getTime());
  return isValid ? null : { invalidDate: true };
}
