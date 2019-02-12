import {BeforeInsert, ManyToOne, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";


import {ParcelaEntity} from "../Parcela/parcela.entity";
import {SensorEntity} from "../Sensor/sensor.entity";

@Entity('subparcela')

export class SubparcelaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column(
        {
            name: 'codigoSubparcela',
            type: 'varchar',
            length: 10,
            default: 'subparcela'
        }
    )
    codigo: string;

    @Column({
        nullable: false,
    })
    medidas: string;


    @BeforeInsert()
    antesDeInsertar() {
        console.log('Ejecutandome antes de insertar');
    }

    @BeforeInsert()
    verificarFuncion() {
        console.log('Ejecuta despues de antes de insertar');
    }

    @ManyToOne(
        type => ParcelaEntity, // Tipo de Dato Un Usuario a muchos

        parcela => parcela.subparcelas // Cual es el campo FK
    )
    parcela: ParcelaEntity;

@OneToMany(
    type => SensorEntity,
    sensor => sensor.subparcela
)
sensores: SensorEntity[]
}