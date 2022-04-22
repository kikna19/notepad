import {AfterViewInit, Component, ElementRef, Renderer2, RendererStyleFlags2, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {NoteService} from "../../service/note.service";
import {fromEvent, Subject} from "rxjs";
import {Note} from "../../interface/user.interface";
import {gsap} from 'gsap';
import {filter, map} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CheckPin} from "./check-pin/check-pin";


const important = RendererStyleFlags2.Important;

@Component({
  selector: 'notepad-item',
  templateUrl: 'notepad-item.component.html',
  styleUrls: ['notepad-item.components.scss'],
})
export class NotepadItemComponent implements AfterViewInit {


  @ViewChild('lockN', {static: true, read: ElementRef}) lockN!: ElementRef;
  @ViewChild('lockForm', {static: true, read: ElementRef}) lockForm!: ElementRef;

  @ViewChild('pin', {static: true, read: ElementRef}) pin!: ElementRef<HTMLInputElement>;
  @ViewChild('confirmPin', {static: true, read: ElementRef}) confPin!: ElementRef<HTMLInputElement>;
  form: FormGroup;
  note!: Note;
  delete$ = new Subject<boolean>();
  lockedOpen: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router,
    private renderer: Renderer2,
    private fb: FormBuilder
  ) {
    this.route.data.subscribe(res => {
      this.note = res[0];
    });
    this.form = this.fb.group({
      pin: ['', [Validators.required]],
      confirmPin: ['', [Validators.required]]
    }, {validators: CheckPin.checkPinCode})
  }

  deleteNote(key: any) {
    this.noteService.delete(key).then(() => {
      return this.router.navigate(['/notes']);
    })
  }

  updateNote() {
    this.noteService.noteValue$.next(this.note);
    return this.router.navigate([{outlets: {primary: 'create', item: null}}],
      {relativeTo: this.route.parent});
  }

  ngAfterViewInit(): void {
    fromEvent(document.body, 'click').pipe(
      filter(() => this.lockedOpen),
      filter(e => ![
        this.lockN.nativeElement,
        this.pin.nativeElement,
        this.confPin.nativeElement,
        this.lockForm.nativeElement,
        document.getElementById('noteBtn'),
        document.getElementById('noteIcon'),
      ].some(elem => e.target === elem)),
      map(() => this.lockClose()),
    ).subscribe();
  }


  openNote(e: any) {
    this.note.locked = false;
  }

  unlockNote(key: any) {
    this.note.locked = false;
    this.noteService.update(
      {
        key: this.note.key,
        note: this.note.note,
        time: this.note.time,
        lock: null,
        locked: false,
      }, key)
  }

  lockNote(key: any): void {
    let pinCode = this.form.get('pin')?.value;
    if (this.form.valid) {
      this.noteService.update(
        {
          key: this.note.key,
          note: this.note.note,
          time: this.note.time,
          lock: pinCode,
          locked: true,
        }, key).then(() => {
        this.lockClose();
        this.router.navigate(['/notes']);
      })
    }
  }


  lockOpen(): void {
    gsap.to(this.lockN.nativeElement, {
      duration: .5,
      display: 'block',
      y: '35rem',
      ease: 'none',
    });
    this.renderer.setStyle(document.body, 'overflow', 'hidden', important);
    this.lockedOpen = true;
  }


  lockClose(): void {
    gsap.to(this.lockN.nativeElement, {
      duration: 1,
      y: '-30rem',
      ease: 'none',
    });
    this.renderer.removeStyle(document.body, 'overflow');
    this.lockedOpen = false;
  }

  numbersOnly(e: any){
    const input = String.fromCharCode(e.keyCode);
    if (!/^[0-9]*$/.test(input)) {
      e.preventDefault();
    }
  }

}
