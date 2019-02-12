import {Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {Region, RegionService} from "./region.service";
import {Like} from "typeorm";
import {RegionEntity} from "./region.entity";
import {RegionCreateDto} from "./dto/region-create-dto";
import {validate, ValidationError} from "class-validator";

@Controller('Region')
export class RegionController {

    constructor(
        private readonly _regionService: RegionService,
    ) {

    }

    @Get('region')
    async region(
        @Res() response,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string,
        @Query('busqueda') busqueda: string,
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

        let regiones: RegionEntity[];
        if (busqueda) {

            const consulta = {
                where: [
                    {
                        nombre: Like(`%${busqueda}%`)
                    },
                    {
                        descripcion: Like(`%${busqueda}%`)
                    },

                ]
            };
            regiones = await this._regionService.buscar(consulta);
        } else {
            regiones = await this._regionService.buscar();
        }

        response.render('region', {
            nombre: 'David',
            arreglo: regiones,
            mensaje: mensaje,
            accion: clase
        });
    }

    @Post('borrar/:idRegion')
    async borrar(
        @Param('idRegion') idRegion: string,
        @Res() response
    ) {
        const regionEncontrada = await this._regionService
            .buscarPorId(+idRegion);

        await this._regionService.borrar(Number(idRegion));

        const parametrosConsulta = `?accion=borrar&nombre=${regionEncontrada.nombre}`;

        response.redirect('/Region/region' + parametrosConsulta);
    }

    @Get('crear-region')
    crearRegion(
        @Res() response
    ) {
        response.render(
            'crear-region'
        )
    }

    @Get('actualizar-region/:idRegion')
    async actualizarRegion(
        @Param('idRegion') idRegion: string,
        @Res() response
    ) {
        const regionAActualizar = await this
            ._regionService
            .buscarPorId(Number(idRegion));

        response.render(
            'crear-region', {
                region: regionAActualizar
            }
        )
    }


    @Post('actualizar-region/:idRegion')
    async actualizarRegionFormulario(
        @Param('idRegion') idRegion: string,
        @Res() response,
        @Body() region: Region
    ) {
        region.id = +idRegion;

        await this._regionService.actualizar(+idRegion, region);

        const parametrosConsulta = `?accion=actualizar&nombre=${region.nombre}`;

        response.redirect('/Region/region' + parametrosConsulta);

    }


    @Post('crear-region')
    async crearRegionFormulario(
        @Body() region: Region,
        @Res() response
    ) {
        const regionValidada = new RegionCreateDto()

        regionValidada.nombre = region.nombre
        regionValidada.descripcion = region.descripcion

        const errores: ValidationError[] = await validate(regionValidada)

        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores)
            response.redirect('/Region/crear-region?error=Hay errores')
        }
        else {
            await this._regionService.crear(region);

            const parametrosConsulta = `?accion=crear&nombre=${region.nombre}`;

            response.redirect('/Region/region' + parametrosConsulta)
        }
    }
}

