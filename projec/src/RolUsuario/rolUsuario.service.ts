import {Injectable} from "@nestjs/common";
import {RolUsuarioEntity} from "./rolUsuario.entity";
import {FindManyOptions, FindOneOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {RegionEntity} from "../Region/region.entity";
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {Usuario} from "../Usuario/usuario.service";
import {RolEntity} from "../rol/rol.entity";

@Injectable()
export class RolUsuarioService {

    constructor(
        @InjectRepository(RolUsuarioEntity)
        private readonly _rolUsuarioRepository: Repository<RolUsuarioEntity>,
    ) {
    }

    buscar(parametros?: FindManyOptions<RolUsuarioEntity>)
        : Promise<RolUsuarioEntity[]> {
        return this._rolUsuarioRepository.find(parametros);
    }


    async crear(rolUsuario: any): Promise<RolUsuarioEntity> {

        const rolUsuarioCreado = await this._rolUsuarioRepository.save(rolUsuario);
        return rolUsuarioCreado;

    }


    todos(parametros?: FindManyOptions<RolUsuarioEntity>)
        : Promise<RolUsuarioEntity[]> {
        return this._rolUsuarioRepository.find(parametros);
    }


    async verificarRoles(id: number): Promise<RolUsuarioEntity> {
        const consulta: FindOneOptions<RolUsuarioEntity> = {
            where: {

                usuarios: id

            },
            //relations: ['roles']

        }
        console.log("acsascascascasjkchaskcjlasj7897987987", consulta);
        console.log("111111111", await this._rolUsuarioRepository.findOne(consulta));

        return await this._rolUsuarioRepository.findOne(consulta)

    }

}

export interface RolesUsuario {
    //  usuarios: number,
    // roles: number

}