import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../auth/service/auth.service";
import {NoteService} from "../../service/note.service";
import {exhaustMap, filter, tap,} from "rxjs/operators";
import {BehaviorSubject, fromEvent, iif} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreateConfirmComponent} from "./create-confirm/create-confirm.component";
import {Note} from "../../interface/user.interface";
import {CheckSpace} from "./check-space/check-space";


@Component({
  selector: 'notepad-create',
  templateUrl: 'notepad-create.component.html',
  styleUrls: ['notepad-create.component.scss']
})
export class NotepadCreateComponent implements OnInit, AfterViewInit, OnDestroy {

  form: FormGroup;
  textArea: any;
  noteValue!: Note;

  @ViewChild('saveBtn', {static: true, read: ElementRef}) saveBtn!: ElementRef;
  @ViewChild('formElement', {static: true}) formElement!: ElementRef;

  time$ = new BehaviorSubject<any>(new Date().toDateString());


  constructor(
    private auth: AuthService,
    public noteService: NoteService,
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      text: ['', [Validators.required, CheckSpace.noSpace]]
    })

  }

  ngOnInit() {
    this.noteValue = this.noteService.noteValue$.value;
    if (this.noteValue) {
      this.textArea = this.noteValue.note;
      this.cdr.detectChanges();
    }
  }


  ngAfterViewInit(): void {
    this.createNote();
    this.closeSnack();
  }

  createNote() {
    fromEvent(this.saveBtn.nativeElement, 'click').pipe(
      exhaustMap((): any => {
        if (Object.keys(this.noteValue).length !== 0) {
          return this.confirmUpdate();
        } else if (Object.keys(this.noteValue).length == 0) {
          return this.confirm();
        }
      }),
    ).subscribe();
  }


  confirm() {
    return this.snack.openFromComponent(CreateConfirmComponent, {
      data: {text: this.textArea, time: this.time$.value},
    }).afterDismissed().pipe(
      filter(() => this.noteService.textValue),
      tap(() => this.form.reset())
    )
  }

  confirmUpdate() {
    return this.snack.openFromComponent(CreateConfirmComponent, {
      data: {note: {key: this.noteValue.key, note: this.textArea, time: this.noteValue.time}},
    }).afterDismissed().pipe(
      filter(() => this.noteService.textValue),
      tap(() => this.form.reset())
    )

  }

  closeSnack(): void {
    fromEvent(document.body, 'click').pipe(
      filter(e => ![
        document.getElementById('saveBtn'),
        document.getElementById('saveIcon'),
      ].some(elem => e.target == elem)),
    ).subscribe(() => {
      this.snack.dismiss();
    })
  }

  ngOnDestroy(): void {
    this.noteService.noteValue$.next({});
  }
}
