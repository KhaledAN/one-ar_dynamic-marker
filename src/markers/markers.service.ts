import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import mongoose from "mongoose";
import * as puppeteer from "puppeteer";
import { UsersService } from "./../users/users.service";
const SITE_URL = "https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html";

@Injectable()
export class MarkersService {
  constructor(private readonly usersService: UsersService) {}
  async create(image: Express.Multer.File, name: string = "No Name", userId: mongoose.Types.ObjectId) {
    const user = await this.usersService.findOne(userId);
    const timestamp = Date.now();
    if (!fs.existsSync("Storage/Images")) {
      fs.mkdirSync("Storage/Images", { recursive: true });
    }
    if (!fs.existsSync("Storage/Markers")) {
      fs.mkdirSync("Storage/Markers", { recursive: true });
    }
    const imagePath = `Storage/Images/${Date.now().toString() + userId + "." + image.originalname.split(".")[1]}`;
    const patternPath = `Storage/Markers/${Date.now().toString() + userId}.patt`;
    fs.writeFileSync(imagePath, image.buffer);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
    client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: patternPath,
    });
    await page.goto(SITE_URL, { waitUntil: "networkidle2" });
    const uploadBtn = await page.$("#fileinput");
    await uploadBtn.uploadFile(imagePath);
    await page.waitForNetworkIdle();
    await page.waitFor(1000);
    await page.click("#buttonDownloadEncoded");
    await page.waitForNetworkIdle();
    await browser.close();
    const downloadedFilePath = patternPath + "/" + fs.readdirSync(patternPath)[0];
    const pattBuffer = fs.readFileSync(downloadedFilePath);
    deleteFolderRecursive(patternPath);
    fs.writeFileSync(patternPath, pattBuffer);
    user.markers.push({ name, patternPath, imagePath, timestamp } as any);
    await user.save();
    return user.markers[user.markers.length - 1];
  }

  async findAll(userId: any) {
    return (await this.usersService.findOne(userId)).markers;
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

const deleteFolderRecursive = function (path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};
