import { Component, OnInit } from '@angular/core';
import { Favcharacters } from '../../models/FavCharacters';
import { AuthService } from '../../auth/auth.service';
import { FavoritosService } from '../../services/favoritos.services';
import { MortyService } from '../../services/morty.service';




@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {
  favoritos: any;
  data: any;

  constructor(public auth: AuthService,  public fav: FavoritosService, public morty: MortyService) { }

  ngOnInit(): void {

    this.auth.User.subscribe(user => {
      if(user){
          this.fav.getfavoritos(user.uid).subscribe(Favoritos => {
          this.favoritos = Favoritos;
          this.morty.getCharactersFavoritos(Favoritos).subscribe(mortydata => {
            this.data = mortydata;
            console.log("Datos:",this.data);
          })
          }) 
        }       
    })
   
   
  }

  

}
