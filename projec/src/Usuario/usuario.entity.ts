import {BeforeInsert, ManyToOne, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RegionEntity} from "../Region/region.entity";
import {HaciendaEntity} from "../hacienda/hacienda.entity";
import {ParcelaEntity} from "../Parcela/parcela.entity";
import {RolUsuarioEntity} from "../RolUsuario/rolUsuario.entity";

@Entity('usuario')

export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    idUsuario: number;

    @Index()
    @Column(
        {
            name: 'nombreUsuario',
            type: 'varchar',
            length: 50,
            default: 'usuario'
        }
    )
    nombreUsuario: string;

    @Column({
        nullable: false,
    })
    cedulaUsuario: string;

    @Column({
        nullable: false
    })
    direccionUsuario: string;

    @Column({
        nullable: false
    })
    telefonoUsuario: string;

    @Column({
        nullable: false
    })
    contraseñaUsuario: string;


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

        hacienda => hacienda.usuarios, {eager: true} // Cual es el campo FK
    )
    hacienda: HaciendaEntity;


    @OneToMany(
        type => ParcelaEntity, // Tipo de Dato Un Usuario a muchos

        parcela => parcela.usuario // Cual es el campo FK
    )
    parcelas: ParcelaEntity[];




    ///////////////////////////////////////////////////////////////////////

    @OneToMany(
        type => RolUsuarioEntity, // Tipo de Dato Un Usuario a muchos

        rolUsuario => rolUsuario.idRolUsuario // Cual es el campo FK
    )
    rolUsuarios: RolUsuarioEntity[];



}

