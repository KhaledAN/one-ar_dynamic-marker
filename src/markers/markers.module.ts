import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { MarkersController } from "./markers.controller";
import { MarkersService } from "./markers.service";

@Module({
  imports: [UsersModule],
  controllers: [MarkersController],
  providers: [MarkersService],
  exports: [MarkersService],
})
export class MarkersModule {}
