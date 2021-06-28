import {Resolver, Query, Arg, Mutation, Ctx} from "type-graphql";
import {Book} from "../models/Book";
import {UpdateBookInput} from "../inputs/UpdateBookInput";
import {CreateBookInput} from "../inputs/CreateBookInput";
import {Connection, getConnection, getRepository} from "typeorm";

import { createConnection } from 'typeorm';
import {ContextParamMetadata} from "type-graphql/dist/metadata/definitions";

@Resolver()
export class BookResolver {
    @Query( () => [Book])
    async books(@Ctx("db") db: Connection,
                @Ctx("name") name: String) {
        console.log("Getting here...what happens to connections..")
        console.log(`Connection Name ${Book.getRepository().manager.connection.name}`);
        console.log(name);
       //console.log(db.toString());
        return db.getRepository(Book).find();
        //return Book.find();
        //return getRepository(Book).find();
        //const conn = await getConnection();
        //return conn.getRepository(Book).find();
        // b.find();
        //console.log(`Connection Name ${Book.getRepository().manager.connection.name}`);
    }

    @Query( () => Book)
    book( @Arg("id") id:string) {
        return Book.findOne({where:{id}})
    }

    @Mutation (() => Book)
    async createBook(@Arg("data") data :CreateBookInput) {
        console.log("Entering the book creation logic");
        const book = Book.create(data);
        await book.save();
        return book;
    }

    @Mutation( () => Book)
    async updateBook(@Arg("id") id:string, @Arg("data") data:UpdateBookInput) {
        const book = await Book.findOne({where:{id}});
        if(!book) throw new Error("Book Not Found");
        Object.assign(book,data);
        await book.save();
        return book;
    }

    @Mutation(() => Boolean)
    async deleteBook(@Arg("id") id:string) {
        const book = await Book.findOne({where:{id}});
        if(!book) throw new Error("Book Not Found");
        await book.remove();
        return true;
    }

}
