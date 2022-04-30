import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import {Request, Response} from 'express';

export default interface DataContext  {
	em: EntityManager<IDatabaseDriver<Connection>>;
	req: Request;
	res: Response;
};
