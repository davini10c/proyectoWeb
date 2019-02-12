import {BadRequestException, Body, Controller, Get, Res, Session} from "@nestjs/common";
import {HaciendaService} from "../hacienda/hacienda.service";
import {RegionService} from "../Region/region.service";
import {EncargadoService} from "./encargado.service";
import {ParcelaService} from "../Parcela/parcela.service";
import {SubparcelaService} from "../Subparcela/subparcela.service";
import {HaciendaEntity} from "../hacienda/hacienda.entity";
import {RolEntity} from "../rol/rol.entity";
import {ParcelaEntity} from "../Parcela/parcela.entity";
import {SubparcelaEntity} from "../Subparcela/subparcela.entity";
import {Usuario, UsuarioService} from "../Usuario/usuario.service";
import {UsuarioEntity} from "../Usuario/usuario.entity";

@Controller('Encargado')
export class Encargadocontroller {

    constructor(
        private readonly _encargadoService: EncargadoService,
        private readonly _parcelaService: ParcelaService,
        private readonly _subparcelaService: SubparcelaService,
        private readonly _UsuarioService: UsuarioService,
    ) {
    }


    @Get('menu')
    async menuEncargado(
        @Res()
            response,
        @Session()
            sesion,
    ) {

        sesion.usuario;
        console.log(sesion);


        if (sesion.usuario) {

            //     if (sesion.rolUsuario == 2) {


            const esEncargado = sesion.rolUsuario;

            let usuario: UsuarioEntity[];
            usuario = await
                this._UsuarioService.buscar(sesion.usuario);
            console.log("cascascascascasc", usuario);

            response.render('Encargado/menuEncargado', {
                sessionUsuario: sesion.usuario,
                esEncargado: esEncargado,
                arregloUsuario: usuario
            });


            //  } else {
            //    throw new BadRequestException({mensaje: 'No puedes Ingresar con tu Usuario'})

            //}

        }
        else {
            throw new BadRequestException({mensaje: 'Error Inicia Sesión'})

        }

    }

    @Get('notificaciones')
    notificaciones(
        @Res()
            response,
        @Session()
            sesion
    ) {

        if (sesion.usuario) {

            if (sesion.rolUsuario == 2) {
                response.render('Encargado/notificaciones', {
                    sessionUsuario: sesion.usuario
                });
            }
            else {
                throw new BadRequestException({mensaje: 'No puedes Ingresar con tu Usuario'})

            }


        }
        else {
            throw new BadRequestException({mensaje: 'Error Inicia Sesión'})

        }

    }


    @Get('historial')
    async historial(
        @Res()
            response,
        @Session()
            sesion
    ) {

        let parcela: ParcelaEntity[];
        parcela = await
            this._parcelaService.buscar();

        let subparcela: SubparcelaEntity[];
        subparcela = await
            this._subparcelaService.buscar();

        if (sesion.usuario) {


            if (sesion.rolUsuario == 2) {

                response.render('Encargado/historial', {
                    arregloparcela: parcela,
                    arreglosubparcela: subparcela
                });

            }
            else {
                throw new BadRequestException({mensaje: 'No puedes Ingresar con tu Usuario'})

            }

        }
        else {
            throw new BadRequestException({mensaje: 'Error Inicia Sesión'})

        }


    }


    @Get('monitoreo')
    async monitoreo(
        @Res()
            response,
        @Session()
            sesion
    ) {

        let parcela: ParcelaEntity[];
        parcela = await
            this._parcelaService.buscar();


        let subparcela: SubparcelaEntity[];
        subparcela = await
            this._subparcelaService.buscar();


        if (sesion.usuario) {

            if (sesion.rolUsuario == 2) {
                response.render('Encargado/monitoreo', {
                    arregloparcela: parcela,
                    arreglosubparcela: subparcela
                });
            }
            else {
                throw new BadRequestException({mensaje: 'No puedes Ingresar con tu Usuario'})

            }


        } else {
            throw new BadRequestException({mensaje: 'Error Inicia Sesión'})

        }


    }

}