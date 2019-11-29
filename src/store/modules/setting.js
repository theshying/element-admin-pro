const setting = {
    state: {
        theme: '#cccccc',
        showLogo: true,
        multiTab: true,
        fixHeader: true,
    },
    mutations: {
        SET_SETTING: (state, setting) => {
            state.setting = setting;
        }
    },
    actions: {
        setSetting({ commit }, setting) {
            commit('SET_SETTING', setting);
        }
    }
}

export default setting