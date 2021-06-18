import {InputType,Field} from "type-graphql";

@InputType()
export class UpdateBookInput {
    @Field()
    title?:string;

    @Field({nullable:true})
    author?:string;

    @Field({nullable:true})
    isPublished?:boolean;
}
