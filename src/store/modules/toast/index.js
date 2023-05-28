export default {
    namespaced: true,
    state: {
        toastMessage: '',
        toastAlertType: '',
        showToast: false,
        toastTimerId: null,
    },
    mutations: {
        UPDATE_TOAST_MESSAGE (state, payload) {
            state.toastMessage = payload;
        },
        UPDATE__TOAST_ALERT_TYPE (state, payload) {
            state.toastAlertType = payload;
        },
        UPDATE_TOAST_STATUS (state, payload) {
            state.showToast = payload;
        },
    },
    actions: {
        triggerToast({commit}, message, type = "success") {
            commit('UPDATE_TOAST_MESSAGE', message);
            commit('UPDATE__TOAST_ALERT_TYPE', type);
            commit('UPDATE_TOAST_STATUS', true);

            setTimeout(() => {
                commit('UPDATE_TOAST_MESSAGE', '');
                commit('UPDATE__TOAST_ALERT_TYPE', '');
                commit('UPDATE_TOAST_STATUS', false);
            }, 3000);
          },
    },
    getters: {
        toastMessageWithSmile(state) {
            return state.toastMessage + '^_^';
        }
    }
}