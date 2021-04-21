import {Module} from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from "./file/files.module";
import { TrackModule } from "./track/track.module";
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path'

const user = 'chad';
const password = 'fuckingpassword1W';

@Module({
    imports:[
        TrackModule,
        MongooseModule.forRoot(`mongodb://${user}:${password}@178.62.77.223:27017`, {
            useNewUrlParser: true
        }),
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
        FileModule
    ],
    controllers:[],
    providers: []
})
export class AppModule {}