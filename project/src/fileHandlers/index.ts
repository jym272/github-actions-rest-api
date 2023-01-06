import fs, { PathOrFileDescriptor } from 'fs';

const openFile = async (filePath: string) => {
  try {
    const fd: PathOrFileDescriptor = await new Promise((resolve, reject) => {
      fs.open(filePath, 'a+', (err, fd) => {
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

export const getFile = async (filePath: string) => {
  return (await openFile(filePath)) as PathOrFileDescriptor;
};

export const closeFile = async (fd: PathOrFileDescriptor) => {
  try {
    await new Promise((resolve, reject) => {
      fs.close(fd as number, err => {
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
