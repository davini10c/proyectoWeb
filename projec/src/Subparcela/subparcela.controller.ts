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

import {Parcela, ParcelaService} from "../Parcela/parcela.service";
import {Subparcela, SubparcelaService} from "./subparcela.service";
import {SubparcelaCreateDto} from "./dto/subparcela-create.dto";
import {ParcelaEntity} from "../Parcela/parcela.entity";
import {SubparcelaEntity} from "./subparcela.entity";

@Controller('Subparcela')
export class SubparcelaController {

    parcelas: Parcela


    constructor(
        private readonly _parcelaService: ParcelaService,
        private readonly _subparcelaService: SubparcelaService
    ) {
    }


    @Get('subparcela')
    async subparcela(
        @Res() response,
        @Query('accion') accion: string,
        @Query('codigo') codigo: string,
        @Query('busqueda') busqueda: string,
        @Session() sesion
    ) {


        let mensaje; // undefined
        let clase; // undefined

        if (accion && codigo) {
            switch (accion) {
                case 'actualizar':
                    clase = 'info';
                    mensaje = `Registro ${codigo} actualizado`;
                    break;
                case 'borrar':
                    clase = 'danger';
                    mensaje = `Registro ${codigo} eliminado`;
                    break;
                case 'crear':
                    clase = 'success';
                    mensaje = `Registro ${codigo} creado`;
                    break;
            }
        }

        let subparcelas: SubparcelaEntity[];

        if (busqueda) {

            const consulta = {
                where: [
                    {
                        codigo: Like(`%${busqueda}%`)
                    }
                ]
            };
            subparcelas = await this._subparcelaService.buscar(consulta);
        } else {
            subparcelas = await this._subparcelaService.buscar();
        }

        if (sesion.usuario) {
            if (sesion.rolUsuario == 1) {
                response.render('subparcela', {
                    nombre: 'David',
                    arreglo: subparcelas,
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

    @Post('borrar/:idSubparcela')
    async borrar(
        @Param('idSubparcela') idSubparcela: string,
        @Res() response
    ) {
        const subparcelaEncontrada = await this._subparcelaService
            .buscarPorId(+idSubparcela);

        await this._subparcelaService.borrar(Number(idSubparcela));

        const parametrosConsulta = `?accion=borrar&nombre=${subparcelaEncontrada.codigo}`;

        response.redirect('/Subparcela/subparcela' + parametrosConsulta);
    }

    @Get('crear-subparcela')
    async crearSubparcela(
        @Res() response,
        @Session() sesion
    ) {

        let parcelas: ParcelaEntity[];
        parcelas = await this._parcelaService.buscar();

        if (sesion.usuario) {
            if (sesion.rolUsuario == 1) {
                response.render(
                    'crear-subparcela',
                    {
                        arregloParcelas: parcelas
                    }
                )
            }
            else {
                throw new BadRequestException({mensaje: 'No puedes Ingresar con tu Usuario'});

            }


        } else {
            throw new ForbiddenException({mesaje: "Error Inicia Sesión"})

        }


    }

    @Get('actualizar-subparcela/:idSubparcela')
    async actualizarSubparcela(
        @Param('idSubparcela') idSubparcela: string,
        @Res() response
    ) {
        let parcelas: ParcelaEntity[]
        parcelas = await this._parcelaService.buscar()

        const subparcelaAActualizar = await this
            ._subparcelaService
            .buscarPorId(Number(idSubparcela));

        response.render(
            'crear-subparcela', {
                subparcela: subparcelaAActualizar,
                arregloParcelas: parcelas


            }
        )
    }


    @Post('actualizar-subparcela/:idSubparcela')
    async actualizarSubparcelaFormulario(
        @Param('idSubparcela') idSubparcela: string,
        @Res() response,
        @Body() subparcela: Subparcela
    ) {
        subparcela.id = +idSubparcela;

        await this._subparcelaService.actualizar(+idSubparcela, subparcela);

        const parametrosConsulta = `?accion=actualizar&nombre=${subparcela.codigo}`;

        response.redirect('/Subparcela/subparcela' + parametrosConsulta);

    }


    @Post('crear-subparcela')
    async crearSubparcelaFormulario(
        @Body() subparcela: Subparcela,
        @Res() response
    ) {
        const subparcelaValidada = new SubparcelaCreateDto()

        subparcelaValidada.codigo = subparcela.codigo
        subparcelaValidada.medidas = subparcela.medidas
        subparcelaValidada.parcela = +subparcela.parcela

        const errores: ValidationError[] = await validate(subparcelaValidada)

        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores)
            response.redirect('/Subparcela/crear-subparcela?error=Hay errores')
        }
        else {
            const subparcelaFinal = {
                id: subparcela.id,
                codigo: subparcela.codigo,
                medidas: subparcela.medidas,
                parcela: +subparcela.parcela
            }
            await this._subparcelaService.crear(subparcelaFinal);

            const parametrosConsulta = `?accion=crear&nombre=${subparcela.codigo}`;

            response.redirect('/Subparcela/subparcela' + parametrosConsulta)
        }
    }
}

