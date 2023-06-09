export default {
    namespaced: true,
    state: {
        toasts: [],
        // toastMessage: '',
        // toastAlertType: '',
        // showToast: true,
    },
    mutations: {
        ADD_TOAST (state, payload) {
            state.toasts.push(payload);
        },
        REMOVE_TOAST (state) {
            state.toasts.shift();
        },
        // UPDATE_TOAST_MESSAGE (state, payload) {
        //     state.toastMessage = payload;
        // },
        // UPDATE__TOAST_ALERT_TYPE (state, payload) {
        //     state.toastAlertType = payload;
        // },
        // UPDATE_TOAST_STATUS (state, payload) {
        //     state.showToast = payload;
        // },
    },
    actions: {
        triggerToast({commit}, payload) {
            // commit('UPDATE_TOAST_MESSAGE', payload.message);
            // commit('UPDATE__TOAST_ALERT_TYPE', payload.type);
            // commit('UPDATE_TOAST_STATUS', true);

            commit('ADD_TOAST', {
                id: Date.now(),
                message: payload.message,
                type: payload.type
            });

            setTimeout(() => {
                // commit('UPDATE_TOAST_MESSAGE', '');
                // commit('UPDATE__TOAST_ALERT_TYPE', '');
                // commit('UPDATE_TOAST_STATUS', false);
                commit('REMOVE_TOAST');
            }, 3000);
          },
    },
    getters: {
        toastMessageWithSmile(state) {
            return state.toastMessage + '^_^';
        }
    }
}