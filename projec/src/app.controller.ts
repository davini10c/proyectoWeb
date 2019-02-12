import {BadRequestException, Body, Controller, Get, HttpCode, Post, Res, Session} from '@nestjs/common';
import {AppService} from './app.service';
import {UsuarioService} from "./Usuario/usuario.service";
import {ok} from "assert";
import {RolService} from "./rol/rol.service";
import {RolEntity} from "./rol/rol.entity";
import {RolUsuarioService} from "./RolUsuario/rolUsuario.service";

@Controller()
export class AppController {





}


