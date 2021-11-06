import { Test, TestingModule } from '@nestjs/testing';
import { VideoService } from './video.service';
import { Model } from 'mongoose';
import { Video } from '@/video/schemas/video.schema';

describe('VideoService', () => {
  let service: VideoService;
  let videoModel: Model<Video>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoService],
    }).compile();

    service = module.get<VideoService>(VideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
