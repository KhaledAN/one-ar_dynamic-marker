import { UsersModule } from "./../users/users.module";
import { Module } from "@nestjs/common";
import { ModelsService } from "./models.service";
import { ModelsController } from "./models.controller";

@Module({
  imports: [UsersModule],
  controllers: [ModelsController],
  providers: [ModelsService],
})
export class ModelsModule {}
