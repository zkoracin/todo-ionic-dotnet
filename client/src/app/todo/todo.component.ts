import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { TodoService } from '../_services/todo.service';
import { Todo } from '../__models/todo.model';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { LoadingService } from '../_services/loading.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class TodoComponent  implements OnInit {

  constructor(
    public todoSer: TodoService,
    public loadingSer: LoadingService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    this.todoSer.getTodos()
      .subscribe(() => this.createToast("Todo list ready! Have fun") );
  }
  
  onCreate() {
    this.createModal();
  }

  onEdit(todo: Todo) {
    this.createModal(todo);
  }

  onDelete(todoId: number) {
    this.todoSer.deleteTodo(todoId)
      .subscribe(() => this.createToast("Todo item was deleted"));
  }

  private async createModal(todoUpdate?: Todo) {
    const modal = await this.modalCtrl.create({
      component: AddComponent,
      componentProps: {
        todo: todoUpdate
      }
    });
    modal.onDidDismiss();
    return await modal.present();
  }

  private async createToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
}
