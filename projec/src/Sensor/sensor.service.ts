import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';

import {FindManyOptions} from "../../node_modules/typeorm/find-options/FindManyOptions";
import{SensorEntity} from "./sensor.entity";

@Injectable()
export class SensorService {

    // Inyectar Dependencias
    constructor(
        @InjectRepository(SensorEntity)
        private readonly _sensorRepository: Repository<SensorEntity>,
    ) {
    }

    buscar(parametros?: FindManyOptions<SensorEntity>)
        : Promise<SensorEntity[]> {
        return this._sensorRepository.find(parametros);
    }

    async crear(nuevoSensor: Sensor): Promise<SensorEntity> {

        // Instanciar una entidad -> .create()
        const sensorEntity = this._sensorRepository
            .create(nuevoSensor)
        console.log(sensorEntity)
        // Guardar una entidad en la BDD -> .save()
        const sensorCreado = await this._sensorRepository
            .save(sensorEntity);
        console.log(sensorCreado)

        return sensorCreado;
    }

    actualizar(idSensor: number,
               nuevoSensor: Sensor): Promise<SensorEntity> {

        nuevoSensor.id = idSensor;

        const sensorEntity = this._sensorRepository.create(nuevoSensor);

        return this._sensorRepository.save(sensorEntity);
    }

    borrar(idSensor: number): Promise<SensorEntity> {

        // CREA UNA INSTANCIA DE LA ENTIDAD
        const sensorEntityAEliminar = this._sensorRepository
            .create({
                id: idSensor
            });


        return this._sensorRepository.remove(sensorEntityAEliminar)
    }

    buscarPorId(idSensor: number): Promise<SensorEntity> {
        return this._sensorRepository.findOne(idSensor);
    }




}

export interface Sensor {
    id: number;
    codigoSensor: string;
    subparcela: any;


}