import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  untracked,
  ViewChild
} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {concatMap, fromEvent, Observable} from "rxjs";
import {exhaustMap, filter, map, switchMap, tap} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {FormValidator} from "../../validators/form-validator";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Store} from "@ngrx/store";
import {loginGoogleRequest, loginRequest} from "../../../store/auth/auth.actions";
import {authLoading, isAuthenticated, user} from "../../../store/auth/auth.selectors";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthState} from "../../../store/auth/auth.state";
import {AUTH_SVGS} from "../../../shared/svgs/svgs";

@UntilDestroy()
@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('signInBtn', {static: true, read: ElementRef<HTMLButtonElement>}) signInBtn: ElementRef<HTMLButtonElement>;
  @ViewChild('googleBtn', {static: true, read: ElementRef<HTMLButtonElement>}) googleBtn: ElementRef<HTMLButtonElement>;
  @ViewChild('facebookBtn', {
    static: true,
    read: ElementRef<HTMLButtonElement>
  }) facebookBtn: ElementRef<HTMLButtonElement>;
  @ViewChild('githubBtn', {static: true, read: ElementRef<HTMLButtonElement>}) githubBtn: ElementRef<HTMLButtonElement>;

  public form: FormGroup;
  public user$: Observable<any>;
  public loader$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AuthState>,
    private afs: AngularFireAuth,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.user$ = this.store.select(user);
    this.loader$ = this.store.select(authLoading);

    this._createForm();
  }

  ngAfterViewInit(): void {
    this._signIn();
    this._loadSVGS();
  }

  private _createForm(): void {
    this.form = this.fb.group({
      email: ['a@a.com', [Validators.required, Validators.email]],
      password: ['Qwerty123', [Validators.required, FormValidator.minLength, FormValidator.maxLength]],
    });
  }

  private _signIn(): void {
    const {email, password} = this.form.value;

    fromEvent(this.signInBtn.nativeElement, 'click').pipe(
      untilDestroyed(this),
      filter(() => this.form.valid),
      map(() => {
        return this.store.dispatch(loginRequest({email, password}))
      }),
    ).subscribe();
  }

  private _loadSVGS(): void {
    this.googleBtn.nativeElement.innerHTML = AUTH_SVGS.GOOGLE;
    this.facebookBtn.nativeElement.innerHTML = AUTH_SVGS.FACEBOOK;
    this.githubBtn.nativeElement.innerHTML = AUTH_SVGS.GITHUB;
  }

  public register(): void {
    this.router.navigate(['register'])
  }

  public googleAuth():void{
    this.store.dispatch(loginGoogleRequest())
  }

  public get control() {
    return this.form.controls;
  }


}
