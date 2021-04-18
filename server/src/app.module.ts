import {Module} from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from "./track/track.module";

@Module({
    imports:[
        TrackModule,
        MongooseModule.forRoot('mongodb://178.62.77.223:27017/api')
    ],
    controllers:[],
    providers: []
})
export class AppModule {}