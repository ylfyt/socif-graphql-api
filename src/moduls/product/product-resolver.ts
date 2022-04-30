import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import Product from '../../entities/product';
import Store from '../../entities/store';
import DataContext from '../../utils/data-context';
import CreateProductInput from './create-product-input';
import UpdateProductInput from './update-product-input';

@Resolver(Product)
export class ProductResolver {
	@Query(() => [Product])
	async products(@Ctx() { em }: DataContext) {
		return await em.find(Product, {});
	}

	@Query(() => Product, { nullable: true })
	async product(@Ctx() { em }: DataContext, @Arg('id') id: string) {
		return await em.findOne(Product, { id: id });
	}

	@Mutation(() => Product, { nullable: true })
	async createProduct(@Arg('data') { name, description, price, stock, storeId }: CreateProductInput, @Ctx() { em, req }: DataContext) {
		const str = await em.findOne(Store, { id:  storeId });

		if (!str) {
			// TODO: Throw Error
			return null;
		}

		const newProduct = em.create(Product, {
			name: name,
			description: description,
			price: price,
			stock: stock,
			storeId: str.id,
			image: 'default.png',
		});
		await em.persistAndFlush(newProduct);
		return newProduct;
	}

	@Mutation(() => Product)
	async updateProduct(@Arg('id') id: string, @Arg('data') { name, description }: UpdateProductInput, @Ctx() { em }: DataContext) {
		const product = await em.findOne(Product, { id: id });
		if (!product) {
			return null;
		}

		if (typeof name !== 'undefined') {
			product.name = name;
		}
		if (typeof description !== 'undefined') {
			product.description = description;
		}
		await em.persistAndFlush(product);
		return product;
	}
}
