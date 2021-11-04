import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Video {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;
}
