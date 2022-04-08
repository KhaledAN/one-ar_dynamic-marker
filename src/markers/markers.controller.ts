import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { MarkersService } from './markers.service';
import { UpdateMarkerDto } from './dto/update-marker.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('markers')
export class MarkersController {
  constructor(private readonly markersService: MarkersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() image: Express.Multer.File, @Req() req: any) {
    const res = await this.markersService.create(image, req.get('userId'));
    return res;
  }

  @Get()
  findAll() {
    return this.markersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.markersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarkerDto: UpdateMarkerDto) {
    return this.markersService.update(+id, updateMarkerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.markersService.remove(+id);
  }
}
