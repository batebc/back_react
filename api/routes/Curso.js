"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Curso_1 = require("./../controllers/Curso");
exports.curso_router = express_1.Router();
exports.curso_router.get('/cursos', Curso_1.curso_controller.getCursos);
exports.curso_router.post('/cursos', Curso_1.curso_controller.createCurso);
exports.curso_router.post('/cursos/:curso_id/addvideo', Curso_1.curso_controller.addVideoByCursoId);
