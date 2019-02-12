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
import {Region, RegionService} from "../Region/region.service";
import {RegionEntity} from "../Region/region.entity";
import {Subparcela, SubparcelaService} from "../Subparcela/subparcela.service";
import {Sensor, SensorService} from "./sensor.service";
import {SensorEntity} from "./sensor.entity";
import {SubparcelaEntity} from "../Subparcela/subparcela.entity";
import {SensorCreateDto} from "./sensor-create.dto.ts/sensor-create.dto";

@Controller('Sensor')
export class SensorController {

    subparcelas: Subparcela

    constructor(
        private readonly _subparcelaService: SubparcelaService,
        private readonly _sensorService: SensorService
    ) {
    }


    @Get('sensor')
    async sensor(
        @Res() response,
        @Query('accion') accion: string,
        @Query('nombre') codigo: string,
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

        let sensores: SensorEntity[];
        if (busqueda) {

            const consulta = {
                where: [
                    {
                        codigoSensor: Like(`%${busqueda}%`)
                    }
                ]
            };
            sensores = await this._sensorService.buscar(consulta);
        } else {
            sensores = await this._sensorService.buscar();
        }


        if (sesion.usuario) {
            if (sesion.rolUsuario == 1) {
                response.render('sensor', {
                    nombre: 'David',
                    arreglo: sensores,
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

    @Post('borrar/:idSensor')
    async borrar(
        @Param('idSensor') idSensor: string,
        @Res() response
    ) {
        const sensorEncontrado = await this._sensorService
            .buscarPorId(+idSensor);

        await this._sensorService.borrar(Number(idSensor));

        const parametrosConsulta = `?accion=borrar&nombre=${sensorEncontrado.codigoSensor}`;

        response.redirect('/Sensor/sensor' + parametrosConsulta);
    }

    @Get('crear-sensores')
    async crearSensor(
        @Res() response,
        @Session() sesion
    ) {
        let subparcelas: SubparcelaEntity[]
        subparcelas = await this._subparcelaService.buscar()

        if (sesion.usuario) {
            if (sesion.rolUsuario == 1) {
                response.render(
                    'crear-sensores',
                    {
                        arregloSubparcelas: subparcelas
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

    @Get('actualizar-sensores/:idSensor')
    async actualizarSensor(
        @Param('idSensor') idSensor: string,
        @Res() response
    ) {
        let subparcelas: SubparcelaEntity[]
        subparcelas = await this._subparcelaService.buscar()

        const sensorAActualizar = await this
            ._sensorService
            .buscarPorId(Number(idSensor));

        response.render(
            'crear-sensores', {
                sensor: sensorAActualizar,
                arregloSubparcelas: subparcelas

            }
        )
    }


    @Post('actualizar-sensores/:idSensor')
    async actualizarSensorFormulario(
        @Param('idSensor') idSensor: string,
        @Res() response,
        @Body() sensor: Sensor
    ) {
        sensor.id = +idSensor;

        await this._sensorService.actualizar(+idSensor, sensor);

        const parametrosConsulta = `?accion=actualizar&nombre=${sensor.codigoSensor}`;

        response.redirect('/Sensor/sensor' + parametrosConsulta);

    }


    @Post('crear-sensores')
    async crearSensorFormulario(
        @Body() sensor: Sensor,
        @Res() response
    ) {
        const sensorValidado = new SensorCreateDto()

        sensorValidado.codigoSensor = sensor.codigoSensor
        sensorValidado.subparcela = sensor.subparcela

        console.log(sensorValidado)
        const errores: ValidationError[] = await validate(sensorValidado)

        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores)
            response.redirect('/Sensor/crear-sensores?error=Hay errores')
        }
        else {
            const sensorFinal = {
                id: sensor.id,
                codigoSensor: sensor.codigoSensor,
                subparcela: sensor.subparcela

            }
            await this._sensorService.crear(sensorFinal);

            const parametrosConsulta = `?accion=crear&nombre=${sensor.codigoSensor}`;

            response.redirect('/Sensor/sensor' + parametrosConsulta)
        }
    }
}

