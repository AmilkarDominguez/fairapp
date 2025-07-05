import {Component, inject, OnInit} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {EnvService} from "../../services/env.service";

@Component({
    selector: 'app-modal-config',
    standalone: true,
    templateUrl: './modal-config.component.html',
    styleUrls: ['./modal-config.component.scss'],
    imports: [IonicModule, FormsModule],
})
export class ModalConfigComponent implements OnInit {

    private modalCtrl: ModalController = inject(ModalController);
    private readonly envService: EnvService = inject(EnvService);
    public url!: string;

    constructor() {
    }

    public ngOnInit(): void {
        this._loadConfig();
    }

    private _loadConfig(): void {
        this.envService.loadConfig().then((): void => {
            this.url = this.envService.config.url;
        }).catch(error => {
            console.warn('Error loading config:', error);
        });
    }

    public confirm(): void {
        this.envService.saveConfig(this.url);
        this.modalCtrl.dismiss(this.url, 'confirm');
    }
}
