import { Controller, Get, Param, Req, Res, StreamableFile } from "@nestjs/common";
import { Request } from "express";
import { StorageService } from "./storage.service";

@Controller("Storage")
export class StorageController {
  constructor(private readonly storageService: StorageService) {}
  @Get("*")
  getResource(@Req() req: Request, @Res({ passthrough: true }) res) {
    const path = req.url.substring(1);
    res.set({
      "Content-Type": path.includes("Models") ? "model/gltf-binary" : path.includes("Images") ? "image/png" : "application/octet-stream",
    });
    return new StreamableFile(this.storageService.getResource(path));
  }
}
