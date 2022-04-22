import {FormControl} from "@angular/forms";

export class CheckSpace{
  static noSpace(control: FormControl){
    const isValid = (control.value || '').trim().length >= 5;
    return isValid ? null : {'noSpace': true}
  }
}
