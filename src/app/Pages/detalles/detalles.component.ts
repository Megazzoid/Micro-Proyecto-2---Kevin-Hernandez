import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/Character';
import { MortyService } from '../../services/morty.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  Character: any;
 
  cargando = false;
  

 
  id: any;

  constructor(private CharacteresService: MortyService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => (this.id = params['id']));
  }

  ngOnInit() {
       // In a real app: dispatch action to load the details here.
       this.cargando = true;
       this.CharacteresService.getCharacter(this.id)
         .subscribe( resp => {
           this.cargando = false;
           this.Character = resp;

           console.log(this.Character);
        

         });
  }

  

}
