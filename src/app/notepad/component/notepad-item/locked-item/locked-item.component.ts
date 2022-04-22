import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Note} from "../../../interface/user.interface";

@Component({
  selector: 'locked',
  templateUrl: 'locked-item.component.html',
  styleUrls: ['locked-item.component.scss'],
})
export class LockedItemComponent {

  form: FormGroup;
  showBtn: boolean = true;
  @Input() note!: Note;
  @Output() open = new EventEmitter<boolean>();
  @Output() unlock = new EventEmitter<boolean>();


  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      pin: ['', Validators.required, Validators.pattern(/^([0-9])$/)]
    })
  }

  unlockNote(): void {
    let pin = this.form.get('pin')?.value;
    if (pin == this.note.lock) {
      this.unlock.emit(this.note.key);
    }
  }

  openNote(): void {
    let pin = this.form.get('pin')?.value;
    if (pin == this.note.lock) {
      this.open.emit(true);
    }
  }



  onInput(e: any): void {
    if (e.target.value == this.note.lock) {
      this.showBtn = false;
    } else {
      this.showBtn = true;
    }
  }

  numbersOnly(e: any){
    const input = String.fromCharCode(e.keyCode);
    if (!/^[0-9]*$/.test(input)) {
      e.preventDefault();
    }
  }

}



