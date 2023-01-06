"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _express = /*#__PURE__*/ _interopRequireDefault(require("express"));
const _fs = /*#__PURE__*/ _interopRequireDefault(require("fs"));
const _fileHandlers = require("./fileHandlers/index");
const _path = /*#__PURE__*/ _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const folderName = process.env.FOLDER_NAME ?? 'poems';
const fileName = process.env.FILE_NAME ?? 'poems.txt';
const folderPath = _path.default.join(__dirname, folderName);
if (!_fs.default.existsSync(folderPath)) {
    console.log('Creating poems folder...');
    _fs.default.mkdirSync(folderPath);
}
const filePath = _path.default.join(__dirname, folderName, fileName);
const app = (0, _express.default)();
app.use(_express.default.json());
app.post('/new-poem', async (req, res)=>{
    const poemSeparator = '\n***\n';
    const { title , text  } = req.body;
    const poem = `${title}\n\n${text}\n${poemSeparator}`;
    const fd = await (0, _fileHandlers.getFile)(filePath);
    return _fs.default.appendFile(fd, poem, async (err)=>{
        if (err) throw err;
        console.log('The poem was appended to file!');
        await (0, _fileHandlers.closeFile)(fd);
        res.send('The poem was appended to file!');
    });
});
app.get('/poems', async (req, res)=>{
    try {
        const fd = await (0, _fileHandlers.getFile)(filePath);
        return _fs.default.readFile(fd, 'utf8', async (err, data)=>{
            if (err) throw err;
            console.log('The file has been read!');
            await (0, _fileHandlers.closeFile)(fd);
            res.send(data);
        });
    } catch (e) {
        console.log(e);
        const error = e;
        return res.send(error.message).status(500);
    }
});
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
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, ()=>{
    const rocketshipEmoji = String.fromCodePoint(0x1f680);
    console.log('\x1b[32m%s\x1b[0m', `${rocketshipEmoji} Server is running on port ${PORT}`);
});
