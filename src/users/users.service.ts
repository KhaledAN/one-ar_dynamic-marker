import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { MarkersService } from "src/markers/markers.service";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly User: mongoose.Model<User>, private readonly markersService: MarkersService) {}
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

  async addMarker(id: mongoose.Types.ObjectId, image: Express.Multer.File) {
    const user = await this.findOne(id);
    const markerData = await this.markersService.create(image, id);
    user.markers.push(markerData);
    await user.save();
    return user;
  }
}
