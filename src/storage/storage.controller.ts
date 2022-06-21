import { Controller, Get, Req, Res, StreamableFile } from "@nestjs/common";
import { Request } from "express";
import { StorageFolder } from "./enum/storage-folder.enum";
import { StorageService } from "./storage.service";

@Controller("Storage")
export class StorageController {
  constructor(private readonly storageService: StorageService) {}
  contentTypeMap = {
    [StorageFolder.Models]: "model/gltf-binary",
    [StorageFolder.Images]: "image/png",
    [StorageFolder.Markers]: "application/octet-stream",
  };

  @Get("*")
  getResource(@Req() req: Request, @Res({ passthrough: true }) res) {
    const path = req.url.substring(1);
    const folder = path.split("/")[1];
    res.set({ "Content-Type": this.contentTypeMap[folder] });
    return new StreamableFile(this.storageService.getResource(path));
  }
}
