import { Entity, PrimaryKey, SerializedPrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Ctx, Field, ID, ObjectType, Root } from 'type-graphql';
import DataContext from '../utils/data-context';
import Store from './store';

@ObjectType()
@Entity()
export default class Product {
	@PrimaryKey()
	_id!: ObjectId;

	@Field((type) => ID)
	@SerializedPrimaryKey()
	id!: string;

	@Field()
	@Property()
	name!: string;

	@Field()
	@Property()
	description!: string;

	@Field()
	@Property()
	price!: number;

	@Field()
	@Property()
	stock!: number;

	@Field()
	@Property()
	storeId!: string;

	@Property()
	image!: string;

	@Field(() => Store)
	async store(@Root() product: Product, @Ctx() { em }: DataContext) {
		return await em.findOne(Store, { id: product.storeId });
	}
}
