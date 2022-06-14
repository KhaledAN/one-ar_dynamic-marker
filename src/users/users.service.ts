import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly User: mongoose.Model<User>) {}
  async create() {
    const user = new this.User();
    await user.save();
    return user;
  }

  async findOne(id: mongoose.Types.ObjectId) {
    if (!mongoose.isValidObjectId(id)) throw new BadRequestException();
    const user = await this.User.findOne({ _id: id });
    if (!user) throw new NotFoundException();
    return user;
  }
  async findAll() {
    const users = await this.User.find();
    if (!users) throw new NotFoundException();
    return users;
  }
}
