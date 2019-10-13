const getters = {
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    language: state => state.app.language,
    visitedViews: state => state.setting.visitedViews,
    cachedViews: state => state.setting.cachedViews,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
    errorLogs: state => state.errorLog.logs
};
export default getters;
