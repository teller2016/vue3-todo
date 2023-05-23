import { ref, onUnmounted } from "vue";

export const useToast = () => {
  // toast
  const showToast = ref(false);
  const toastMessage = ref("");
  const toastAlertType = ref("");
  const toastTimerId = ref(0);

  onUnmounted(() => {
    clearTimeout(toastTimerId.value);
  });

  // Toast 노출
  const triggerToast = (message, type = "success") => {
    toastMessage.value = message;
    showToast.value = true;
    toastAlertType.value = type;

    toastTimerId.value = setTimeout(() => {
      toastMessage.value = "";
      showToast.value = false;
      toastAlertType.value = "";
    }, 3000);
  };

  return {
    showToast,
    toastMessage,
    triggerToast,
  };
};
