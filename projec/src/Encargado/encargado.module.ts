import {Module} from "@nestjs/common";
import {Encargadocontroller} from "./encargadocontroller";
import {EncargadoService} from "./encargado.service";
import {ParcelaModule} from "../Parcela/parcela.module";
import {SubparcelaModule} from "../Subparcela/subparcela.module";
import {UsuarioModule} from "../Usuario/usuario.module";

@Module({
        imports: [ParcelaModule, SubparcelaModule, UsuarioModule],
        controllers: [
            Encargadocontroller
        ],
        providers: [
            EncargadoService
        ],
        exports: [
            EncargadoService
        ]

    }
)
export class EncargadoModule {

}