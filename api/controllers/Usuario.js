"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("./../config/mongoose");
exports.usuario_controller = {
    createUser: (req, res) => {
        // // var str = "Hello World!";
        // // var enc = window.btoa(str);
        // // var dec = window.atob(enc);
        // // console.log(enc);
        // // console.log(dec);
        // let data = 'SGVsbG8gV29ybGQh=';
        // let buff = new Buffer(data, 'base64');
        // let text = buff.toString('ascii');
        // console.log(text);
        // build() => Construye una instancia de la clase Usuario
        // sin guardarlo en la base de datos
        let objUsuario = new mongoose_1.Usuario(req.body.usuario);
        objUsuario.setSaltYHash(req.body.usuario.usu_pass);
        // save() => promesa que guarda el registro en la DB
        objUsuario.save((error) => {
            if (error) {
                let content = {
                    message: "Error al crear el usuario",
                    contenido: error
                };
                res.status(501).json(content);
            }
            else {
                let token = objUsuario.generarJWT();
                let content = {
                    message: 'Usuario creado correctamente',
                    contenido: {
                        objUsuario,
                        token
                    }
                };
                res.status(201).json(content);
            }
        });
    }
};
