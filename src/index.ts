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

    await createConnection(
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
                max: 30,
            }
        }).then((a)=> {
        console.log("Established connections");
    });


    const mySchema = await buildSchema({
        resolvers : [BookResolver]
    });

    const server = new ApolloServer({
        schema: mySchema,
        context:  () => {
            const db = getConnection();
            const name = "Mani";
            return   {db,name};
        }
    }
    );
    server.listen(4000);


  console.log("Server has started");
}


main();
