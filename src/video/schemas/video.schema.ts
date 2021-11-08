import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, toJSON: { virtuals: true, getters: true } })
class Video {
  @Prop({ required: true })
  title: string;
}

type IVideo = Video & Document;

const VideoSchema = SchemaFactory.createForClass(Video);

export { Video, IVideo, VideoSchema };
