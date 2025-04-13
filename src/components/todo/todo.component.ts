import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  tasks: string[] = [];
  newTask: string = '';

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then((data: { messages: string[] }) => {
        this.tasks = data.messages;
      })
      .catch(err => console.error('Failed to load tasks:', err));
  }

  processTaskInput() {
    const task = this.newTask.trim();
    if (!task) return;

    fetch('http://localhost:3000/add/' + encodeURIComponent(task))
      .then(res => res.json())
      .then((data: { messages: string[] }) => {
        this.tasks = data.messages;
        this.newTask = '';
      })
      .catch(err => console.error('Failed to add task:', err));
  }
}
