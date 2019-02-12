import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as express from 'express';
import * as session from 'express-session';

var FileStore = require('session-file-store')(session);

//var session = require('express-session');
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    app.use(
        session({
            name: 'server-session-id',
            secret: 'epn ingenieria en sitemasSS',
            resave: false,
            saveUninitialized: true,
            cookie: {secure: false},
            store: new FileStore()


        })
    )
    await app.listen(3005);

}

bootstrap();
