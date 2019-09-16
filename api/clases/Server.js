"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Curso_1 = require("./../routes/Curso");
const Usuario_1 = require("./../routes/Usuario");
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = __importStar(require("./../docs/swagger_doc.json"));
const openApiDocumentationTemplate = __importStar(require("./../docs/swagger.json"));
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
class Server {
    constructor() {
        this.app = express_1.default();
        this.puerto = process.env.PORT || 3000;
        this.configurarBodyParser();
        this.habilitarCORS();
        this.configurarRutas();
    }
    habilitarCORS() {
        this.app.use((req, res, next) => {
            // configurar CORS
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-type, Authorization");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            next();
        });
    }
    configurarRutas() {
        this.app.get('/', (req, res) => {
            res.status(200).send("Servidor OK!");
        });
        this.app.use(Curso_1.curso_router);
        this.app.use(Usuario_1.usuario_router);
        this.app.use('/rutas/plantilla', swaggerUi.serve, swaggerUi.setup(openApiDocumentationTemplate));
        this.app.use('/rutass', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
    }
    start() {
        this.app.listen(this.puerto, () => {
            console.log("Servidor Iniciado correctamente en el puerto " + this.puerto);
            // sync => sirve para crear las tablas en la BD a partir de los
            // modelos.
            mongoose.connect('mongodb://localhost/codigo', { useNewUrlParser: true }).then(() => {
                console.log("Conectando  a la base de datos");
            });
        });
    }
    configurarBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }
}
exports.Server = Server;
