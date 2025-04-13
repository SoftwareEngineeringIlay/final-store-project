import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent {
  newTitle: string = '';
  newContent: string = '';
  tasks: any[] = [];

  constructor(private http: HttpClient) {
    this.fetchTasks();
  }
  
  ngOnInit() {
    this.fetchTasks();
  }

  addTask() {
    if (!this.newTitle.trim() || !this.newContent.trim()) {
      alert('Please enter title and content.');
      return;
    }

    const encodedTitle = encodeURIComponent(this.newTitle);
    const encodedContent = encodeURIComponent(this.newContent);

    this.http.get(`http://localhost:3000/add/${encodedTitle}/${encodedContent}`).subscribe((res: any) => {
      this.tasks = res.tasks;
      this.newTitle = '';
      this.newContent = '';
    });
  }

  fetchTasks() {
    this.http.get('http://localhost:3000/tasks').subscribe((res: any) => {
      this.tasks = res.messages || res.tasks || [];
    });
  }
}
