import {BeforeInsert, ManyToOne, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RegionEntity} from "../Region/region.entity";
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {ParcelaEntity} from "../Parcela/parcela.entity";

@Entity('hacienda')

export class HaciendaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column(
        {
            name: 'nombreHacienda',
            type: 'varchar',
            length: 50,
            default: 'hacienda'
        }
    )
    nombre: string;

    @Column({
        nullable: false,
    })
    direccion: string;

    @Column({
        nullable: false
    })
    telefono: string;



    @BeforeInsert()
    antesDeInsertar() {
        console.log('Ejecutandome antes de insertar');
    }

    @BeforeInsert()
    verificarFuncion() {
        console.log('Ejecuta despues de antes de insertar');
    }

    @ManyToOne(
        type => RegionEntity, // Tipo relacion de muchos
        // a uno
        region => region.haciendas, // Campo donde nos guarda
    )
    region: RegionEntity[];

    @OneToMany(
        type => UsuarioEntity, // Tipo de Dato Un Usuario a muchos

        usuario => usuario.hacienda // Cual es el campo FK
    )
    usuarios: UsuarioEntity

    @OneToMany(
        type => ParcelaEntity,
        // Libros[]
        parcela => parcela.hacienda// Cual es el campo FK
    )
    parcelas: ParcelaEntity[]
}



