import {Controller, Get} from "@nestjs/common";
import {RolService} from "../rol/rol.service";
import {RolesUsuario, RolUsuarioService} from "./rolUsuario.service";

@Controller('rolUsuario')
export class RolUsuarioController {

    constructor(
        private readonly __rolUsuarioService: RolUsuarioService
    ) {

    }


    @Get('')
    todos() {
        this.__rolUsuarioService.todos().then(res => {
            console.log("csdcsdcsdcsdc", res)
        })
    }


}