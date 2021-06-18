import {Resolver, Query, Arg, Mutation} from "type-graphql";
import {Book} from "../models/Book";
import {UpdateBookInput} from "../inputs/UpdateBookInput";
import {CreateBookInput} from "../inputs/CreateBookInput";
import {connect} from "../database/connect";
import {getConnection} from "typeorm";

@Resolver()
export class BookResolver {
    @Query( () => [Book])
    books() {
        console.log("Getting here...what happens to connections..")
        return Book.find();
    }

    @Query( () => Book)
    book(@Arg("id") id:string) {
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
