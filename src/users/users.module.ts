import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schema/user.schema";
import { MarkersModule } from "src/markers/markers.module";

@Module({
  imports: [MongooseModule.forFeature([{ schema: UserSchema, name: "User" }]), MarkersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
