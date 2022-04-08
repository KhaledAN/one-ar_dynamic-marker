import { Controller, Get, Param, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import mongoose from "mongoose";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create() {
    const user = await this.usersService.create();
    return { user };
  }

  @Get(":id")
  findOne(@Param("id") id: mongoose.Types.ObjectId) {
    return this.usersService.findOne(id);
  }

  @Post(":id/markers")
  @UseInterceptors(FileInterceptor("image"))
  async addMarker(@Param("id") userId: mongoose.Types.ObjectId, @UploadedFile() image: Express.Multer.File) {
    const user = await this.usersService.addMarker(userId, image);
    return user;
  }
}
