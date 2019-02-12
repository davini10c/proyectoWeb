
import {Module} from "@nestjs/common";

import {TypeOrmModule} from '@nestjs/typeorm';

import {ParcelaEntity} from "./parcela.entity";
import {HaciendaModule} from "../hacienda/hacienda.module";
import {ParcelaController} from "./parcela.controller";
import {ParcelaService} from "./parcela.service";
import {UsuarioModule} from "../Usuario/usuario.module";


@Module({
    imports: [
        // Repositorio
        TypeOrmModule
            .forFeature(
                [
                    ParcelaEntity
                ]
            ),
        HaciendaModule,
        UsuarioModule
    ],
    controllers: [
        ParcelaController
    ],
    providers: [
        ParcelaService
    ],
    exports: [
        ParcelaService
    ]
})
export class ParcelaModule {
}
