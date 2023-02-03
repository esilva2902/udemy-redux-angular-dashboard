import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription, Observable, map } from 'rxjs';

import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private changeFirebaseUserSubscription: Subscription = Subscription.EMPTY;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore) {
    this.setChangeFirebaseUserSubscription();
  }

  ngOnDestroy(): void {
    this.changeFirebaseUserSubscription.unsubscribe();
  }

  createUser(name: string, email: string, password: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((fuser: firebase.default.auth.UserCredential) => {
        if (!fuser.user) {
          throw new Error('AngularFireAuth.createUserWithEmailAndPassword Error. No Firebase user returned');
        }

        const newUser = new User(fuser.user.uid, name, email);
        return this.firestore.doc(`${newUser.uid}/usuario`).set({ ...newUser });
      });
  }

  login(email: string, password: string): Promise<firebase.default.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(fuser => !!fuser)
    );
  }

  private setChangeFirebaseUserSubscription(): void {
    this.changeFirebaseUserSubscription.unsubscribe();
    this.changeFirebaseUserSubscription = this.afAuth.authState
      .subscribe({
        next: fuser => console.log(fuser)
      }
    );
  }
}
