import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';

import {FindManyOptions} from "../../node_modules/typeorm/find-options/FindManyOptions";
import {HaciendaEntity} from "./hacienda.entity";

@Injectable()
export class HaciendaService {

    // Inyectar Dependencias
    constructor(
        @InjectRepository(HaciendaEntity)
        private readonly _haciendaRepository: Repository<HaciendaEntity>,
    ) {
    }

    buscar(parametros?: FindManyOptions<HaciendaEntity>)
        : Promise<HaciendaEntity[]> {
        return this._haciendaRepository.find(parametros);
    }

    async crear(nuevaHacienda: Hacienda): Promise<HaciendaEntity> {

        const haciendaEntity = this._haciendaRepository
            .create(nuevaHacienda);
       console.log(nuevaHacienda)
        const haciendaCreada = await this._haciendaRepository
            .save(haciendaEntity);


        return haciendaCreada;
    }

    actualizar(idHacienda: number,
               nuevaHacienda: Hacienda): Promise<HaciendaEntity> {

        nuevaHacienda.id = idHacienda;

        const haciendaEntity = this._haciendaRepository.create(nuevaHacienda);

        return this._haciendaRepository.save(haciendaEntity);
    }

    borrar(idHacienda: number): Promise<HaciendaEntity> {

        // CREA UNA INSTANCIA DE LA ENTIDAD
        const haciendaEntityAEliminar = this._haciendaRepository
            .create({
                id: idHacienda
            });


        return this._haciendaRepository.remove(haciendaEntityAEliminar)
    }

    buscarPorId(idHacienda: number): Promise<HaciendaEntity> {
        return this._haciendaRepository.findOne(idHacienda);
    }




}

export interface Hacienda {
    id: number;
    nombre: string;
    direccion: string;
    telefono:string;
    region:any
}