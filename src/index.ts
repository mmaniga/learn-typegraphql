// src/index.ts


import "reflect-metadata";

import {createConnection, createConnections} from "typeorm";
import {ApolloServer} from "apollo-server";
import {BookResolver} from "./resolvers/BookResolver";
import {buildSchema} from "type-graphql";
import { getConnection } from 'typeorm';
import {connect} from "./database/connect";
import {Book} from "./models/Book";

async function main() {
    await createConnections([
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
    ]);

    const mySchema = await buildSchema({
        resolvers : [BookResolver]
    });

    const server = new ApolloServer({
        context: ({ req }) => {
            const booksdb = getConnection();
            return { booksdb };
            // How do i pass this booksdb to the BooksResolver if i uncomment the connect call up which uses pool
        },
        schema:mySchema
    });
    server.listen(4000);


   console.log("Server has started");
}


main();
