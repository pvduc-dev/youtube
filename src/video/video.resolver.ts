import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { VideoService } from './video.service';
import { Video } from './entities/video.entity';
import { CreateVideoInput } from './dto/create-video.input';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Public } from 'nest-keycloak-connect';

@Resolver(() => Video)
export class VideoResolver {
  constructor(
    private videoService: VideoService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Mutation(() => Video)
  createVideo(@Args('createVideoInput') createVideoInput: CreateVideoInput) {
    return this.videoService.create(createVideoInput);
  }

  @Query(() => [Video], { name: 'video' })
  @Public()
  findAll() {
    return this.videoService.findAll();
  }
}
