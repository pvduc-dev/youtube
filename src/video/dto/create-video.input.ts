import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVideoInput {
  @Field({ description: 'Example field (placeholder)' })
  title: string;
}
