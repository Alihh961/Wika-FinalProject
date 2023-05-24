import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InputvalidationsService {

  constructor() { }

  ageIsValid(control: FormControl): boolean {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 since getMonth() returns zero-based index
    const currentDay = currentDate.getDate();
  
    const birthdate = new Date(control.value);
    const birthYear = birthdate.getFullYear();
    const birthMonth = birthdate.getMonth() + 1;
    const birthDay = birthdate.getDate();
  
    const ageYears = currentYear - birthYear;
    const ageMonths = currentMonth - birthMonth;
    const ageDays = currentDay - birthDay;
  
    if (ageYears > 18) {
      return true; // Valid age
    }
  
    return false; // Age is less than 18
  }

}
