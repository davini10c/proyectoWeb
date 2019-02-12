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
import {Hacienda, HaciendaService} from "./hacienda.service";
import {Like} from "typeorm";
import {HaciendaEntity} from "./hacienda.entity";
import {HaciendaCreateDto} from "./dto/hacienda-create-dto";
import {validate, ValidationError} from "class-validator";
import {Region, RegionService} from "../Region/region.service";
import {RegionEntity} from "../Region/region.entity";

@Controller('Hacienda')
export class HaciendaController {

    regiones: Region

    constructor(
        private readonly _haciendaService: HaciendaService,
        private readonly _regionService: RegionService
    ) {
    }


    @Get('hacienda')
    async hacienda(
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

        let haciendas: HaciendaEntity[];
        if (busqueda) {

            const consulta = {
                where: [
                    {
                        nombre: Like(`%${busqueda}%`)
                    },
                    {
                        direccion: Like(`%${busqueda}%`)
                    }
                ]
            };
            haciendas = await this._haciendaService.buscar(consulta);
        } else {
            haciendas = await this._haciendaService.buscar();
        }

        if (sesion.usuario) {
            console.log(sesion);

            if (sesion.rolUsuario == 1) {
                response.render('hacienda', {
                    nombre: 'David',
                    arreglo: haciendas,
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

    @Post('borrar/:idHacienda')
    async borrar(
        @Param('idHacienda') idHacienda: string,
        @Res() response
    ) {
        const haciendaEncontrada = await this._haciendaService
            .buscarPorId(+idHacienda);

        await this._haciendaService.borrar(Number(idHacienda));

        const parametrosConsulta = `?accion=borrar&nombre=${haciendaEncontrada.nombre}`;

        response.redirect('/Hacienda/hacienda' + parametrosConsulta);
    }

    @Get('crear-hacienda')
    async crearHacienda(
        @Res() response,
        @Session() sesion
    ) {
        let regiones: RegionEntity[]
        regiones = await this._regionService.buscar();
        if (sesion.usuario) {

            if (sesion.rolUsuario == 1) {
                response.render(
                    'crear-hacienda',
                    {
                        arregloRegiones: regiones
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

    @Get('actualizar-hacienda/:idHacienda')
    async actualizarHacienda(
        @Param('idHacienda') idHacienda: string,
        @Res() response
    ) {
        let regiones: RegionEntity[]
        regiones = await this._regionService.buscar()
        const haciendaAActualizar = await this
            ._haciendaService
            .buscarPorId(Number(idHacienda));

        response.render(
            'crear-hacienda', {
                hacienda: haciendaAActualizar,
                arregloRegiones: regiones

            }
        )
    }


    @Post('actualizar-hacienda/:idHacienda')
    async actualizarHaciendaFormulario(
        @Param('idHacienda') idHacienda: string,
        @Res() response,
        @Body() hacienda: Hacienda
    ) {
        hacienda.id = +idHacienda;

        await this._haciendaService.actualizar(+idHacienda, hacienda);

        const parametrosConsulta = `?accion=actualizar&nombre=${hacienda.nombre}`;

        response.redirect('/Hacienda/hacienda' + parametrosConsulta);

    }


    @Post('crear-hacienda')
    async crearHaciendaFormulario(
        @Body() hacienda: Hacienda,
        @Res() response
    ) {
        console.log(hacienda)
        const haciendaValidada = new HaciendaCreateDto()

        haciendaValidada.nombre = hacienda.nombre
        haciendaValidada.direccion = hacienda.direccion
        haciendaValidada.telefono = hacienda.telefono
        haciendaValidada.region = +hacienda.region

        console.log(haciendaValidada)
        const errores: ValidationError[] = await validate(haciendaValidada)

        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores)
            response.redirect('/Hacienda/crear-hacienda?error=Hay errores')
        }
        else {
            const haciendaFinal = {
                id: hacienda.id,
                nombre: hacienda.nombre,
                direccion: hacienda.direccion,
                telefono: hacienda.telefono,
                region: +hacienda.region
            }
            await this._haciendaService.crear(haciendaFinal);

            const parametrosConsulta = `?accion=crear&nombre=${hacienda.nombre}`;

            response.redirect('/Hacienda/hacienda' + parametrosConsulta)
        }
    }
}

