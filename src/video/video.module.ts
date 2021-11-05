import { Module } from '@nestjs/common';
import { VideoService } from '@/video/video.service';
import { VideoResolver } from '@/video/video.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from '@/video/schemas/video.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Video.name,
        schema: VideoSchema,
      },
    ]),
    ClientsModule.register([
      {
        name: 'GRPC',
        transport: Transport.GRPC,
        options: {
          package: 'hero',
          protoPath: join(__dirname, 'proto/video.proto'),
        },
      },
    ]),
  ],
  providers: [VideoResolver, VideoService],
})
export class VideoModule {}
