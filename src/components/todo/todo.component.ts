import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  tasks: string[] = [];

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then((data: { messages: string[] }) => {
        this.tasks = data.messages;
      });
  }

  processTaskInput(value: string) {
    const task = value.trim();
    if (!task) return;
    
    fetch('http://localhost:3000/add/' + encodeURIComponent(task))
      .then(res => res.json())
      .then((data: { messages: string[] }) => {
        this.tasks = data.messages;
      });
  }
}
