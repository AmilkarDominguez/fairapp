import {inject, Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular";
import {Colors} from "../domain/emums/colors";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly _toastController: ToastController = inject(ToastController);

  async presentToast(message: string, color: Colors): Promise<void> {
    const toast: HTMLIonToastElement = await this._toastController.create({
      color: color,
      message: message,
      position: "top",
      duration: 1500
    });
    await toast.present();
  }

  async presentToast2(position: 'top' | 'middle' | 'bottom') {
    const toast = await this._toastController.create({
      message: 'Hello World!',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}
