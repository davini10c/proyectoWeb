import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    Get,
    Param,
    Post,
    Query,
    Res,
    Session
} from "@nestjs/common";

import {Like} from "typeorm";

import {validate, ValidationError} from "class-validator";
import {HaciendaEntity} from "../hacienda/hacienda.entity";
import {Hacienda, HaciendaService} from "../hacienda/hacienda.service";
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {Usuario, UsuarioService} from "../Usuario/usuario.service";
import {Parcela, ParcelaService} from "./parcela.service";
import {ParcelaEntity} from "./parcela.entity";
import {ParcelaCreateDto} from "./dto/parcela-create-dto";

@Controller('Parcela')
export class ParcelaController {

    haciendas: Hacienda;
    usuarios: Usuario;

    constructor(
        private readonly _parcelaService: ParcelaService,
        private readonly _haciendaService: HaciendaService,
        private readonly _usuarioService: UsuarioService
    ) {
    }


    @Get('parcela')
    async parcela(
        @Res() response,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string,
        @Query('busqueda') busqueda: string,
        @Session() sesion
    ) {


        let mensaje; // undefined
        let clase; // undefined

        if (accion && nombre) {
            switch (accion) {
                case 'actualizar':
                    clase = 'info';
                    mensaje = `Registro ${nombre} actualizado`;
                    break;
                case 'borrar':
                    clase = 'danger';
                    mensaje = `Registro ${nombre} eliminado`;
                    break;
                case 'crear':
                    clase = 'success';
                    mensaje = `Registro ${nombre} creado`;
                    break;
            }
        }

        let parcelas: ParcelaEntity[];

        if (busqueda) {

            const consulta = {
                where: [
                    {
                        codigo: Like(`%${busqueda}%`)
                    }
                ]
            };
            parcelas = await this._parcelaService.buscar(consulta);
        } else {
            parcelas = await this._parcelaService.buscar();
        }

        if (sesion.usuario) {
            if (sesion.rolUsuario == 1) {
                response.render('parcela', {
                    nombre: 'David',
                    arreglo: parcelas,
                    mensaje: mensaje,
                    accion: clase
                });
            }
            else {
                throw new BadRequestException({mensaje: 'No puedes Ingresar con tu Usuario'});

            }

        }
        else {
            throw new ForbiddenException({mesaje: "Error Inicia Sesión"})
        }
    }

    @Post('borrar/:idParcela')
    async borrar(
        @Param('idParcela') idParcela: string,
        @Res() response
    ) {
        const parcelaEncontrada = await this._parcelaService
            .buscarPorId(+idParcela);

        await this._parcelaService.borrar(Number(idParcela));

        const parametrosConsulta = `?accion=borrar&nombre=${parcelaEncontrada.codigo}`;

        response.redirect('/Parcela/parcela' + parametrosConsulta);
    }

    @Get('crear-parcela')
    async crearParcela(
        @Res() response,
        @Session() sesion
    ) {

        let haciendas: HaciendaEntity[];
        let usuarios: UsuarioEntity[];
        haciendas = await this._haciendaService.buscar();
        usuarios = await this._usuarioService.buscar();

        if (sesion.usuario) {
            if (sesion.rolUsuario == 1) {
                response.render(
                    'crear-parcela',
                    {
                        arregloHaciendas: haciendas,
                        arregloUsuarios: usuarios
                    }
                )

            }
            else {
                throw new BadRequestException({mensaje: 'No puedes Ingresar con tu Usuario'});

            }


        }
        else {
            throw new ForbiddenException({mesaje: "Error Inicia Sesión"})

        }


    }

    @Get('actualizar-parcela/:idParcela')
    async actualizarParcela(
        @Param('idParcela') idParcela: string,
        @Res() response
    ) {
        let haciendas: HaciendaEntity[]
        let usuarios: UsuarioEntity[]
        haciendas = await this._haciendaService.buscar()
        usuarios = await this._usuarioService.buscar()
        const parcelaAActualizar = await this
            ._parcelaService
            .buscarPorId(Number(idParcela));

        response.render(
            'crear-parcela', {
                parcela: parcelaAActualizar,
                arregloHaciendas: haciendas,
                arregloUsuarios: usuarios

            }
        )
    }


    @Post('actualizar-parcela/:idParcela')
    async actualizarParcelaFormulario(
        @Param('idParcela') idParcela: string,
        @Res() response,
        @Body() parcela: Parcela
    ) {
        parcela.id = +idParcela;

        await this._parcelaService.actualizar(+idParcela, parcela);

        const parametrosConsulta = `?accion=actualizar&nombre=${parcela.codigo}`;

        response.redirect('/Parcela/Parcela' + parametrosConsulta);

    }


    @Post('crear-Parcela')
    async crearParcelaFormulario(
        @Body() parcela: Parcela,
        @Res() response
    ) {
        const parcelaValidada = new ParcelaCreateDto()

        parcelaValidada.codigo = parcela.codigo
        parcelaValidada.medidas = parcela.medidas
        parcelaValidada.hacienda = parcela.hacienda
        parcelaValidada.usuario = parcela.usuario
        const errores: ValidationError[] = await validate(parcelaValidada)

        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores)
            response.redirect('/Parcela/crear-parcela?error=Hay errores')
        }
        else {
            const parcelaFinal = {
                id: parcela.id,
                codigo: parcela.codigo,
                medidas: parcela.medidas,
                hacienda: parcela.hacienda,
                usuario: parcela.usuario
            }
            await this._parcelaService.crear(parcelaFinal);

            const parametrosConsulta = `?accion=crear&nombre=${parcela.codigo}`;

            response.redirect('/Parcela/parcela' + parametrosConsulta)
        }
    }


    @Get('parcelasSuboparcelas')
    parcelaSubparcela(
        @Res() response,
        @Session() sesion
    ) {

        if (sesion.usuario) {
            response.render('parcelas-subparcelas', {});

        }
        else {
            throw new ForbiddenException({mesaje: "No puedes ingresar"})

        }

    }
}

