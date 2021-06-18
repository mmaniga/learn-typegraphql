import { createConnections } from 'typeorm';

import { Book } from '../models/book';


export const connect = async () => {
    console.log("Entering to create connection pool....")
    return await createConnections([
        {
            entities: [
                Book,
            ],
            type: 'postgres',
            host: "localhost",
            port: 5432,
            synchronize: false,
            database: "booksdb",
            logging: true,
            extra: {
                max: 30
            },
        },
    ]).catch((error) => {
        throw new Error(error);
    });
};
