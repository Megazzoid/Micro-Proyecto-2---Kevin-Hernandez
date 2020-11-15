import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../models/Character';
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MortyService {

  
    private url = "https://rickandmortyapi.com/api";

  constructor( private http: HttpClient ) { } //usando htppclient puedes entrar al url

  //conseguir personaje especficio

  getCharacter(id){

    return this.http.get(`${ this.url }/character/${id}`);

  }


  getCharacters() {
    return this.http.get(`${ this.url }/character/`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }


  
  private crearArreglo( CharacterObj: object ) {

    const Characters: Character[] = [];

    Object.keys( CharacterObj ).forEach( key => {

      const Morty: Character = CharacterObj[key];
     Morty.id = parseInt(key);

      Characters.push( Morty );
    });


    return Characters;

  }

  getCharacterByPage(urlpage){
    return this.http.get(`${urlpage}`)
    .pipe(
      map( this.crearArreglo ),
      delay(0)
    );
  }


  getCharactersFavoritos(Favoritos){
    console.log("favorito",Favoritos.favorites);
    
    return this.http.get(`${ this.url }/character/${Favoritos.favorites}`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  
            
    
  }


  




 


  
 


}