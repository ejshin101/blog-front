import { createStore } from 'vuex';

export default createStore({
    state: {
        reRenderFlag: { shouldReRender: false },
    },
    mutations: {
        setReRenderFlag(state, value) {
            state.reRenderFlag.shouldReRender = value;
        },
    },
});