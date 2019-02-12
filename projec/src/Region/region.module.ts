import {Module} from "@nestjs/common";
import {TypeOrmModule} from '@nestjs/typeorm';
import {RegionEntity} from "./region.entity";
import {RegionService} from "./region.service";
import {RegionController} from "./region.controller";

@Module({
    imports: [
        // Repositorio
        TypeOrmModule
            .forFeature(
                [
                    RegionEntity
                ]
            )
    ],
    controllers: [
        RegionController
    ],
    providers: [
        RegionService
    ],
    exports: [
        RegionService
    ]
})
export class RegionModule {
}
