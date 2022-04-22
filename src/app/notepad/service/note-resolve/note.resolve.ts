import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {NoteService} from "../note.service";


@Injectable()
export class NoteResolve implements Resolve<any> {

  noteItem: any[] = [];

  constructor(
    private note: NoteService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): any {
    this.note.get().subscribe(res => {
      this.noteItem = res;
    })
    return this.noteItem[route.params.id]
  }
}
