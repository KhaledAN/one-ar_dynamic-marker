import { Injectable } from "@nestjs/common";
import { execSync } from "child_process";
import * as fs from "fs";
import mongoose from "mongoose";
import { StorageFolder } from "src/storage/enum/storage-folder.enum";
import { StorageService } from "./../storage/storage.service";
import { UsersService } from "./../users/users.service";

@Injectable()
export class MarkersService {
  constructor(private readonly usersService: UsersService, private readonly storageService: StorageService) {}

  async create(image: Express.Multer.File, name: string = "No Name", userId: mongoose.Types.ObjectId) {
    const user = await this.usersService.findOne(userId);
    const imagePath = this.storageService.saveResource(
      StorageFolder.Images,
      Date.now().toString() + userId + "." + image.originalname.split(".")[1],
      image.buffer,
    );
    this.storageService.createFolder(StorageFolder.Markers);
    const patternPath = `Storage/Markers/${Date.now().toString() + userId}.zpt`;
    execSync(`zapworks train ${imagePath} -o ${patternPath}`);
    user.markers.push({ name, patternPath, imagePath } as any);
    await user.save();
    return user.markers[user.markers.length - 1];
  }

  async findAll(userId: any) {
    return (await this.usersService.findAll()).map(({ markers }) => markers).flat();
    // return (await this.usersService.findOne(userId)).markers;
  }

  async findOne(id: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) {
    return (await this.usersService.findOne(userId)).markers.find((marker) => marker._id.toString() === id.toString());
  }

  async remove(id: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) {
    const user = await this.usersService.findOne(userId);
    const marker = user.markers.find((marker) => marker._id.toString() === id.toString());
    fs.unlinkSync(marker.imagePath);
    fs.unlinkSync(marker.patternPath);
    user.markers = user.markers.filter((marker) => marker._id.toString() !== id.toString());
    await user.save();
    return;
  }
}
