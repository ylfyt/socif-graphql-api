import { InputType, Field } from 'type-graphql';

@InputType()
export default class UpdateStoreInput {
	@Field()
	name!: string;

	@Field()
	address!: string;
}
