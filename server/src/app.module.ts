import {Module} from "@nestjs/common";
import { TrackModule } from "./track/track.module";

@Module({
    imports:[TrackModule],
    controllers:[],
    providers: []
})
export class AppModule {}