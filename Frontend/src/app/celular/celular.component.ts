import { Component, OnInit } from '@angular/core';
import {MasterUrlService} from "../services/master-url.service";
import {Http, Response} from "@angular/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-celular',
  templateUrl: './celular.component.html',
  styleUrls: ['./celular.component.css']
})
export class CelularComponent implements OnInit {

  title: string = "Bienvenidos a Ingresar Celulares";
  nuevoCelular: any = {};
  Celulares = [];
  disabledButtons={
    NuevoCelularFormSubmitButton:false
  };

  constructor(private _http: Http,
              private _masterURL:MasterUrlService) { }

  ngOnInit() {
    this._http.get(this._masterURL.url+"Celular")
      .subscribe(
        (res:Response)=>{
          this.Celulares=res.json().map((value)=>{
            value.formularioCerrado=true;
            return value;
          });
        },
        (err)=>{
          console.log(err)
        }
      )
  }
  crearCelular(formulario:NgForm) {
    this.disabledButtons.NuevoCelularFormSubmitButton=true;
    let nuevoCelular={
      nombre:formulario.value.nombre,
      sistemaOperativo:formulario.value.sistemaOperativo,
      version:formulario.value.version
    };
    this._http.post(this._masterURL.url + "Celular", nuevoCelular)
      .subscribe(
        (res)=>{
          console.log("Sin Errores");
          console.log(res);
          this.Celulares.push(res.json());
          this.nuevoCelular={};
          this.disabledButtons.NuevoCelularFormSubmitButton=false;
        },
        (err)=>{
          this.disabledButtons.NuevoCelularFormSubmitButton=false;
          console.log("Error: ",err);
        },
        ()=>{
          console.log("Termino la función vamos a las casas");
        }
      );
  }
  borrarCelular(id:number){
    this._http.delete(this._masterURL.url+"Celular/" +id)
      .subscribe(
        (res)=>{
          let celularBorrado=res.json();
          this.Celulares=this.Celulares.filter(value=>celularBorrado.id!=value.id)
        },
        (err)=>{
          console.log(err);
        }
      )
  }
  actualizarCelular(celular:any){
    let parametros = {
      nombre:celular.nombre
    };
    this._http.put(this._masterURL.url+"Celular/"+celular.id,parametros)
      .subscribe(
        (res: Response)=>{
          celular.formularioCerrado=!celular.formularioCerrado;
          console.log("Respuesta", res.json());
        },
        (err)=>{
          console.log("Error"+err);
        }
      )
  }
}
