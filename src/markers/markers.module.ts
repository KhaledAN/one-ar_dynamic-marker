import { Module } from "@nestjs/common";
import { MarkersService } from "./markers.service";
import { MarkersController } from "./markers.controller";

@Module({
  // controllers: [MarkersController],
  providers: [MarkersService],
  exports: [MarkersService],
})
export class MarkersModule {}