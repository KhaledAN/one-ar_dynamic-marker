import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import * as fs from 'fs';
import * as puppeteer from 'puppeteer';
import { UpdateMarkerDto } from './dto/update-marker.dto';
const SITE_URL =
  'https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html';

@Injectable()
export class MarkersService {
  async create(image: Express.Multer.File, userId: mongoose.Types.ObjectId) {
    const timestamp = Date.now();
    const fileFolder = `src/storage/${userId}/${timestamp}`;
    fs.mkdirSync(fileFolder, { recursive: true });
    const imagePath = fileFolder + `/${image.originalname}`;
    fs.writeFileSync(imagePath, image.buffer);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
    const parsedFolderPath = fileFolder.replaceAll('/', '\\');
    client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: `C:\\Users\\Khaled\\Projects\\University\\GP\\dynamic-marker\\${parsedFolderPath}`,
    });
    await page.goto(SITE_URL, { waitUntil: 'networkidle2' });
    const uploadBtn = await page.$('#fileinput');
    await uploadBtn.uploadFile(imagePath);
    await page.waitForNetworkIdle();
    await page.waitFor(1000);
    await page.click('#buttonDownloadEncoded');
    await page.waitForNetworkIdle();
    await browser.close();
    const patternPath = `${fileFolder}/${
      image.originalname.split('.')[0]
    }.patt`;

    return { name: 'No Name', patternPath, imagePath, timestamp };
  }

  findAll() {
    return `This action returns all markers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} marker`;
  }

  update(id: number, updateMarkerDto: UpdateMarkerDto) {
    return `This action updates a #${id} marker`;
  }

  remove(id: number) {
    return `This action removes a #${id} marker`;
  }
}
