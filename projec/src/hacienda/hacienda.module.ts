
import {Module} from "@nestjs/common";

import {TypeOrmModule} from '@nestjs/typeorm';
import {HaciendaEntity} from "./hacienda.entity";
import {HaciendaController} from "./hacienda.controller";
import {HaciendaService} from "./hacienda.service";
import {RegionModule} from "../Region/region.module";


@Module({
    imports: [
        // Repositorio
        TypeOrmModule
            .forFeature(
                [
                    HaciendaEntity
                ]
            ),
        RegionModule
    ],
    controllers: [
HaciendaController
    ],
    providers: [
HaciendaService
    ],
    exports: [
HaciendaService
    ]
})
export class HaciendaModule {
}
