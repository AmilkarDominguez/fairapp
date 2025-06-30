import {Component, inject, OnInit} from '@angular/core';
import {EnvService} from "../../services/env.service";

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: false,
})
export class ConfigPage implements OnInit {

  private readonly envService: EnvService = inject(EnvService);
  public url!: string;

  constructor() {
  }

  public ngOnInit(): void {
    console.log('ConfigPage initialized');
    this._loadConfig();
  }

  private _loadConfig(): void {
    this.envService.loadConfig().then(() => {
      this.url = this.envService.config.url;
    }).catch(error => {
      console.warn('Error loading config:', error);
    });
  }

  public saveURL(): void {
    this.envService.saveConfig(this.url);
  }
}
