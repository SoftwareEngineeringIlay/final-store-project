import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
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

    this.http.get(`/api/add/${encodedTitle}/${encodedContent}`).subscribe((res: any) => {
      this.tasks = res.tasks;
      this.newTitle = '';
      this.newContent = '';
    });
  }

  fetchTasks() {
    this.http.get('/api/tasks').subscribe((res: any) => {
      this.tasks = res.messages || res.tasks || [];
    });
  }

  deleteTask(title: string) {
    const encodedTitle = encodeURIComponent(title);
    this.http.get(`http://localhost:3000/api/delete/${encodedTitle}`).subscribe((res: any) => {
      this.tasks = res.tasks;
    });
  }

  clearTasks() {
    this.http.get(`http://localhost:3000/api/clear`).subscribe((res: any) => {
      this.tasks = [];
    });
  }
}
