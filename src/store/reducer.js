const states = {
    count: 0
};

/*dispatch的时候state是上一次的数据*/
export function reducer(state = states, action) {
    if (action.type === 'changeCount') {
        state.count = action.value;
        return state
    }
    return state
}