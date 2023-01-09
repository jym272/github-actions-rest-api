#!/usr/bin/env bash


# save object person={name, age} to localhost:3000/save
curl -X POST -H "Content-Type: application/json" -d '{"name":"John", "age": 30}' http://localhost:3000/save


# token generated manually
token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZWxldGUiOnRydWUsImlhdCI6MTY3MzI3OTQ2NywiZXhwIjoxNjczMzY1ODY3fQ.u1L0OYuNgf32aIxhsqu3GcnyL-uRqv1k-fxMMlprf1g
echo $token

# delete object with authorization header token DELETE METHOD in /delete-people-collection
curl -X DELETE -H "Authorization: Bearer $token" http://localhost:3000/delete-people-collection