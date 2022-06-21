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
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return { users };
  }
  @Get(":id")
  async findOne(@Param("id") id: mongoose.Types.ObjectId) {
    const user = await this.usersService.findOne(id);
    return { user };
  }
}
