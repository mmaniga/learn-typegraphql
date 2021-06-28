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



To check the number of commentions opened


select pid as process_id,
usename as username,
datname as database_name,
client_addr as client_address,
application_name,
backend_start,
state,
state_change
from pg_stat_activity;


Without the 

extra: {
max: 30,
idleTimeoutMillis:0
},

The connections are getting back...


run pgbounce 

pgbouncer -q /opt/homebrew/etc/pgbouncer.ini
