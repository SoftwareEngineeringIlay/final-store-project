import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  processTaskInput() {
    const inputEl = document.getElementById('todo-input') as HTMLInputElement;
    const task = inputEl.value.trim();
    if (!task) return;

    // call the server to add the task
    fetch('http://localhost:3000/add/' + encodeURIComponent(task))
      .then(res => res.json())
      .then((data: any) => {
        this.updateTodoList(data.tasks || data.messages || data);
        inputEl.value = '';
      });
  }

  updateTodoList(data: any) {
    const todoList = document.getElementById('todo-list')!;
    todoList.innerHTML = '';
    // data could be { tasks: [...] } or { messages: [...] } or just an array
    const items: any[] = data.tasks || data.messages || data;
    for (const t of items) {
      const par = document.createElement('p');
      // if it's a string:
      if (typeof t === 'string') {
        par.textContent = t;
      } else if (t.title && t.content) {
        // if it's an object with title/content
        par.innerHTML = `<strong>${t.title}</strong>: ${t.content}`;
      } else {
        par.textContent = JSON.stringify(t);
      }
      todoList.appendChild(par);
    }
  }
}
