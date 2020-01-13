export function toObject(arr) {
    return arr.reduce((prev, next) => {
        prev[next.id] = next;
        if (next.children && next.children.length) {
            prev = {
                ...prev,
                ...toObject(next.children)
            }
            // prev[next.id].children = toObject(next.children)
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