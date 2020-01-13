const fs = require('fs').promises;
const {join} = require('path');
const uuidv4 = require('uuid/v4');
const files = {
    /*读取*/
    async readDir(path) {
        console.log(path)
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

    /*删除*/
    unlink(link) {
        return fs.unlink(link);
    },
    /*重命名*/
    rename(oldName, newName) {
        return fs.rename(oldName, newName)
    }
};

export default files;
