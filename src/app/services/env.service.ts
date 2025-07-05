import {inject, Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Config} from "../domain/models/envConfig";

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  public config!: Config;

  private readonly storage: Storage = inject(Storage);
  private readonly URL_KEY: string = 'url';
  private readonly EMPTY_URL: string = 'configuration not set';
  private _isInitialized: boolean;

  constructor() {
    this._isInitialized = false;
    this.init();
    this.loadConfig();
  }

  async init(): Promise<void> {
    if (!this._isInitialized) {
      await this.storage.create();
      this._isInitialized = true;
      console.log('Storage database created successfully!');
    }
  }

  async loadConfig(): Promise<void> {
    const config: Config = await this.storage.get(this.URL_KEY) || null;
    if (config == null) {
      await this.storage.set(this.URL_KEY, new Config(this.EMPTY_URL));
      this.config = await this.storage.get(this.URL_KEY) || null;
    } else {
      this.config = config;
    }
  }

  public saveConfig(url: string): void {
    const newURL: Config = new Config(url);
    this.storage.set(this.URL_KEY, newURL)
      .then(
        (): void => console.log('Config saved successfully'),
        error => console.error('Error saving config:', error)
      );
  }

  public deleteConfig(): void {
    this.storage.remove(this.URL_KEY)
      .then(
        data => console.log(data),
        error => console.error(error)
      );
    this.loadConfig();
  }
}
