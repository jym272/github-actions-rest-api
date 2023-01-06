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
    getFile: ()=>getFile,
    closeFile: ()=>closeFile
});
const _fs = /*#__PURE__*/ _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const openFile = async (filePath)=>{
    try {
        const fd = await new Promise((resolve, reject)=>{
            _fs.default.open(filePath, 'a+', (err, fd)=>{
                if (err) {
                    return reject(err);
                }
                resolve(fd);
            });
        });
        return fd;
    } catch (err) {
        console.error(err);
    }
};
const getFile = async (filePath)=>{
    return await openFile(filePath);
};
const closeFile = async (fd)=>{
    try {
        await new Promise((resolve, reject)=>{
            _fs.default.close(fd, (err)=>{
                if (err) {
                    return reject(err);
                }
                resolve(fd);
            });
        });
    } catch (err) {
        console.error(err);
    }
};
