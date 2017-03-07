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

  title: string = "Bienvenidos a Ingresar Aplicaciones";
  private _parametros;
  aplicaciones = [];
  nuevaAplicacion: any = {};
  disabledButtons = {
  NuevaAplicacionFormSubmitButton: false
  };

  constructor(private _ActivatedRoute: ActivatedRoute,
              private _http: Http,
              private _masterURL: MasterUrlService) { }

  ngOnInit() {
    this._ActivatedRoute
      .params
      .subscribe(parametros => {
        this._parametros = parametros;
        this._http.get(this._masterURL.url + 'Aplicacion?idCelular=' + this._parametros.idCelular)
          .subscribe(
            (res: Response) => {
              this.aplicaciones = res.json()
                .map((value) => {
                  value.formularioCerrado = true;
                  return value;
                });
            },
            (err) => {
              console.log(err)
            }
          )
      });
  }
  crearAplicacion(formulario: NgForm) {
    console.log(formulario);
    this.disabledButtons.NuevaAplicacionFormSubmitButton = true;
    let nuevitaAplicacion = {
      nombre: formulario.value.nombre,
      version: formulario.value.version,
      tamanio: formulario.value.tamanio,
      idCelular: this._parametros.idCelular
    };
    this._http.post(this._masterURL.url + 'Aplicacion', nuevitaAplicacion)
      .subscribe(
        (res: Response) => {
          this.aplicaciones.push(res.json());
          this.nuevaAplicacion = {};
          this.disabledButtons.NuevaAplicacionFormSubmitButton = false;
        },
        (err) => {
          this.disabledButtons.NuevaAplicacionFormSubmitButton = false;
          console.log(err)
        }
      );
  }
  borrarAplicacion(id: number) {
    this._http.delete(this._masterURL.url + "Aplicacion/" + id)
      .subscribe(
        (res) => {
          let aplicacionBorrada = res.json();
          this.aplicaciones = this.aplicaciones.filter(value => aplicacionBorrada.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  actualizarAplicacion(aplicacion: any) {
    let parametos = {
      nombre: aplicacion.nombre,
      version: aplicacion.version,
      tamanio: aplicacion.tamanio,
      idCelular: this._parametros.idCelular
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
