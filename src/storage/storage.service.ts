import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { StorageFolder } from "./enum/storage-folder.enum";

@Injectable()
export class StorageService {
  getResource(path: string) {
    return fs.readFileSync(path);
  }

  saveResource(folder: StorageFolder, fileName: string, buffer: Buffer) {
    this.createFolder(folder);
    const path = `Storage/${folder}/${fileName}`;
    fs.writeFileSync(path, buffer);
    return path;
  }

  createFolder(folder: StorageFolder) {
    if (!fs.existsSync(`Storage/${folder}`)) {
      fs.mkdirSync(`Storage/${folder}`, { recursive: true });
    }
  }
}
