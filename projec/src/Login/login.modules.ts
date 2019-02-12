import {Module} from "@nestjs/common";
import {LoginController} from "./login.controller";
import {LoginService} from "./login.service";
import {UsuarioEntity} from "../Usuario/usuario.entity";
import {UsuarioModule} from "../Usuario/usuario.module";
import {RolUsuarioModules} from "../RolUsuario/rolUsuario.modules";
import {RolModules} from "../rol/rol.modules";

@Module({

    imports: [
        UsuarioModule, RolUsuarioModules, RolModules
    ],
    controllers: [
        LoginController
    ],
    providers: [
        LoginService
    ],
    exports: [
        LoginService

    ]
})
export class LoginModules {


}