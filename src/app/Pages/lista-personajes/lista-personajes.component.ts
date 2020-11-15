import { Component, OnInit } from '@angular/core';
import { MortyService } from '../../services/morty.service';
import { Character } from '../../models/Character';
import { Router} from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { NgForm } from '@angular/forms';
import { FavoritosService } from '../../services/favoritos.services';
import { Favcharacters } from '../../models/FavCharacters';




@Component({
  selector: 'app-lista-personajes',
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.scss']
})
export class ListaPersonajesComponent implements OnInit {
  Characters: Character[] = [];
  Opciones: any;
  cargando = false;
  Response: any;
  favoritos: Favcharacters ;
  user: any;

  constructor(private CharacteresService: MortyService, public RouterSerivce: Router, public auth: AuthService, public fav: FavoritosService) {}
      
  ngOnInit() {
    
    
    
    this.auth.User.subscribe(user => {
      if(user){
        this.user = user;
          this.fav.getfavoritos(user.uid).subscribe(Favoritos => {
          this.favoritos = Favoritos;
          }) 
        }       
    })
    this.cargando = true;
    this.CharacteresService.getCharacters()
      .subscribe( resp => {
        this.Response = resp;
        this.Characters = this.Response[1];
        this.cargando = false;
        this.Opciones = resp[0];    

        if(this.favoritos != null) {
          this.favoritos.favorites.map(id => {
          let obj = this.Characters.find(el => el.id = id);
          let index = this.Characters.findIndex(el => el.id = id);
          obj.havelikes = true;
          this.Characters[index] = obj;
        });}
        
      });
    }
    IrDetalles(id){
      this.RouterSerivce.navigate(['/detalle',id]);
      
    }

  Irsiguiente(){
    this.CharacteresService.getCharacterByPage(this.Opciones.next).subscribe( resp => {
      this.Response = resp;
      this.Characters = this.Response[1];
      this.cargando = false;
      this.Opciones = resp[0];    
      
    });
      
  }  

  IrAtras(){
    this.CharacteresService.getCharacterByPage(this.Opciones.prev).subscribe( resp => {
      this.Response = resp;
      this.Characters = this.Response[1];
      this.cargando = false;
      this.Opciones = resp[0];    
      
    });
      
  }
    
  Buscar(form: NgForm){

    console.log(form.value.mujer);
    

  }


  AgregarFavoritos(id){
  
    
      let obj = this.Characters.find(el => el.id = id);
      let index = this.Characters.findIndex(el => el.id = id);
      obj.havelikes = true;
      this.Characters[index] = obj;
    

    if(this.favoritos == null) {
      this.favoritos = {
        Id : this.user.uid,
        favorites : []
      };
    }
    

    this.favoritos.favorites.push(id);
    this.fav.save(this.favoritos);
  

  }


}
