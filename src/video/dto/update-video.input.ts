import { CreateVideoInput } from './create-video.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVideoInput extends PartialType(CreateVideoInput) {
  @Field()
  title: string;
}
