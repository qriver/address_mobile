import { Toast, Dialog } from 'vant';
import 'vant/lib/toast/style';
import 'vant/lib/dialog/style';
import '../style/my-icon.css';
const $toast = {
  alert(message, duration) {
    Toast({
      message,
      duration
    });
  },
  loading(message, duration) {
    Toast.loading({
      message,
      forbidClick: false,
      duration
    });
  },
  close() {
    Toast.clear();
  },
  success(message, duration) {
    Toast.success({
      message,
      icon: 'success',
      iconPrefix: 'my-icon',
      forbidClick: false,
      duration
    });
  },
  fail(message, duration) {
    Toast.fail({
      message,
      icon: 'tanhao',
      iconPrefix: 'my-icon',
      forbidClick: false,
      duration
    });
  }
};

function $dialog(title, message) {
  return Dialog.confirm({
    title: title,
    message: message
  });
}

export { $dialog, $toast };
