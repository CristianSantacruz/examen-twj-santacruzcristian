webpackJsonp([1,4],{

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MasterUrlService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MasterUrlService = (function () {
    function MasterUrlService() {
        this._url = "http://localhost:1337/";
    }
    Object.defineProperty(MasterUrlService.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (value) {
            this._url = value;
        },
        enumerable: true,
        configurable: true
    });
    MasterUrlService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], MasterUrlService);
    return MasterUrlService;
}());
//# sourceMappingURL=master-url.service.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_master_url_service__ = __webpack_require__(191);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AplicacionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AplicacionComponent = (function () {
    function AplicacionComponent(_ActivatedRoute, _http, _masterURL) {
        this._ActivatedRoute = _ActivatedRoute;
        this._http = _http;
        this._masterURL = _masterURL;
        this.title = "Bienvenidos a Ingresar Aplicaciones";
        this.aplicaciones = [];
        this.nuevaAplicacion = {};
        this.disabledButtons = {
            NuevaAplicacionFormSubmitButton: false
        };
    }
    AplicacionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._ActivatedRoute
            .params
            .subscribe(function (parametros) {
            _this._parametros = parametros;
            _this._http.get(_this._masterURL.url + 'Aplicacion?idCelular=' + _this._parametros.idCelular)
                .subscribe(function (res) {
                _this.aplicaciones = res.json()
                    .map(function (value) {
                    value.formularioCerrado = true;
                    return value;
                });
            }, function (err) {
                console.log(err);
            });
        });
    };
    AplicacionComponent.prototype.crearAplicacion = function (formulario) {
        var _this = this;
        console.log(formulario);
        this.disabledButtons.NuevaAplicacionFormSubmitButton = true;
        var nuevitaAplicacion = {
            nombre: formulario.value.nombre,
            version: formulario.value.version,
            tamanio: formulario.value.tamanio,
            idCelular: this._parametros.idCelular
        };
        this._http.post(this._masterURL.url + 'Aplicacion', nuevitaAplicacion)
            .subscribe(function (res) {
            _this.aplicaciones.push(res.json());
            _this.nuevaAplicacion = {};
            _this.disabledButtons.NuevaAplicacionFormSubmitButton = false;
        }, function (err) {
            _this.disabledButtons.NuevaAplicacionFormSubmitButton = false;
            console.log(err);
        });
    };
    AplicacionComponent.prototype.borrarAplicacion = function (id) {
        var _this = this;
        this._http.delete(this._masterURL.url + "Aplicacion/" + id)
            .subscribe(function (res) {
            var aplicacionBorrada = res.json();
            _this.aplicaciones = _this.aplicaciones.filter(function (value) { return aplicacionBorrada.id != value.id; });
        }, function (err) {
            console.log(err);
        });
    };
    AplicacionComponent.prototype.actualizarAplicacion = function (aplicacion) {
        var parametos = {
            nombre: aplicacion.nombre,
            version: aplicacion.version,
            tamanio: aplicacion.tamanio,
            idCelular: this._parametros.idCelular
        };
        this._http.put(this._masterURL.url + "Aplicacion/" + aplicacion.id, parametos)
            .subscribe(function (res) {
            aplicacion.formularioCerrado = !aplicacion.formularioCerrado;
            console.log("Respuesta:", res.json());
        }, function (err) {
            console.log("Error:", err);
        });
    };
    AplicacionComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
            selector: 'app-aplicacion',
            template: __webpack_require__(515),
            styles: [__webpack_require__(510)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_master_url_service__["a" /* MasterUrlService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_master_url_service__["a" /* MasterUrlService */]) === 'function' && _c) || Object])
    ], AplicacionComponent);
    return AplicacionComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=aplicacion.component.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_master_url_service__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(177);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CelularComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CelularComponent = (function () {
    function CelularComponent(_http, _masterURL) {
        this._http = _http;
        this._masterURL = _masterURL;
        this.title = "Bienvenidos a Ingresar Celulares";
        this.nuevoCelular = {};
        this.Celulares = [];
        this.disabledButtons = {
            NuevoCelularFormSubmitButton: false
        };
    }
    CelularComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._http.get(this._masterURL.url + "Celular")
            .subscribe(function (res) {
            _this.Celulares = res.json().map(function (value) {
                value.formularioCerrado = true;
                return value;
            });
        }, function (err) {
            console.log(err);
        });
    };
    CelularComponent.prototype.crearCelular = function (formulario) {
        var _this = this;
        this.disabledButtons.NuevoCelularFormSubmitButton = true;
        var nuevoCelular = {
            nombre: formulario.value.nombre,
            sistemaOperativo: formulario.value.sistemaOperativo,
            version: formulario.value.version
        };
        this._http.post(this._masterURL.url + "Celular", nuevoCelular)
            .subscribe(function (res) {
            console.log("Sin Errores");
            console.log(res);
            _this.Celulares.push(res.json());
            _this.nuevoCelular = {};
            _this.disabledButtons.NuevoCelularFormSubmitButton = false;
        }, function (err) {
            _this.disabledButtons.NuevoCelularFormSubmitButton = false;
            console.log("Error: ", err);
        }, function () {
            console.log("Termino la función vamos a las casas");
        });
    };
    CelularComponent.prototype.borrarCelular = function (id) {
        var _this = this;
        this._http.delete(this._masterURL.url + "Celular/" + id)
            .subscribe(function (res) {
            var celularBorrado = res.json();
            _this.Celulares = _this.Celulares.filter(function (value) { return celularBorrado.id != value.id; });
        }, function (err) {
            console.log(err);
        });
    };
    CelularComponent.prototype.actualizarCelular = function (celular) {
        var parametros = {
            nombre: celular.nombre
        };
        this._http.put(this._masterURL.url + "Celular/" + celular.id, parametros)
            .subscribe(function (res) {
            celular.formularioCerrado = !celular.formularioCerrado;
            console.log("Respuesta", res.json());
        }, function (err) {
            console.log("Error" + err);
        });
    };
    CelularComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
            selector: 'app-celular',
            template: __webpack_require__(517),
            styles: [__webpack_require__(512)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_master_url_service__["a" /* MasterUrlService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_master_url_service__["a" /* MasterUrlService */]) === 'function' && _b) || Object])
    ], CelularComponent);
    return CelularComponent;
    var _a, _b;
}());
//# sourceMappingURL=celular.component.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
            selector: 'app-home',
            template: __webpack_require__(518),
            styles: [__webpack_require__(513)]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 335:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 335;


