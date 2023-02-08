import { Injectable, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Subscription, Observable, map, switchMap, EMPTY } from 'rxjs';

import { AppState } from 'src/app/app.reducer';
import { User } from './../models/user.model';
import * as authActions from '../auth/auth.actions';
import * as ingressEgressActions from '../ingress-egress/ingress-egress.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private _firebaseUser: firebase.default.User | null;
  private changeFirebaseUserSubscription: Subscription = Subscription.EMPTY;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>) {

    this._firebaseUser = null;
    this.setChangeFirebaseUserSubscription();
  }

  get firebaseUser(): firebase.default.User | null {
    return this._firebaseUser;
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
    this.changeFirebaseUserSubscription = this.afAuth.authState.pipe(
      switchMap(fuser => {
        // Always take the returned user from Firebase:
        this._firebaseUser = fuser;

        if (!fuser) {
          // Set the current user as null:
          this.store.dispatch(authActions.unSetUser());
          // Clear the IngressEgress items from the store:
          this.store.dispatch(ingressEgressActions.unsetItems());
          // Complete the stream:
          return EMPTY;
        }

        // Listen to the user's firebase doc valueChanges observable:
        return this.firestore.doc<{ email: string; name: string; uid: string; }>(`${fuser.uid}/usuario`).valueChanges();
      })
    ).subscribe({
      next: userDoc => {
        // Once we receive the firebase doc of the current user:
        if (!!userDoc) {
          // Create a new instance of User class:
          const user = new User(userDoc.uid, userDoc.name, userDoc.email);
          // Save the user in the store:
          this.store.dispatch(authActions.setUser({ user }));
        }
      }
    });
  }
}
