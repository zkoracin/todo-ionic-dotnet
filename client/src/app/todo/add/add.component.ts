import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { Todo } from 'src/app/__models/todo.model';
import { TodoService } from 'src/app/_services/todo.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class AddComponent  implements OnInit {

  modalTitle = 'Add new todo';
  todo?: Todo;
  form: FormGroup = new FormGroup({});
  categories: string[] = [];

  constructor(
    private modalCtrl: ModalController,
    private todoSer: TodoService,
    private fb: FormBuilder,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    let title = '';

    if(this.todo) {
      this.modalTitle = 'Update Todo';
      title = this.todo.title;
    }

    this.form = this.fb.group({
      title: [title, Validators.required],
    });
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newTodo = this.form.value;

    if (this.todo) {
      this.todoSer.updateTodo(this.todo.id, newTodo)
        .subscribe(res => this.createToast('Todo item was updated'));
    } else {
      this.todoSer.createTodo(newTodo)
        .subscribe(res => this.createToast('Todo item was created'));
    }
    this.modalCtrl.dismiss();
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
