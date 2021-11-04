import {
  CacheInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { VideoService } from '@/video/video.service';
import { Public } from 'nest-keycloak-connect';

@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Get()
  @Public()
  @UseInterceptors(CacheInterceptor)
  public find() {
    return this.videoService.findAll();
  }
}
