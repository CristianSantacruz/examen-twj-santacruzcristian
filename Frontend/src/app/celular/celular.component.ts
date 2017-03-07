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
  title: string = "Bienvenido a Celulares";
  nuevoCelular = {};
  celulares= [];
  disabledButtons = {
  NuevoCelularFormSubmitButton: false,
  Oculto : false
  };

  constructor(private _http: Http,
              private _masterURL:MasterUrlService) { }

  ngOnInit() {
    this.disabledButtons.Oculto = true;
    this._http.get(this._masterURL.url + "Celular")
      .subscribe(
        (res: Response) => {
          this.celulares= res.json()
            .map((value) => {
              value.formularioCerrado = true;
              return value;
            });
        },
        (err) => {
          console.log(err);
        }
      )
  }
  crearCelular(formulario:NgForm) {
    console.log(formulario);
    this.disabledButtons.NuevoCelularFormSubmitButton = true;
    this._http.post(this._masterURL.url + "Celular", {
      nombre: formulario.value.nombre,
      sistemaOperativo: formulario.value.sistemaOperativo,
      version1: formulario.value.version1
    }).subscribe(
      (res) => {
        console.log("No hubo errores");
        console.log(res);
        this.celulares.push(res.json());
        this.nuevoCelular = {};
        this.disabledButtons.NuevoCelularFormSubmitButton = false;
        this.disabledButtons.Oculto = true;
      },
      (err) => {
        this.disabledButtons.NuevoCelularFormSubmitButton = false;
        console.log("Ocurrió un error", err);
      },
      () => {
      }
    );
  }
  borrarCelular(id:number){
    this._http.delete(this._masterURL.url + "Celular/" + id)
      .subscribe(
        (res) => {
          let celularBorrado = res.json();
          this.celulares = this.celulares.filter(value => celularBorrado.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }
  actualizarCelular(celular:any){
    let parametos = {
      nombre: celular.nombre,
      sistemaOperativo: celular.sistemaOperativo,
      version1: celular.version1
    };
    this._http.put(this._masterURL.url + "Celular/" + celular.id, parametos)
      .subscribe(
        (res: Response) => {
          celular.formularioCerrado = !celular.formularioCerrado;
          console.log("Respuesta:", res.json());
        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }
}
