import {Module} from "@nestjs/common";
import {TypeOrmModule} from '@nestjs/typeorm';
import {RolEntity} from "./rol.entity";
import {RolController} from "./rol.controller";
import {RolService} from "./rol.service";
import {UsuarioModule} from "../Usuario/usuario.module";
import {RolUsuarioModules} from "../RolUsuario/rolUsuario.modules";
import {ParcelaModule} from "../Parcela/parcela.module";
import {SubparcelaModule} from "../Subparcela/subparcela.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RolEntity
        ]),RolUsuarioModules
    ],
    controllers: [
        RolController
    ],
    providers: [
        RolService
    ],
    exports: [
        RolService
    ]
})


export class RolModules {

}