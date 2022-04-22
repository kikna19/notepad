import {NgModule} from "@angular/core";
import {CommonModule, DatePipe} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDividerModule} from "@angular/material/divider";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {NodepadComponent} from "./component/notepad-all/nodepad.component";
import {NotepadCreateComponent} from "./component/notepad-create/notepad-create.component";
import {NotepadItemComponent} from "./component/notepad-item/notepad-item.component";
import {NoteResolve} from "./service/note-resolve/note.resolve";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {CreateConfirmComponent} from "./component/notepad-create/create-confirm/create-confirm.component";
import {MatInputModule} from "@angular/material/input";
import {NoteService} from "./service/note.service";
import {LockedItemComponent} from "./component/notepad-item/locked-item/locked-item.component";
import {MatIconModule} from "@angular/material/icon";
import { DateTimeFormatPipe } from "./component/notepad-item/date-pipe/date.pipe";

const routes: Routes = [
  {path: '', redirectTo: 'all', pathMatch: 'full'},
  {path: 'all', component: NodepadComponent, children: [
      {path: 'create', component: NotepadCreateComponent},
      {path: 'note/:id', component: NotepadItemComponent, outlet: 'item', resolve: [NoteResolve]},
    ]
  },
]

@NgModule({
  declarations: [
    NodepadComponent,
    NotepadCreateComponent,
    NotepadItemComponent,
    CreateConfirmComponent,
    LockedItemComponent,
    DateTimeFormatPipe,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AngularFireDatabaseModule,
        MatToolbarModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatInputModule,
        MatIconModule,
    ],

  providers: [
    NoteService,
    NoteResolve
  ]
})
export class NotepadModule {

}
