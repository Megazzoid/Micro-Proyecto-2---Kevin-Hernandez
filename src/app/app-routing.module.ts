import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPersonajesComponent } from './Pages/lista-personajes/lista-personajes.component';
import { DetallesComponent } from './Pages/detalles/detalles.component';
import { AuthGuard } from './auth/auth.guard';
import { FavoritosComponent } from './Pages/favoritos/favoritos.component';




const routes: Routes = [
  {path: '', redirectTo: '/lista', pathMatch: 'full'},
  {path: "lista", component: ListaPersonajesComponent},
  {path: "detalle/:id", component: DetallesComponent},
  {path: "favoritos", component: FavoritosComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
