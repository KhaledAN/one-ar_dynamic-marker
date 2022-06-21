import { Injectable } from "@nestjs/common";
import axios from "axios";
import * as fs from "fs";
import mongoose from "mongoose";
import { StorageFolder } from "src/storage/enum/storage-folder.enum";
import { StorageService } from "./../storage/storage.service";
import { UsersService } from "./../users/users.service";

@Injectable()
export class ModelsService {
  constructor(private readonly usersService: UsersService, private readonly storageService: StorageService) {}

  async generateModel(name: string = "Generated Model", image: any, userId: mongoose.Types.ObjectId) {
    const formData = new FormData();
    formData.append("image", image);
    const res = await axios.post("http://localhost:3000/api/models/generate", formData, { responseType: "arraybuffer" });
    const model = { buffer: Buffer.from(res.data, "binary") };
    await this.create(name, model as any, userId);
  }

  async create(name: string, gltf: Express.Multer.File, userId: mongoose.Types.ObjectId) {
    const user = await this.usersService.findOne(userId);
    const path = this.storageService.saveResource(StorageFolder.Models, `${Date.now()}-${user._id}.glb`, gltf.buffer);
    const model = { name, path };
    user.models.push(model as any);
    await user.save();
    return user.models[user.models.length - 1];
  }

  async findAll(userId: mongoose.Types.ObjectId) {
    return (await this.usersService.findAll()).map(({ models }) => models).flat();
    return (await this.usersService.findOne(userId)).models;
  }

  async remove(id: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) {
    const user = await this.usersService.findOne(userId);
    const modelIndex = user.models.findIndex((model) => model._id.toString() === id.toString());
    if (modelIndex !== -1) {
      const model = user.models[modelIndex];
      fs.unlinkSync(model.path);
      user.models.splice(modelIndex, 1);
      await user.save();
    }
    return;
  }
}
