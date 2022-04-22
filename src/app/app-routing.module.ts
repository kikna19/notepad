import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotesGuard} from "./auth/service/notes-guard/notes.guard";

const routes: Routes = [
  {path: '', loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule)},
  {
    path: 'notes', loadChildren: () => import('../app/notepad/notepad.module').then(m => m.NotepadModule),
    // canLoad: [NotesGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [NotesGuard]
})
export class AppRoutingModule {
}
