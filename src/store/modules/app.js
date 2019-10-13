
const app = {
    state: {
        sidebar: {
            opened: !+localStorage.getItem('sidebarStatus'),
            withoutAnimation: false
        },
        device: 'desktop',
        language: localStorage.getItem('language') || 'en'
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                localStorage.setItem('sidebarStatus', 1);
            } else {
                localStorage.setItem('sidebarStatus', 0);
            }
            state.sidebar.opened = !state.sidebar.opened;
            state.sidebar.withoutAnimation = false;
        },
        CLOSE_SIDEBAR: (state, withoutAnimation) => {
            localStorage.setItem('sidebarStatus', 1);
            state.sidebar.opened = false;
            state.sidebar.withoutAnimation = withoutAnimation;
        },
        TOGGLE_DEVICE: (state, device) => {
            state.device = device;
        },
        SET_LANGUAGE: (state, language) => {
            state.language = language;
            localStorage.setItem('language', language);
        }
    },
    actions: {
        toggleSideBar({commit}) {
            commit('TOGGLE_SIDEBAR');
        },
        closeSideBar({commit}, {withoutAnimation}) {
            commit('CLOSE_SIDEBAR', withoutAnimation);
        },
        toggleDevice({commit}, device) {
            commit('TOGGLE_DEVICE', device);
        },
        setLanguage({commit}, language) {
            commit('SET_LANGUAGE', language);
        }
    }
};

export default app;
