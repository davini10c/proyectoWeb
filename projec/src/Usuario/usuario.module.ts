import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsuarioEntity} from "./usuario.entity";
import {RolEntity} from "../rol/rol.entity";
import {RolModules} from "../rol/rol.modules";
import {HaciendaModule} from "../hacienda/hacienda.module";
import {RolUsuarioController} from "../RolUsuario/rolUsuario.controller";
import {RolUsuarioModules} from "../RolUsuario/rolUsuario.modules";


@Module({
    imports: [

        TypeOrmModule.forFeature([
            UsuarioEntity
        ]), HaciendaModule, RolModules, RolUsuarioModules

    ],
    controllers: [
        UsuarioController
    ],
    providers: [
        UsuarioService
    ],
    exports: [
        UsuarioService
    ]
})


export class UsuarioModule {

}