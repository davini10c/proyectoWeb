import {BadRequestException, Body, Controller, Get, HttpCode, Post, Res, Session} from "@nestjs/common";
import {UsuarioService} from "../Usuario/usuario.service";
import {RolService} from "../rol/rol.service";
import {RolUsuarioService} from "../RolUsuario/rolUsuario.service";
import {RolEntity} from "../rol/rol.entity";
import {UsuarioUpdateDto} from "../Usuario/dto/usuario-update.dto";
import {LoginDto} from "./dto/login-dto";
import {validate, ValidationError} from "class-validator";

@Controller('Login')
export class LoginController {

    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _rolesService: RolService,
        private readonly __rolUsuarioService: RolUsuarioService
    ) {

    }

    @Post('login')
    @HttpCode(200)
    async loginMetodo(
        @Body('cedula') cedula: string,
        @Body('contraseña') contraseña: string,
        @Body('rolUsuario') rolUsuario: number,
        @Res() response,
        @Session() sesion
    ) {

        const identificado = await this._usuarioService
            .login(cedula, contraseña);
        const idUsuario = identificado.idUsuario;
        console.log(idUsuario)

        const loginvalidadoU = new LoginDto();
        loginvalidadoU.cedula = cedula;
        loginvalidadoU.password = contraseña;


        const errores: ValidationError[] = await validate(loginvalidadoU);
        const hayerroresU = errores.length > 0;

        if (hayerroresU) {
            console.error(errores)


            response.redirect('/Login/login?error= errordecredenciales');

        } else {
            const rolUsuario = await this.__rolUsuarioService.verificarRoles(idUsuario);

            console.log("ascacascascascas", rolUsuario)
            if (rolUsuario) {

                sesion.usuario = cedula;
                sesion.rolUsuario = rolUsuario.roles.nombreRol;
                sesion.rolUsuario = rolUsuario.roles.idRol;

                const verificarRoles = rolUsuario.roles.nombreRol;


                switch (verificarRoles) {


                    case 'Administrador':

                        response.redirect('/Rol/menuAdministrador')

                        break;

                    case 'Encargado':


                        response.redirect('/Encargado/menu')
                        break;
                }

            }
        }
    }


    @Get('login')
    async loginVista(
        @Res()
            response
    ) {

        let roles: RolEntity[];
        roles = await
            this._rolesService.buscar();
        response.render('inicioLogin/login', {
                arregloRol: roles
            }
        );
    }


    @Get('logout')
    logout(
        @Res()
            response,
        @Session()
            sesion,
    ) {
        sesion.usuario = undefined;
        sesion.destroy();
        response.redirect('/Login/login');

    }


    @Get('home')
    homeVista(
        @Res()
            response
    ) {
        response.render('inicioLogin/home')
    }


    @Get('acerca')
    acercaHome(
        @Res()
            response
    ) {
        response.render('inicioLogin/acerca')

    }

    @Get('contactanos')
    contactanosHome(
        @Res()
            response
    ) {
        response.render('inicioLogin/contactanos')

    }


    @Get()
    todos() {
        this.__rolUsuarioService.todos().then(res => {
            console.log("csdcsdcsdcsdc", res)

        })
    }


}


