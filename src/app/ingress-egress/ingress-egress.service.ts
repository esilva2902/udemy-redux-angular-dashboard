import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';

import { from, map, Observable, pipe } from 'rxjs';

import { IngressEgress, IngressEgressDoc } from '../models/ingress-egress.model';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngressEgressService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService) { }

  addIngressEgress(ingressEgress: IngressEgress): Observable<DocumentReference<firebase.default.firestore.DocumentData>> {
    return from(new Promise<DocumentReference<firebase.default.firestore.DocumentData>>( async (resolve, reject) => {
      try {
        // Create the new doccument and the items for that document:
        if (!!this.authService.firebaseUser) {
          const newDocRef = await this.firestore.doc(`${this.authService.firebaseUser.uid}/ingreso-egreso`)
            .collection('items')
            .add({ ...ingressEgress });

          resolve(newDocRef);
        }

        throw new Error('The user is not logged in.');

      } catch (error) {
        reject(error);
      }
    }));

  }

  getIngressEgressItems(uid: string): Observable<IngressEgressDoc[]> {
    return this.firestore
      .doc(`${uid}/ingreso-egreso`)
      .collection('items')
      .snapshotChanges()
      .pipe(
        map(snapshotItems => snapshotItems.map(snapshot => {
          const docData: IngressEgress = snapshot.payload.doc.data() as IngressEgress;
          return new IngressEgressDoc(docData.description,
            docData.amount, docData.type, snapshot.payload.doc.id);
        }))
      )
  }

  deleteIngressEgressItem(docId: string): Observable<void> {
    return from (new Promise<void>( async (resolve, reject) => {
      try {
        if (!!this.authService.firebaseUser) {
          await this.firestore.doc(`${this.authService.firebaseUser.uid}/ingreso-egreso/items/${docId}`).delete();
          resolve();
        }

        throw new Error('The user is not logged in.');

      } catch (error) {
        reject(error);
      }
    }));
  }
}
