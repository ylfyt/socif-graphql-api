import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { MikroORM } from '@mikro-orm/core';
import { buildSchema } from 'type-graphql';
import cors from 'cors';

import StoreResolver from './moduls/store/store-resolver';
import ProductResolver from './moduls/product/product-resolver';
import dbConfig from './utils/db-config';

const main = async () => {
	const app = express();
	dotenv.config();
	const PORT = process.env.PORT || 4000;

	app.get('/', (req, res) => {
		res.send(`<a href="http://localhost:${PORT}/graphql" >http://localhost:${PORT}/graphql</a>`);
	});

	MikroORM.init(dbConfig).then(async (orm) => {
		const msg = 'Database is connected in ' + ((process.env.MODE === 'DEV' ? 'DEVELOPMENT' : 'PRODUCTION') + ' mode!!!');
		console.log(msg);

		const schema = await buildSchema({
			resolvers: [StoreResolver, ProductResolver],
		});

		const apolloServer = new ApolloServer({
			schema: schema,
			context: ({ req, res }) => ({ em: orm.em, req: req, res: res }),
		});
		await apolloServer.start();

    app.use(
			cors({
				credentials: true,
				origin: ['https://studio.apollographql.com'],
			})
		);

    apolloServer.applyMiddleware({ app, cors: false });
	
		app.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT} | http://localhost:${PORT}`);
		});
	});
};

main();
