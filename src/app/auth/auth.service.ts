import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//Firebase:
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/firestore';
import firebase from 'firebase/app';




//Modelos:
import { User } from "../models/user";

//Observables:
import {switchMap} from 'rxjs/operators';
import { Observable , of} from 'rxjs';


@Injectable()
export class AuthService {
  
  User: Observable<User>;
  

  constructor (
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) 
  {
    //Se comprueba si el usuario esta correctamente logeado en la aplicación:
    this.User = this.afAuth.authState.pipe(switchMap(User => 
    {
      //Usuario conectado:
      if( User )
      {
        return this.firestore.doc<User>(`users/${User.uid}`).valueChanges();
      }
      //Usuario desconectado:
      else 
      {
        return of(null);
      }
    }))
  }

  //Método para usar el inicio de sesión con Google:
  public googleLogin() 
  {
    var provider = new firebase.auth.GoogleAuthProvider();

    return this.oAuthLogin(provider);
  }

  //Método para iniciar sesión y guardar la información del usuario (Google):
  private oAuthLogin(provider) 
  {
    return this.afAuth.signInWithPopup(provider).then(credentials => {
      const user = credentials.user;
      this.firestore.collection<User>('users', ref => ref.where('email', '==', user.email)).snapshotChanges()
      .subscribe(data => {
        if(!data.length)
        {
          const newUser = 
          {
            uid: user.uid,
            email: user.email,
          
          }
          this.firestore.collection('users').doc(user.uid).set(newUser).then(() => {
            this.router.navigate(['/lista']);
            return;
          })
        }
      })
      this.router.navigate(['/lista']);
    })
  }
  //Método para iniciar sesión con email y password:
  public emailAndPassword(email, password)
  {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  //Método para registrar un nuevo usuario:
  public signUp(email, password)
  {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  //Método para cerrar sesión:
  public signOut() 
  {
    this.afAuth.signOut().then(() => 
    this.router.navigate(['/login']));
  }

  
}