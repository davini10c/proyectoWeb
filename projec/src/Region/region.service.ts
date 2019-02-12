import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';

import {FindManyOptions} from "../../node_modules/typeorm/find-options/FindManyOptions";
import {RegionEntity} from "./region.entity";

@Injectable()
export class RegionService {

    // Inyectar Dependencias
    constructor(
        @InjectRepository(RegionEntity)
        private readonly _regionRepository: Repository<RegionEntity>,
    ) {
    }

    buscar(parametros?: FindManyOptions<RegionEntity>)
        : Promise<RegionEntity[]> {
        return this._regionRepository.find(parametros);
    }

    async crear(nuevaRegion: Region): Promise<RegionEntity> {

        // Instanciar una entidad -> .create()
        const regionEntity = this._regionRepository
            .create(nuevaRegion)
console.log(regionEntity)
        // Guardar una entidad en la BDD -> .save()
        const regionCreada = await this._regionRepository
            .save(regionEntity);
console.log(regionCreada)

        return regionCreada;
    }

    actualizar(idRegion: number,
               nuevaRegion: Region): Promise<RegionEntity> {

        nuevaRegion.id = idRegion;

        const regionEntity = this._regionRepository.create(nuevaRegion);

        return this._regionRepository.save(regionEntity);
    }

    borrar(idRegion: number): Promise<RegionEntity> {

        // CREA UNA INSTANCIA DE LA ENTIDAD
        const regionEntityAEliminar = this._regionRepository
            .create({
                id: idRegion
            });


        return this._regionRepository.remove(regionEntityAEliminar)
    }

    buscarPorId(idRegion: number): Promise<RegionEntity> {
        return this._regionRepository.findOne(idRegion);
    }




}

export interface Region {
    id: number;
    nombre: string;
    descripcion: string;


}