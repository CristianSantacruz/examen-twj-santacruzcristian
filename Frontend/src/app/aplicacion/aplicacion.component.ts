import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styleUrls: ['./aplicacion.component.css']
})
export class AplicacionComponent implements OnInit {
  private _parametros: any;
  title: string = "Bienvenido a Aplicaciones";
  nuevaAplicacion= {};
  aplicaciones=[];
  disabledButtons = {
    NuevaAplicacionFormSubmitButton: false,
    Oculto : false
  };

  constructor(private _ActivatedRoute: ActivatedRoute,
              private _http: Http,
              private _masterURL: MasterUrlService) { }

  ngOnInit() {
    this._ActivatedRoute
      .params
      .subscribe(parametros => {
        this._parametros = parametros;
        this._http.get(this._masterURL.url+"Aplicacion?idCelular="+this._parametros.idCelular)
          .subscribe(
            (res:Response)=> {
              this.aplicaciones = res.json() .map((value) => {
                value.formularioCerrado = true;
                return value;
              })
            },
            (err)=>{
              console.log(err)
            }
          )
      });
  }
  crearAplicacion(formulario: NgForm) {
    console.log(formulario);
    this.disabledButtons.NuevaAplicacionFormSubmitButton = true;
    this._http.post(this._masterURL.url + "Aplicacion", {
      nombre: formulario.value.nombre,
      version2: formulario.value.version2,
      tamanio: formulario.value.tamanio,
      idCelular: this._parametros.idCelular
    }).subscribe(
      (res) => {
        console.log("No hubo errores");
        console.log(res);
        this.aplicaciones.push(res.json());
        this.nuevaAplicacion = {};
        this.disabledButtons.NuevaAplicacionFormSubmitButton = false;
        this.disabledButtons.Oculto = true
      },
      (err) => {
        this.disabledButtons.NuevaAplicacionFormSubmitButton = false;
        console.log("Ocurrió un error", err);
      },
      () => {
      }
    );
  }
  borrarAplicacion(id: number) {
    this._http.delete(this._masterURL.url + "Aplicacion/" + id)
      .subscribe(
        (res) => {
          let aplicacionBorrada = res.json();
          this.aplicaciones= this.aplicaciones.filter(value => aplicacionBorrada.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }
  actualizarAplicacion(aplicacion: any) {
    let parametos = {
      nombre: aplicacion.nombre,
      version2: aplicacion.version2,
      tamanio: aplicacion.tamanio
    };
    this._http.put(this._masterURL.url + "Aplicacion/" + aplicacion.id, parametos)
      .subscribe(
        (res: Response) => {
          aplicacion.formularioCerrado = !aplicacion.formularioCerrado;
          console.log("Respuesta:", res.json());
        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }
}
