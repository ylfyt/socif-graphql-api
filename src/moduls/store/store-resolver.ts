import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import Store from '../../entities/store';
import DataContext from '../../utils/data-context';
import CreateStoreInput from './create-store-input';
import UpdateStoreInput from './update-store-input';

@Resolver(Store)
export class StoreResolver {
	@Query(() => [Store])
	async stores(@Ctx() { em }: DataContext) {
		return await em.find(Store, {});
	}
	@Query(() => Store, { nullable: true })
	async store(@Ctx() { em }: DataContext, @Arg('id', { nullable: true }) id: string, @Arg('username', { nullable: true }) username: string) {
		if (id) {
			return await em.findOne(Store, { id: id });
		}

		if (username) {
			return await em.findOne(Store, { username: username });
		}

		return null;
	}

	@Mutation(() => Store, { nullable: true })
	async createStore(@Arg('data') { name, address, username }: CreateStoreInput, @Ctx() { em, req }: DataContext) {
		const str = await em.findOne(Store, { username: username });
		if (str) {
			return null;
		}

		const newStore = em.create(Store, { name, username, address });
		await em.persistAndFlush(newStore);

		return newStore;
	}

	@Mutation(() => Store, { nullable: true })
	async updateStore(@Arg('id') id: string, @Arg('data') { name, address }: UpdateStoreInput, @Ctx() { em }: DataContext) {
		const store = await em.findOne(Store, { id: id });
		if (!store) {
			return null;
		}

		if (typeof name !== 'undefined') {
			store.name = name;
		}
		if (typeof address !== 'undefined') {
			store.address = address;
		}
		await em.persistAndFlush(store);
		return store;
	}
}
