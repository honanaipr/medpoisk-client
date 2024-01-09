
import { toastController } from '@ionic/vue'

export default function showToast(message) {
  toastController
    .create({
      message: message,
      duration: 1500,
      position: 'bottom',
      cssClass: 'toast-custom-class'
    })
    .then((toast) => {
      toast.present()
    })
}
