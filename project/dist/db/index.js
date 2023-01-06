"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    db: ()=>db,
    connectMongodb: ()=>connectMongodb
});
const _mongodb = require("mongodb");
const username = 'rest-api-user';
const password = 'manzana';
const cluster = 'cluster0.hhxxk.mongodb.net';
const uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;
const client = new _mongodb.MongoClient(uri);
const db = client.db('rest-api').collection('people');
const connectMongodb = async ()=>{
    await client.connect();
    console.log('Connected successfully to server');
};
