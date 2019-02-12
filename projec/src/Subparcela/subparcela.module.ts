
import {Module} from "@nestjs/common";

import {TypeOrmModule} from '@nestjs/typeorm';


import {SubparcelaEntity} from "./subparcela.entity";
import {SubparcelaController} from "./subparcela.controller";
import {SubparcelaService} from "./subparcela.service";
import {ParcelaModule} from "../Parcela/parcela.module";


@Module({
    imports: [
        // Repositorio
        TypeOrmModule
            .forFeature(
                [
                    SubparcelaEntity
                ]
            ),
       ParcelaModule
    ],
    controllers: [
        SubparcelaController
    ],
    providers: [
        SubparcelaService
    ],
    exports: [
        SubparcelaService
    ]
})
export class SubparcelaModule {
}
