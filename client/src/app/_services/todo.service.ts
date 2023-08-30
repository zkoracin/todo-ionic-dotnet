import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateTodo, Todo } from '../__models/todo.model';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUrl = environment.baseUrl + 'todo';
  private todos: Todo[] = [];
  private todoSrc = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todoSrc.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  createTodo(todo: CreateTodo) {
    return this.http.post<Todo>(this.baseUrl, todo).pipe(
      map(res => {
        this.todos.push(res);
        this.todoSrc.next(this.todos);
      })
    );
  }

  getTodos() {
    return this.http.get<Todo[]>(this.baseUrl).pipe(
      map(res => {
        this.todos = res;
        this.todoSrc.next(this.todos);
      })
    );
  }

  deleteTodo(todoId: number) {
    return this.http.delete(`${this.baseUrl}/${todoId}`).pipe(
      map(_ => {
        this.todos = this.todos.filter(t => t.id !== todoId);
        this.todoSrc.next(this.todos);
      })
    )
  }

  updateTodo(todoId: number, todo: Todo) {
    return this.http.put<Todo>(`${this.baseUrl}/${todoId}`, todo).pipe(
      map(res => {
        const index = this.todos.findIndex(t => t.id === todoId);
        this.todos[index] = res;
        this.todoSrc.next(this.todos);
      })
    );
  }

}
