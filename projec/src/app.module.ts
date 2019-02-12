import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';

import {TypeOrmModule} from '@nestjs/typeorm';
import {HaciendaModule} from "./hacienda/hacienda.module";

import {UsuarioEntity} from "./Usuario/usuario.entity";
import {HaciendaEntity} from "./hacienda/hacienda.entity";
import {RegionEntity} from "./Region/region.entity";
import {ParcelaEntity} from "./Parcela/parcela.entity";
import {SensorEntity} from "./Sensor/sensor.entity";
import {LecturaEntity} from "./Lectura/lectura.entity";
import {SubparcelaEntity} from "./Subparcela/subparcela.entity";
import {RolEntity} from "./rol/rol.entity";
import {RegionModule} from "./Region/region.module";

import {UsuarioModule} from "./Usuario/usuario.module";
import {RolModules} from "./rol/rol.modules";
import {ParcelaModule} from "./Parcela/parcela.module";
import {SubparcelaModule} from "./Subparcela/subparcela.module";
import {SensorModule} from "./Sensor/sensor.module";
import {RolUsuarioEntity} from "./RolUsuario/rolUsuario.entity";
import {RolUsuarioModules} from "./RolUsuario/rolUsuario.modules";
import {EncargadoModule} from "./Encargado/encargado.module";
import {LoginModules} from "./Login/login.modules";

@Module({
        imports: [
            TypeOrmModule
                .forRoot({
                    type: 'mysql',
                    host: 'localhost',
                    port: 3306,

                    /*username: 'root',
                    password: 'password',*/

                    username: 'vinicioQ',
                    password: '98765432',

                    database: 'webproject',
                    synchronize: true,
                    dropSchema: false,
                    entities: [
                        UsuarioEntity,
                        HaciendaEntity,
                        RegionEntity,
                        ParcelaEntity,
                        SensorEntity,
                        LecturaEntity,
                        SubparcelaEntity,
                        RolEntity,
                        RolUsuarioEntity
                    ]
                }),


            RegionModule,
            UsuarioModule,
            HaciendaModule,
            ParcelaModule,
            SubparcelaModule,
            SensorModule,
            RolUsuarioModules,
            RolModules,
            EncargadoModule,
            LoginModules

        ], // Modulos
        controllers: [AppController], // Controllers
        providers: [
            AppService
        ], // Servicios
    }
)

export class AppModule {
}