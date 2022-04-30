import { InputType, Field } from 'type-graphql';

@InputType()
export default class CreateProductInput {
	@Field()
	name!: string;

	@Field()
	description!: string;

	@Field()
	price!: number;

	@Field()
	stock!: number;

  @Field()
  storeId!: string;
}
