const setting = {
    state: {
        theme: '#cccccc',
        showLogo: false,
        multiTab: false,
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