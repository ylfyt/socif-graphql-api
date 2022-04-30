import { Configuration, Connection, IDatabaseDriver, Options } from '@mikro-orm/core';
import  Product  from '../entities/product';
import Store  from '../entities/store';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig: Configuration<IDatabaseDriver<Connection>> | Options<IDatabaseDriver<Connection>> = {
	entities: [Store, Product],
	dbName: 'graphql-api',
	type: 'mongo',
	clientUrl: process.env.MODE === 'DEV' ? process.env.DB_CONNECT_DEV : process.env.DB_CONNECT_PROD,
	debug: false,
};

export default dbConfig;