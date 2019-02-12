import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {OneToMany} from "typeorm/browser";
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {ParcelaEntity} from "../Parcela/parcela.entity";
import {RolEntity} from "../rol/rol.entity";

@Entity()
export class RolUsuarioEntity {


    @PrimaryGeneratedColumn()
    idRolUsuario: number;


////////////////////////////////////////////////
    @ManyToOne(
        type => UsuarioEntity, // Tipo de Dato Un Usuario a muchos

        usuario => usuario.idUsuario, {eager: true} // Cual es el campo FK
    )
    usuarios: UsuarioEntity;


    @ManyToOne(
        type => RolEntity, // Tipo de Dato Un Usuario a muchos

        roles => roles.idRol, {eager: true} // Cual es el campo FK
    )
    roles: RolEntity;

}