import { Controller, Get, Param, Post } from "@nestjs/common";
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
}
