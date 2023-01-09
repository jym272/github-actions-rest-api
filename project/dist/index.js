"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _express = /*#__PURE__*/ _interopRequireDefault(require("express"));
const _db = require("./db/index");
const _utils = require("./utils/index");
const _jsonwebtoken = /*#__PURE__*/ _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = (0, _express.default)();
const secret = (0, _utils.getEnv)('JWT_SECRET');
// const permission = {
//   delete: true
// };
// const options = {
//   expiresIn: '1d'
// };
// // Generate the JWT
// const token = jwt.sign(permission, secret, options);
// console.log(token)
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
app.delete('/delete-people-collection', async (req, res)=>{
    const rawToken = req.headers.authorization;
    if (!rawToken) {
        res.status(401).json({
            message: 'Unauthorized.'
        });
        return;
    }
    let token = rawToken;
    if (rawToken.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    let decoded;
    try {
        decoded = _jsonwebtoken.default.verify(token, secret);
        console.log('DECODED', decoded);
    } catch (err) {
        console.log('ERROR', err);
        res.status(401).json({
            message: 'Unauthorized.'
        });
        return;
    }
    const permissions = JSON.parse(JSON.stringify(decoded));
    if (permissions.exp < Math.floor(Date.now() / 1000) || !permissions.delete) {
        res.status(401).json({
            message: 'Unauthorized.'
        });
        return;
    }
    await _db.db.drop();
    res.json({
        message: 'Collection deleted.'
    });
});
const PORT = (0, _utils.getEnv)('PORT');
app.listen(PORT, async ()=>{
    await (0, _db.connectMongodb)();
    const rocketshipEmoji = String.fromCodePoint(0x1f680);
    console.log('\x1b[32m%s\x1b[0m', `${rocketshipEmoji} Server is running on port ${PORT}`);
});
