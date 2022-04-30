import { InputType, Field } from 'type-graphql';

@InputType()
export default class UpdateProductInput {
	@Field({ nullable: true })
	name!: string;

	@Field({ nullable: true })
	description!: string;
}
