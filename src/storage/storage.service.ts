import { Injectable } from "@nestjs/common";
import * as fs from "fs";
@Injectable()
export class StorageService {
  getResource(path: string) {
    console.log(path);
    return fs.readFileSync(path);
  }
}
