import { Component,Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Config,Shared } from 'ng2-ui-auth';
import {
  Http,
  RequestMethod,
  Response,
  RequestOptionsArgs,
  Headers,
  Request,
  RequestOptions,
  ConnectionBackend
} from '@angular/http';

import 'rxjs/add/operator/share';

@Injectable()
export class FileUploadService {
  /**
   * @param Observable<number>
   */
  //private progress$: Observable<number>;
  private progress$: Observable<any>;

  /**
   * @type {number}
   */
  private progress: number = 0;

  private progressObserver: any;

  constructor (private _shared: Shared,
               private _config: Config) {
    this.progress$ = new Observable(observer => {
      this.progressObserver = observer
    });
  }

  /**
   * @returns {Observable<number>}
   */
  public getObserver (): Observable<number> {
    return this.progress$;
  }

  /**
   * Upload files through XMLHttpRequest
   *
   * @param url
   * @param files
   * @returns {Promise<T>}
   */
  public upload (url: string, name: string, is_active: boolean, files: File[]): Promise<any> {
    return new Promise((resolve, reject) => {
      let formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i].name);
      }

      formData.append("is_active",is_active);
      formData.append("name",name);

      console.log("File Upload Auth Header ",this._config.authHeader);
      console.log("File Upload Auth Token ",this._config.authToken + ' ' + this._shared.getToken());


      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      FileUploadService.setUploadUpdateInterval(500);



      xhr.upload.onprogress = (event) => {
        this.progress = Math.round(event.loaded / event.total * 100);

        this.progressObserver.next(this.progress);
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader(this._config.authHeader,this._config.authToken + ' ' + this._shared.getToken());
      xhr.send(formData);
    });
  }

  /**
   * Set interval for frequency with which Observable inside Promise will share data with subscribers.
   *
   * @param interval
   */
  private static setUploadUpdateInterval (interval: number): void {
    setInterval(() => {}, interval);
  }


}