/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(456);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(516),
            styles: [__webpack_require__(511)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home_component__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__celular_celular_component__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__aplicacion_aplicacion_component__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_routes__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_master_url_service__ = __webpack_require__(191);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_6__celular_celular_component__["a" /* CelularComponent */],
                __WEBPACK_IMPORTED_MODULE_7__aplicacion_aplicacion_component__["a" /* AplicacionComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_8__app_routes__["a" /* routing */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__services_master_url_service__["a" /* MasterUrlService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home_component__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__celular_celular_component__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__aplicacion_aplicacion_component__ = __webpack_require__(304);
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });




var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_1__home_home_component__["a" /* HomeComponent */] },
    { path: 'celular', component: __WEBPACK_IMPORTED_MODULE_2__celular_celular_component__["a" /* CelularComponent */] },
    { path: 'celular/:idCelular/aplicacion', component: __WEBPACK_IMPORTED_MODULE_3__aplicacion_aplicacion_component__["a" /* AplicacionComponent */] }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forRoot(routes);
//# sourceMappingURL=app.routes.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 510:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(60)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 511:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(60)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 512:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(60)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 513:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(60)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 515:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <h1>Bienvenidos a Ingresar Aplicaciones</h1>\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <label>Vista Preliminar</label>\n      <pre class=\"animated fadeInUp\">\n        {{nuevoJugador|json}}\n      </pre>\n    </div>\n    <div class=\"col-sm-6\">\n      <form class=\"animated bounceIn\" (ngSubmit)=\"crearAplicacion(NuevaAplicacionForm)\" #NuevaAplicacionForm=\"ngForm\">\n        <div class=\"form-group\">\n          <label>Nombre de la aplicacion</label>\n          <div class=\"animated slideInUp\" [hidden]=\"!nombre.errors\">\n            <span class=\"bg-primary \" *ngIf=\"nombre.errors && (nombre.dirty || nombre.touched)\"> Ingrese el nombre de la Aplicación</span>\n          </div>\n          <input type=\"text\"\n                 class=\"form-control\"\n                 required\n                 placeholder=\"Ingrese el nombre de la aplicación\"\n                 name=\"nombre\"\n                 [(ngModel)]=\"nuevaAplicacion.nombre\"\n                 #nombre=\"ngModel\"\n                 #nombreEle>\n        </div>\n        <div class=\"form-group\">\n          <label>Versión</label>\n          <input type=\"integer\"\n                 class=\"form-control\"\n                 name=\"version\"\n                 required\n                 [(ngModel)]=\"nuevaAplicacion.version\"\n                 #nombre=\"ngModel\"\n                 #nombreEle\n          >\n        </div>\n        <div class=\"form-group\">\n          <label>Tamaño</label>\n          <input type=\"integer\"\n                 class=\"form-control\"\n                 name=\"tamanio\"\n                 required\n                 placeholder=\"Ingrese el tamaño de la aplicación\"\n                 [(ngModel)]=\"nuevaAplicacion.tamanio\"\n                 #nombre=\"ngModel\"\n                 #nombreEle\n          >\n        </div>\n        <button [disabled]=\"disabledButtons.NuevaAplicacionFormSubmitButton ||!NuevaAplicacionForm.valid\" type=\"submit\"\n                class=\"btn btn-block btn-success\">Crear Aplicacion\n        </button>\n      </form>\n    </div>\n    <div class=\"col-sm-6 text-center\">\n      <h1>{{nuevaAplicacion.nombre}}</h1>\n      <h3>{{nuevaAplicacion.version}}</h3>\n      <h3>{{nuevaAplicacion.tamanio}}</h3>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-12 animated flipInX\" *ngFor=\"let aplicacion of aplicaciones\">\n      <div class=\"text-center\">\n        <h3>{{jugador.nombre}}</h3>\n        <p>ID:{{jugador.id}}</p>\n        <p>Fichado hasta:{{jugador.fichadoHasta}}</p>\n        <p>Posición :{{jugador.posicion}}</p>\n      </div>\n      <div class=\"row animated flipInY\" [hidden]=\"!aplicacion.formularioCerrado\">\n        <div class=\"col-sm-5\">\n          <button class=\"btn btn-block btn-info\" (click)=\"aplicacion.formularioCerrado=!aplicacion.formularioCerrado\">Actualizar</button>\n        </div>\n        <div class=\"col-sm-2\"></div>\n        <div class=\"col-sm-5\">\n          <button class=\"btn btn-block btn-danger\" (click)=\"borrarJugador(jugador.id)\">Borrar</button>\n        </div>\n      </div>\n      <div class=\"div\" [hidden]=\"aplicacion.formularioCerrado\">\n        <form action=\"\">\n          <form class=\"animated bounceIn\" (ngSubmit)=\"actualizarAplicacion(aplicacion)\" #NuevaAplicacionForm=\"ngForm\">\n            <div class=\"form-group\">\n              <label>Aplicación</label>\n              <div class=\"animated slideInUp\" [hidden]=\"!nombre.errors\">\n                <span class=\"bg-primary \" *ngIf=\"nombre.errors && (nombre.dirty || nombre.touched)\"> Ingrese el nombre de la aplicación</span>\n              </div>\n              <input required\n                     type=\"text\"\n                     class=\"form-control\"\n                     placeholder=\"Ingrese el nombre de la aplicación\"\n                     name=\"nombre\"\n                     [(ngModel)]=\"aplicacion.nombre\"\n                     #nombre=\"ngModel\"\n                     #nombreEle>\n            </div>\n            <div class=\"form-group\">\n              <label>Versión</label>\n              <input required\n                     type=\"integer\"\n                     class=\"form-control\"\n                     name=\"version\"\n                     [(ngModel)]=\"aplicacion.version\"\n                     #nombre=\"ngModel\"\n                     #nombreEle>\n            </div>\n            <div class=\"form-group\">\n              <label>Tamaño</label>\n              <input required\n                     type=\"integer\"\n                     class=\"form-control\"\n                     placeholder=\"Ingrese el tamaño de la aplicación\"\n                     name=\"tamanio\"\n                     [(ngModel)]=\"aplicacion.tamanio\"\n                     #nombre=\"ngModel\"\n                     #nombreEle>\n            </div>\n            <button [disabled]=\"disabledButtons.NuevaAplicacionFormSubmitButton ||!NuevaAplicacionForm.valid\" type=\"submit\"\n                    class=\"btn btn-block btn-success\">Actualizar\n            </button>\n            <button type=\"button\"\n                    class=\"btn btn-block btn-warning\"\n                    (click)=\"aplicacion.formularioCerrado=!formularioCerrado\"\n            >Cancelar\n            </button>\n          </form>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 516:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-inverse\" >\n  <ul class=\"nav navbar-nav\">\n    <li><a class=\"navbar-brand\" [routerLink]=\"['/home']\">Home</a></li>\n    <li><a class=\"navbar-brand\" [routerLink]=\"['/celular']\">Celular</a></li>\n    <li><a class=\"navbar-brand\" [routerLink]=\"['/celular','1','aplicacion']\">Aplicacion</a></li>\n  </ul>\n</nav>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ 517:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <h1>{{title}}</h1>\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <pre class=\"animated fadeInUp\">\n        {{ nuevoCelular | json}}\n      </pre>\n    </div>\n    <div class=\"col-sm-6\">\n      <form class=\"animated bounceIn\" (ngSubmit)=\"crearCelular(NuevoCelularForm)\" #NuevoCelularForm=\"ngForm\">\n        <div class=\"form-group\">\n          <label>Celular</label>\n          <div class=\"animated slideInUp\" [hidden]=\"!nombre.errors\">\n            <span class=\"bg-primary \" *ngIf=\"nombre.errors && (nombre.dirty || nombre.touched)\"> Ingrese un nombre de Sistema Operativo</span>\n          </div>\n          <input required\n                 minlength=\"5\"\n                 type=\"text\"\n                 class=\"form-control\"\n                 placeholder=\"Ingrese el nombre del celular\"\n                 name=\"nombre\"\n                 [(ngModel)]=\"nuevoCelular.nombre\"\n                 #nombre=\"ngModel\"\n                 #nombreEle>\n        </div>\n        <div class=\"form-group\">\n          <label>Sistema Operativo</label>\n          <input type=\"text\"\n                 required\n                 name=\"sistemaOperativo\"\n                 class=\"form-control\"\n                 [(ngModel)]=\"nuevoCelular.sistemaOperativo\"\n                 #nombre=\"ngModel\"\n                 #nombreEle\n          >\n        </div>\n        <div class=\"form-group\">\n          <label>Versión</label>\n          <input type=\"integer\"\n                 name=\"version\"\n                 required\n                 minlength=\"1\"\n                 placeholder=\"Ingrese la versión del celular\"\n                 class=\"form-control\"\n                 [(ngModel)]=\"nuevoCelular.version\"\n                 #nombre=\"ngModel\"\n                 #nombreEle\n          >\n        </div>\n        <button [disabled]=\"disabledButtons.NuevoCelularFormSubmitButton ||!NuevoCelularForm.valid\" type=\"submit\"\n                class=\"btn btn-block btn-success\">Crear\n        </button>\n      </form>\n    </div>\n    <div class=\"col-sm-6\">\n      <h1>{{nuevoCelular.nombre}}</h1>\n      <h1>{{nuevoCelular.sistemaOperativo}}</h1>\n      <h1>{{nuevoCelular.version}}</h1>\n    </div>\n\n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-12 animated flipInX\" *ngFor=\"let celular of Celulares\">\n      <div class=\"text-center\">\n        <h3>{{celular.nombre}}</h3>\n        <p>ID: {{celular.id}}</p>\n        <p>Sistema Operativo: {{celular.sistemaOperativo}}</p>\n        <p>Versión: {{celular.version}}</p>\n      </div>\n      <div class=\"row animated flipInY\" [hidden]=\"!celular.formularioCerrado\">\n        <div class=\"col-sm-5\">\n          <button class=\"btn btn-block btn-info\" (click)=\"celular.formularioCerrado=!celular.formularioCerrado\">\n            Actualizar\n          </button>\n        </div>\n        <div class=\"col-sm-2\"></div>\n        <div class=\"col-sm-5\">\n          <button class=\"btn btn-block btn-danger\" (click)=\"borrarCelular(celular.id)\">Borrar</button>\n        </div>\n        <div class=\"col-sm-12\">\n          <div class=\"form-group text-uppercase\">\n            <a [routerLink]=\"[celular.id,'aplicacion']\">Ir a Aplicaciones</a>\n          </div>\n        </div>\n      </div>\n      <div class=\"div\" [hidden]=\"celular.formularioCerrado\">\n        <form action=\"\">\n          <form class=\"animated bounceIn\" (ngSubmit)=\"actualizarCelular(celular)\" #NuevoCelularForm=\"ngForm\">\n            <div class=\"form-group\">\n              <label>Celular</label>\n              <div class=\"animated slideInUp\" [hidden]=\"!nombre.errors\">\n                <span class=\"bg-primary \" *ngIf=\"nombre.errors && (nombre.dirty || nombre.touched)\"> Ingrese el nombre del celular</span>\n              </div>\n              <input required\n                     minlength=\"5\"\n                     type=\"text\"\n                     class=\"form-control\"\n                     placeholder=\"Ingrese el nombre del celular\"\n                     name=\"nombre\"\n                     [(ngModel)]=\"celular.nombre\"\n                     #nombre=\"ngModel\"\n                     #nombreEle>\n            </div>\n            <div class=\"form-group\">\n              <label>Sistema Operativo</label>\n              <input required\n                     type=\"text\"\n                     class=\"form-control\"\n                     name=\"sistemaOperativo\"\n                     [(ngModel)]=\"celular.sistemaOperativo\"\n                     #nombre=\"ngModel\"\n                     #nombreEle>\n            </div>\n            <div class=\"form-group\">\n              <label>Versión</label>\n              <input required\n                     minlength=\"1\"\n                     type=\"integer\"\n                     class=\"form-control\"\n                     placeholder=\"Ingrese la versión del celular\"\n                     name=\"version\"\n                     [(ngModel)]=\"celular.version\"\n                     #nombre=\"ngModel\"\n                     #nombreEle>\n            </div>\n            <button [disabled]=\"disabledButtons.NuevoCelularFormSubmitButton ||!NuevoCelularForm.valid\" type=\"submit\"\n                    class=\"btn btn-block btn-success\">Actualizar\n            </button>\n            <button type=\"button\"\n                    class=\"btn btn-block btn-warning\"\n                    (click)=\"celular.formularioCerrado=!formularioCerrado\" [routerLink]=\"['/celular']\">Cancelar\n            </button>\n          </form>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n\n"

/***/ }),

/***/ 518:
/***/ (function(module, exports) {

module.exports = "<h1 class=\"text-center text-info\">Bienvenidos</h1>\n<div row>\n  <div class=\"col-sm-2\"></div>\n  <div class=\"jumbotron col-sm-8 text-center\" style=\"background:#D8F6CE\">\n    <h1>Celulares</h1>\n    <p>Registrar Celulares</p>\n    <p>\n      <a class=\"btn btn-primary btn-lg\" [routerLink]=\"['/celular']\" role=\"button\">Crear Celular</a>\n    </p>\n  </div>\n  <div class=\"col-sm-2\"></div>\n</div>\n"

/***/ }),

/***/ 536:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(336);


/***/ })

},[536]);
//# sourceMappingURL=main.bundle.js.map