import {
    BeforeInsert,
    ManyToMany,
    JoinTable,
    ManyToOne,
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";

import {HaciendaEntity} from "../hacienda/hacienda.entity";
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {SubparcelaEntity} from "../Subparcela/subparcela.entity";
import {LecturaEntity} from "../Lectura/lectura.entity";
import {RolUsuarioEntity} from "../RolUsuario/rolUsuario.entity";

@Entity('rol')

export class RolEntity {

    @PrimaryGeneratedColumn()
    idRol: number;

    @Index()
    @Column(
        {
            name: 'nombreRol',
            type: 'varchar',
            length: 50,
            default: 'sensor'
        }
    )
    nombreRol: string;

    @Column({
        nullable: false,
    })
    descripcionRol: string;

    @BeforeInsert()
    antesDeInsertar() {
        console.log('Ejecutandome antes de insertar');
    }

    @BeforeInsert()
    verificarFuncion() {
        console.log('Ejecuta despues de antes de insertar');
    }


    //////////////////////////////////////////////


    @OneToMany(
        type => RolEntity, // Tipo de Dato Un Usuario a muchos

        roles => roles.idRol // Cual es el campo FK
    )
    rolesUsuarios: RolUsuarioEntity[];

}