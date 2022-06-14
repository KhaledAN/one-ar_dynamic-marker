import { Injectable } from "@nestjs/common";
import mongoose from "mongoose";
import { UsersService } from "./../users/users.service";
import * as fs from "fs";
@Injectable()
export class ModelsService {
  constructor(private readonly usersService: UsersService) {}
  async create(name: string, gltf: Express.Multer.File, userId: mongoose.Types.ObjectId) {
    const user = await this.usersService.findOne(userId);
    if (!fs.existsSync("Storage/Models")) {
      fs.mkdirSync("Storage/Models");
    }
    const path = `Storage/Models/${Date.now()}-${user._id}.glb`;
    fs.writeFileSync(path, gltf.buffer);
    const model = { name, path };
    user.models.push(model as any);
    await user.save();
    return user.models[user.models.length - 1];
  }

  async findAll(userId: mongoose.Types.ObjectId) {
    return (await this.usersService.findAll()).map(({ models }) => models).flat();
    // return (await this.usersService.findOne(userId)).models;
  }

  async remove(id: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) {
    const user = await this.usersService.findOne(userId);
    const model = user.models.find((model) => model._id.toString() === id.toString());
    if (model) {
      fs.unlinkSync(model.path);
      user.models.splice(user.models.indexOf(model), 1);
      await user.save();
    }
    return;
  }
}
