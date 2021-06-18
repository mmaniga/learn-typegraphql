Learning using the tutorial from 
https://blog.logrocket.com/how-build-graphql-api-typegraphql-typeorm/


Input

mutation {
createBook(data: { title: "Birth of Chordic Age 2", author: "Dee Hock" }) {
id
title
}
}


query{
books{
id
title
author
isPublished
}
}
