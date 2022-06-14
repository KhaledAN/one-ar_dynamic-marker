import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MarkersModule } from "./markers/markers.module";
import { ModelsModule } from "./models/models.module";
import { StorageModule } from "./storage/storage.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://root:root@cluster0.lyioc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`),
    MarkersModule,
    UsersModule,
    ModelsModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
