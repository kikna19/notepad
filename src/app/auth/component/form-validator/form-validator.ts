import {FormControl} from "@angular/forms";

export class FormValidator {
  static minLength(control: FormControl) {

    if (control.value?.length < 6) {
      return {minLength: true}
    }
    return null
  }

  static maxLength(control: FormControl) {
    if (control.value?.length > 20) {
      return {maxLength: true}
    }
    return null
  }
}
