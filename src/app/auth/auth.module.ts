import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../environments/environment.prod";
import {AuthService} from "./service/auth.service";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormErrorPipe} from "./component/form-pipe/form-error.pipe";


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
]


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    FormErrorPipe,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule
    ],
  exports: [
    RegisterComponent,
    LoginComponent,
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {

}
