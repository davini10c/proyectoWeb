
import {Module} from "@nestjs/common";

import {TypeOrmModule} from '@nestjs/typeorm';

import {SensorEntity} from "./sensor.entity";
import {SensorController} from "./sensor.controller";
import {SensorService} from "./sensor.service";
import {SubparcelaModule} from "../Subparcela/subparcela.module";


@Module({
    imports: [
        // Repositorio
        TypeOrmModule
            .forFeature(
                [
                    SensorEntity
                ]
            ),
        SubparcelaModule
    ],
    controllers: [
        SensorController
    ],
    providers: [
        SensorService
    ],
    exports: [
        SensorService
    ]
})
export class SensorModule {
}
