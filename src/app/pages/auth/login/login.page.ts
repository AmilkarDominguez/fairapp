import {Component, inject, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ModalConfigComponent} from "../../../components/modal-config/modal-config.component";
import {ToastService} from "../../../services/toast.service";
import {Colors} from "../../../domain/emums/colors";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {


  url: string = "https"

  public inputType: string = "password";
  public passwordIcon: string = "eye";

  private readonly _modalCtrl: ModalController = inject(ModalController);
  private readonly _toastService: ToastService = inject(ToastService);


  constructor() {
  }

  public ngOnInit(): void {
    console.log('LoginPage initialized');
  }

  public login(form: any): void {

  }

  public showPassword(): void {
    if (this.inputType == "password") {
      this.inputType = "text"
      this.passwordIcon = "eye-off"
    } else {
      this.inputType = "password"
      this.passwordIcon = "eye"
    }
  }


  public async openModal(): Promise<void> {
    const modal: HTMLIonModalElement = await this._modalCtrl.create({
      component: ModalConfigComponent,
    });

    await modal.present();

    const {data, role} = await modal.onWillDismiss();

    if (role === 'confirm') {
      await this._toastService.presentToast(`URL configurada: ${data}`, Colors.SUCCESS);
    }
  }
}
