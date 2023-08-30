import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private toast: any;

  constructor(
    private toastCtr: ToastController,
  ) { }

  handleDefault() {
    this.showToast('Something wrong');
  }

  handle400() {
   this.showToast('Some client side error');
  }

  handle404() {
    this.showToast('Not found');
  }

  handle500() {
    this.showToast('Something went wrong please try again');
  }

  private showToast(msg: string) {
    this.toast = this.toastCtr.create({
      message: msg,
      duration: 2000,
      cssClass: 'custom-toast'
    }).then(toastData => toastData.present());
  } 
}