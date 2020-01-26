const fs = require('fs').promises;
const fs1 = require('fs');
const {join} = require('path');
const uuidv4 = require('uuid/v4');
const files = {
    /*读取*/
    async readDir(path) {
        const dir = await fs.readdir(path);
        return dir.map(async item => {
            const stats = await fs.stat(join(path, item));
            const obj = Object.create(null);
            obj.name = item;
            obj.id = uuidv4();
            obj.isOpen = false;
            obj.path = join(path, item);
            if (stats.isFile()) {
                obj.type = 'file';
            } else if (stats.isDirectory()) {
                obj.type = 'dir';
                obj.children = await Promise.all(await this.readDir(join(path, item)));
            }
            return obj
        });

    },

    readFile(path) {
        return fs.readFile(path, 'utf8')
    },

    writeFile(path, content) {
        return fs.writeFile(path, content)
    },

    /*删除文件*/
    unlink(link) {
        return fs.unlink(link);
    },
    /*重命名*/
    rename(oldPath, newPath) {
        return fs.rename(oldPath, newPath)
    },
    /*删除目录*/
    rmdir(path) {
        const files = fs1.readdirSync(path);
        files.forEach(file => {
            let curPath = join(path, file);
            if (fs1.statSync(curPath).isDirectory()) {
                this.rmdir(curPath);
            } else {
                fs1.unlinkSync(curPath);
            }
        });
        fs1.rmdirSync(path);
    }
};

export default files;
