import { UsersModule } from "./../users/users.module";
import { Module } from "@nestjs/common";
import { ModelsService } from "./models.service";
import { ModelsController } from "./models.controller";
import { StorageModule } from "src/storage/storage.module";

@Module({
  imports: [UsersModule, StorageModule],
  controllers: [ModelsController],
  providers: [ModelsService],
})
export class ModelsModule {}
