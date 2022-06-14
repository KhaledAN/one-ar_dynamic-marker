import { Body, Controller, Delete, Get, Param, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import mongoose from "mongoose";
import { ModelsService } from "./models.service";

@Controller("models")
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Post()
  @UseInterceptors(FileInterceptor("model"))
  create(@Body("name") name: string, @UploadedFile() model: Express.Multer.File, @Req() req: any) {
    return this.modelsService.create(name, model, req.get("userId"));
  }

  @Get()
  async findAll(@Req() req: any) {
    const models = await this.modelsService.findAll(req.get("userId"));
    return { models };
  }

  @Delete(":id")
  remove(@Param("id") id: mongoose.Types.ObjectId, @Req() req: any) {
    return this.modelsService.remove(id, req.get("userId"));
  }
}
