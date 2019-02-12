import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';

import {FindManyOptions} from "../../node_modules/typeorm/find-options/FindManyOptions";
import {ParcelaEntity} from "./parcela.entity";

@Injectable()
export class ParcelaService {

    // Inyectar Dependencias
    constructor(
        @InjectRepository(ParcelaEntity)
        private readonly _parcelaRepository: Repository<ParcelaEntity>,
    ) {
    }

    buscar(parametros?: FindManyOptions<ParcelaEntity>)
        : Promise<ParcelaEntity[]> {
        return this._parcelaRepository.find(parametros);
    }

    async crear(nuevaParcela: Parcela): Promise<ParcelaEntity> {

        const parcelaEntity = this._parcelaRepository
            .create(nuevaParcela);
        console.log(nuevaParcela)
        const parcelaCreada = await this._parcelaRepository
            .save(parcelaEntity);


        return parcelaCreada;
    }

    actualizar(idParcela: number,
               nuevaParcela: Parcela): Promise<ParcelaEntity> {

        nuevaParcela.id = idParcela;

        const parcelaEntity = this._parcelaRepository.create(nuevaParcela);

        return this._parcelaRepository.save(parcelaEntity);
    }

    borrar(idParcela: number): Promise<ParcelaEntity> {

        // CREA UNA INSTANCIA DE LA ENTIDAD
        const parcelaEntityAEliminar = this._parcelaRepository
            .create({
                id: idParcela
            });


        return this._parcelaRepository.remove(parcelaEntityAEliminar)
    }

    buscarPorId(idParcela: number): Promise<ParcelaEntity> {
        return this._parcelaRepository.findOne(idParcela);
    }




}

export interface Parcela {
    id: number;
    medidas: string;
    codigo: string;
    usuario:any;
    hacienda:any
}