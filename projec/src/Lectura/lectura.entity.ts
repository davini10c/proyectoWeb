import {BeforeInsert, ManyToOne, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import {SubparcelaEntity} from "../Subparcela/subparcela.entity";
import {SensorEntity} from "../Sensor/sensor.entity";

@Entity('lectura')

export class LecturaEntity {

    @PrimaryGeneratedColumn()
    idLectura: number;

    @Index()
    @Column(
        {
            name: 'fechaLectura',
            type: 'date',


        }
    )
    fechaLectura: string;


    @BeforeInsert()
    antesDeInsertar() {
        console.log('Ejecutandome antes de insertar');
    }

    @BeforeInsert()
    verificarFuncion() {
        console.log('Ejecuta despues de antes de insertar');
    }

    @ManyToOne(
        type => SensorEntity, // Tipo de Dato Un Usuario a muchos

        sensor => sensor.lecturas // Cual es el campo FK
    )
    sensor: SensorEntity;

}