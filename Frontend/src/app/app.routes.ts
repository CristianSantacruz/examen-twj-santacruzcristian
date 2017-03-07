import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {CelularComponent} from "./celular/celular.component";
import {AplicacionComponent} from "./aplicacion/aplicacion.component";

export const routes:Routes =[
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'celulares', component: CelularComponent},
  {path:'celulares/:idCelular/aplicacion', component: AplicacionComponent}
];
export const routing:ModuleWithProviders=RouterModule.forRoot(routes);

