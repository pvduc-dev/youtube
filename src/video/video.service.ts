import { Inject, Injectable } from '@nestjs/common';
import { CreateVideoInput } from '@/video/dto/create-video.input';
import { UpdateVideoInput } from '@/video/dto/update-video.input';
import { InjectModel } from '@nestjs/mongoose';
import { IVideo, Video } from '@/video/schemas/video.schema';
import { Model } from 'mongoose';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<IVideo>,
    @Inject('GRPC') private clientGrpc: ClientGrpc,
  ) {}

  async findAll() {
    return this.videoModel.find();
  }

  create(createVideoInput: CreateVideoInput) {
    return this.videoModel.create(createVideoInput);
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoInput: UpdateVideoInput) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
