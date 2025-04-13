import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  tasks: string[] = [];

  processTaskInput(value: string) {
    const task = value.trim();
    if (!task) return;

    fetch(`http://localhost:3000/add/${encodeURIComponent(task)}`)
      .then(res => res.json())
      .then((data: { messages: string[] }) => {
        this.tasks = data.messages;
      });
  }
}
