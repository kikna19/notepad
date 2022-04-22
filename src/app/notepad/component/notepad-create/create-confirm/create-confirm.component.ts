import {ChangeDetectionStrategy, Component, Inject} from "@angular/core";
import {MAT_SNACK_BAR_DATA, MatSnackBar} from "@angular/material/snack-bar";
import {NoteService} from "../../../service/note.service";
import {Note} from "../../../interface/user.interface";

@Component({
  selector: 'confirm',
  templateUrl: 'create-confirm.components.html',
  styleUrls: ['create-confirm.components.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CreateConfirmComponent {


  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { text: any, time: any, note: Note },
    private noteService: NoteService,
    private snack: MatSnackBar
  ) {
  }

  create() {
    this.noteService.textValue = true;
    this.noteService.create(this.data.text, this.data.time);
    this.snack.dismiss();
  }

  update() {
    this.noteService.textValue = true;
    this.noteService.update(this.data.note, this.data.note.key);
    this.snack.dismiss();
  }

  cancel(): void {
    this.noteService.textValue = false;
    this.snack.dismiss();
  }


}
