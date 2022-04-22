import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  error: any;

  constructor(
    private afs: AngularFireAuth
  ) { }

  user() {
    return this.afs.authState;
  }

  async register(email: string, password: string) {
    try {
      await this.afs.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      this.error = err;
    }
  }

  async login(email: string, password: string) {
    try {
      await this.afs.signInWithEmailAndPassword(email, password);
    } catch (err: any) {
      this.error = err;
    }
  }

  async logOut() {
    await this.afs.signOut();
  }
}
