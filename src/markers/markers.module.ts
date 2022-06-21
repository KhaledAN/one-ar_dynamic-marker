import { Module } from "@nestjs/common";
import { StorageModule } from "src/storage/storage.module";
import { UsersModule } from "src/users/users.module";
import { MarkersController } from "./markers.controller";
import { MarkersService } from "./markers.service";

@Module({
  imports: [UsersModule, StorageModule],
  controllers: [MarkersController],
  providers: [MarkersService],
  exports: [MarkersService],
})
export class MarkersModule {}
