import { Test, TestingModule } from '@nestjs/testing';
import { VideoService } from './video.service';
import { AppModule } from '../app.module';
import { VideoModule } from './video.module';
import { Model } from 'mongoose';
import { Video } from './schemas/video.schema';
import { getModelToken } from '@nestjs/mongoose';
import { CreateVideoInput } from './dto/create-video.input';

describe('VideoService', () => {
  let videoService: VideoService;
  let videoModel: Model<Video>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, VideoModule],
    }).compile();

    videoService = module.get<VideoService>(VideoService);
    videoModel = module.get(getModelToken(Video.name));

    await videoModel.insertMany([
      {
        title: 'title #1',
      },
      {
        title: 'title #2',
      },
      {
        title: 'title #3',
      },
    ]);
  });

  afterEach(async () => {
    await videoModel.deleteMany({});
  });

  it('should be defined', () => {
    expect(videoService).toBeDefined();
  });

  describe('findAll()', () => {
    it('should be return an array of users', async () => {
      const videos = await videoService.findAll();
      expect(videos).toBeInstanceOf(Array);
    });
  });

  describe('create()', () => {
    it('should be defined', async () => {
      const createVideoInput: CreateVideoInput = {
        title: 'Title',
      };
      const video = await videoService.create(createVideoInput);
      expect(video).toMatchObject(createVideoInput);
    });
  });
});
