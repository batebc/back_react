"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("./../config/mongoose");
exports.curso_controller = {
    getCursos: (req, res) => {
        mongoose_1.Curso.find({}, (err, cursos) => {
            if (err) {
                res.status(500).json({
                    message: 'error',
                    contenido: err
                });
                return;
            }
            res.status(200).json({
                message: 'ok',
                contenido: cursos
            });
        });
    },
    createCurso: (req, res) => {
        mongoose_1.Curso.create(req.body, (err, rpta) => {
            if (err) {
                res.status(500).json({
                    message: 'error',
                    contenido: err
                });
                return;
            }
            res.status(201).json({
                message: 'ok',
                contenido: rpta
            });
        });
    },
    addVideoByCursoId: (req, res) => {
        let { curso_id } = req.params;
        let { vid_titulo, vid_url } = req.body;
        mongoose_1.Curso.findById(curso_id, (err, docCurso) => {
            docCurso.cur_videos.push({
                vid_titulo,
                vid_url
            });
            docCurso.save((err, rpta) => {
                if (err) {
                    res.status(500).json({
                        message: 'error',
                        contenido: err
                    });
                    return;
                }
                res.status(200).json({
                    message: 'ok',
                    contenido: rpta
                });
            });
        });
    }
};
