// src/index.ts


import "reflect-metadata";

import {createConnection} from "typeorm";
import {ApolloServer} from "apollo-server";
import {BookResolver} from "./resolvers/BookResolver";
import {buildSchema} from "type-graphql";
import { getConnection } from 'typeorm';
import {connect} from "./database/connect";

async function main() {
    await createConnection();
    //await connect();

    //const pg = require('pg')
    //const pgPool = new pg.Pool({ database: 'booksdb' })

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



   // const server2 = new ApolloServer({ schema:mySchema});
    //await server2.listen(4000);
    console.log("Server has started");
}

main();
