import { Injectable } from '@nestjs/common';
import { CreateVideoInput } from './dto/create-video.input';
import { InjectModel } from '@nestjs/mongoose';
import { IVideo, Video } from './schemas/video.schema';
import { Model } from 'mongoose';

@Injectable()
export class VideoService {
  constructor(@InjectModel(Video.name) private videoModel: Model<IVideo>) {}

  async findAll() {
    return this.videoModel.find();
  }

  create(createVideoInput: CreateVideoInput) {
    return this.videoModel.create(createVideoInput);
  }
}
