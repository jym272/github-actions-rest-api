#!/usr/bin/env bash


# save object person={name, age} to localhost:3000/save
curl -X POST -H "Content-Type: application/json" -d '{"name":"John", "age": 30}' http://localhost:3000/save