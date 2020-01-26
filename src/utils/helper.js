export function toObject(arr) {
    return arr.reduce((prev, next) => {
        prev[next.id] = next;
        if (next.children && next.children.length) {
            /*prev = {
                ...prev,
                ...toObject(next.children)
            }*/
            prev[next.id].children = toObject(next.children)
        }
        return prev;
    }, {})
}

export function toArray(obj) {
    return Object.keys(obj).map(item => {
        if (obj[item].children) {
            obj[item].children = toArray(obj[item].children)
        }
        return obj[item]
    })
}


export function redact(obj, id, cb) {
    (function lambda(obj) {
        for (let key in obj) {
            if (key === id) {
                const result = cb(obj[key]);
                if (!result) {
                    delete obj[key]
                } else {
                    if (result.new) {
                        obj[key].children = {
                            ...obj[key].children,
                            [result.id]: result
                        }
                    } else {
                        obj[key] = result
                    }

                }
                return obj
            } else {
                obj[key].children && lambda(obj[key].children)
            }
        }
    })(obj);
    return obj
}