import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';

import {FindManyOptions} from "../../node_modules/typeorm/find-options/FindManyOptions";
import {SubparcelaEntity} from "./subparcela.entity"

@Injectable()
export class SubparcelaService {

    // Inyectar Dependencias
    constructor(
        @InjectRepository(SubparcelaEntity)
        private readonly subparcelaRepository: Repository<SubparcelaEntity>,
    ) {
    }

    buscar(parametros?: FindManyOptions<SubparcelaEntity>)
        : Promise<SubparcelaEntity[]> {
        return this.subparcelaRepository.find(parametros);
    }

    async crear(nuevaSubparcela: Subparcela): Promise<SubparcelaEntity> {

        const subparcelaEntity = this.subparcelaRepository
            .create(nuevaSubparcela);
        console.log(nuevaSubparcela)
        const subparcelaCreada = await this.subparcelaRepository
            .save(subparcelaEntity);


        return subparcelaCreada;
    }

    actualizar(idSubparcela: number,
               nuevaSubparcela: Subparcela): Promise<SubparcelaEntity> {

        nuevaSubparcela.id = idSubparcela;

        const subparcelaEntity = this.subparcelaRepository.create(nuevaSubparcela);

        return this.subparcelaRepository.save(subparcelaEntity);
    }

    borrar(idSubparcela: number): Promise<SubparcelaEntity> {

        // CREA UNA INSTANCIA DE LA ENTIDAD
        const subparcelaEntityAEliminar = this.subparcelaRepository
            .create({
                id: idSubparcela
            });


        return this.subparcelaRepository.remove(subparcelaEntityAEliminar)
    }

    buscarPorId(idSubparcela: number): Promise<SubparcelaEntity> {
        return this.subparcelaRepository.findOne(idSubparcela);
    }




}

export interface Subparcela {
    id: number;
    codigo: string;
    medidas: string;
     parcela:any;
}