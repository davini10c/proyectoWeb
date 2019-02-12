import {BeforeInsert, ManyToOne, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import {HaciendaEntity} from "../hacienda/hacienda.entity";
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {SubparcelaEntity} from "../Subparcela/subparcela.entity";
import {LecturaEntity} from "../Lectura/lectura.entity";

@Entity('sensor')

export class SensorEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column(
        {
            name: 'codigoSensor',
            type: 'varchar',
            length: 10,
            default: 'sensor'
        }
    )
    codigoSensor: string;


    @BeforeInsert()
    antesDeInsertar() {
        console.log('Ejecutandome antes de insertar');
    }

    @BeforeInsert()
    verificarFuncion() {
        console.log('Ejecuta despues de antes de insertar');
    }

    @ManyToOne(
        type => SubparcelaEntity, // Tipo de Dato Un Usuario a muchos

        subparcela => subparcela.sensores // Cual es el campo FK
    )
    subparcela: SubparcelaEntity;
    @OneToMany(
        type => LecturaEntity,
        lectura => lectura.sensor
    )
    lecturas : LecturaEntity[]

}