import {AbstractControl} from "@angular/forms";

export class CheckPin {
  static checkPinCode(group: AbstractControl) {
    let pin = group.get('pin')?.value;
    let confirmPin = group.get('confirmPin')?.value;
    return pin == confirmPin ? null : {notSame: true}
  }
}
