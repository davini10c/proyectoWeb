import {BeforeInsert, ManyToOne, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import {HaciendaEntity} from "../hacienda/hacienda.entity";
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {SubparcelaEntity} from "../Subparcela/subparcela.entity";

@Entity('parcela')

export class ParcelaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column(
        {
            name: 'codigoParcela',
            type: 'varchar',
            length: 10,
            default: 'parcela'
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
        type => HaciendaEntity, // Tipo de Dato Un Usuario a muchos

        hacienda => hacienda.parcelas // Cual es el campo FK
    )
    hacienda: HaciendaEntity;

    @ManyToOne(
        type => UsuarioEntity, // Tipo de Dato Un Usuario a muchos

        usuario => usuario.parcelas // Cual es el campo FK
    )
    usuario: UsuarioEntity;

    @OneToMany(
    type => SubparcelaEntity,
    subparcela => subparcela.parcela

)
    subparcelas: SubparcelaEntity[]

}
