import { InputType, Field } from 'type-graphql';

@InputType()
export default class CreateStoreInput {
	@Field()
	name!: string;

  @Field()
	username!: string;

	@Field()
	address!: string;
}
