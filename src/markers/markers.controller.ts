import { Body, Controller, Delete, Get, Param, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import mongoose from "mongoose";
import { MarkersService } from "./markers.service";

@Controller("markers")
export class MarkersController {
  constructor(private readonly markersService: MarkersService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async create(@UploadedFile() file: Express.Multer.File, @Req() req: any, @Body("name") name: string) {
    const res = await this.markersService.create(file, name, req.get("userId"));
    return res;
  }

  @Get()
  async findAll(@Req() req: any) {
    return { markers: await this.markersService.findAll(req.get("userId")) };
  }

  @Get(":id")
  findOne(@Param("id") id: mongoose.Types.ObjectId, @Req() req: any) {
    return this.markersService.findOne(id, req.get("userId"));
  }

  @Delete(":id")
  remove(@Param("id") id: mongoose.Types.ObjectId, @Req() req: any) {
    return this.markersService.remove(id, req.get("userId"));
  }
}
