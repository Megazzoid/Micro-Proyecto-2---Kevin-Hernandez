import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Favcharacters } from '../models/FavCharacters';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  FavCollection: AngularFirestoreCollection<Favcharacters>;
  FavDoc: AngularFirestoreDocument<Favcharacters>;
  Favoritos: Observable<Favcharacters[]>;
  Favorito: Observable<Favcharacters>;
  constructor( private afs: AngularFirestore) {
      this.FavCollection = this.afs.collection<Favcharacters>('favorito', ref => ref);
   }
  
  InitializeCollectionUid(uid?: string){
    if(uid){
      this.FavCollection = this.afs.collection<Favcharacters>('favorito', ref => ref.where('uid', '==', uid));
    }
  }
  getfavoritos(uid?: string) {
    if(uid){
        this.FavDoc = this.afs.doc<Favcharacters>(`favorito/${uid}`);
        this.Favorito = this.FavDoc.snapshotChanges().pipe(map(action => {
          if(action.payload.exists == false){
            return null;
          }else{
            const data = action.payload.data() as Favcharacters;
            data.Id = action.payload.id;
            return data;
          }
        }));
        return this.Favorito;
    }
}
save(Favorito: Favcharacters){
    this.FavCollection.doc(Favorito.Id).set(Favorito);
  }
}