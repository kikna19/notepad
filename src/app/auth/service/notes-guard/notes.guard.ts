import {Injectable} from "@angular/core";
import {CanLoad} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class NotesGuard implements CanLoad {

  notesLoad: boolean = false;

  canLoad(): boolean {
    return this.notesLoad;
  }
}
