// 商城 Vuex-action
export default {
    saveUserName(context, username){
        context.commit('saveUserName', username);
    },
    saveCartCount(context, count){
        context.commit('saveCartCount', count);
    }
}