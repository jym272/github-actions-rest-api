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
const _utils = require("../utils/index");
const username = (0, _utils.getEnv)('MONGO_INITDB_USERNAME');
const password = (0, _utils.getEnv)('MONGO_INITDB_PASSWORD');
const cluster = (0, _utils.getEnv)('MONGO_CLUSTER');
const dbName = (0, _utils.getEnv)('MONGO_INITDB_DATABASE');
const uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;
const client = new _mongodb.MongoClient(uri);
const db = client.db(dbName).collection('people');
const connectMongodb = async ()=>{
    await client.connect();
    console.log('Connected successfully to server');
};
