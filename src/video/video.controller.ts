import { Controller, Get, Res } from '@nestjs/common';
import { VideoService } from '@/video/video.service';
import { Response } from 'express';
import { find } from 'rxjs';
import { Public } from 'nest-keycloak-connect';

@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Get()
  @Public()
  public find() {
    return this.videoService.find();
  }
}
