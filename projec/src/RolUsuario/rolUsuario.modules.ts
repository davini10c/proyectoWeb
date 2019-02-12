import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RolUsuarioEntity} from "./rolUsuario.entity";
import {RolUsuarioController} from "./rolUsuario.controller";
import {RolUsuarioService} from "./rolUsuario.service";

@Module({

    imports: [
        TypeOrmModule.forFeature([
            RolUsuarioEntity
        ])

    ],
    controllers: [
        RolUsuarioController

    ],
    providers: [
        RolUsuarioService

    ],
    exports: [
        RolUsuarioService
    ]
})


export class RolUsuarioModules {

}