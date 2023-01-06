"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _express = /*#__PURE__*/ _interopRequireDefault(require("express"));
const _db = require("./db/index");
const _utils = require("./utils/index");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = (0, _express.default)();
app.use(_express.default.json());
app.get('/', (req, res)=>{
    res.send('Hello there!');
});
app.get('/crash-server', (req, res)=>{
    res.send('Crashing server!');
    process.exit(1);
});
app.get('/health', (req, res)=>{
    res.send('OK');
});
app.get('/env', (req, res)=>{
    res.send(process.env);
});
app.get('/get', async (req, res)=>{
    const people = await _db.db.find({}).toArray();
    res.json(people);
});
app.post('/save', async (req, res)=>{
    const { name , age  } = req.body;
    const person = {
        name,
        age
    };
    await _db.db.insertOne(person);
    res.json({
        message: 'Person saved.'
    });
});
app.delete('/delete/:id', async (req, res)=>{
    const { id  } = req.params;
    await _db.db.deleteOne({
        _id: id
    });
    res.json({
        message: 'Person deleted.'
    });
});
const PORT = (0, _utils.getEnv)('PORT');
app.listen(PORT, async ()=>{
    await (0, _db.connectMongodb)();
    const rocketshipEmoji = String.fromCodePoint(0x1f680);
    console.log('\x1b[32m%s\x1b[0m', `${rocketshipEmoji} Server is running on port ${PORT}`);
});
