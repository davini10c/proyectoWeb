import {BeforeInsert, ManyToOne, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {HaciendaEntity} from "../hacienda/hacienda.entity";
@Entity('region')
export class RegionEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column(
        {
            name: 'nombre',
            type: 'varchar',
            length: 50,
            default:"nombre"
        }
    )
    nombre: string;

    @Column({
        nullable: false,
    })
    descripcion: string;


    @OneToMany(
        type => HaciendaEntity, // Tipo de Dato Un Usuario a muchos

        hacienda => hacienda.region // Cual es el campo FK
    )
    haciendas: HaciendaEntity[]
}