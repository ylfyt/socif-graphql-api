import { Entity, PrimaryKey, SerializedPrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Ctx, Field, ID, ObjectType, Root } from 'type-graphql';
import DataContext from '../utils/data-context';
import Product from './product';

@ObjectType()
@Entity()
export default class Store {
	@PrimaryKey()
	_id!: ObjectId;

	@Field((type) => ID)
	@SerializedPrimaryKey()
	id!: string;

	@Field()
	@Property({ type: String })
	name!: string;

	@Field()
	@Property({ unique: true })
	username!: string;

	@Field()
	@Property({ nullable: false })
	address!: string;

	@Field(() => [Product])
	async products(@Ctx() { em }: DataContext, @Root() store: Store) {
		return await em.find(Product, { storeId: store.id });
	}
}
