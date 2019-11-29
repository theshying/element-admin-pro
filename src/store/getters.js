const getters = {
    setting: state => state.setting,
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    language: state => state.app.language,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
    permissions: state => state.permission.permissions,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
    errorLogs: state => state.errorLog.logs
};
export default getters;
