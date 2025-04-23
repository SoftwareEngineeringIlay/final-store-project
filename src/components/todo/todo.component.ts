import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Task { 
  _id?: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  newTitle   = '';
  newContent = '';
  tasks: Task[] = [];

  // ── EDIT MODE STATE ──────────────────────────
  editingOldTitle: string | null = null;
  editingTitle: string = '';
  editingContent: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.http.get<{ tasks: Task[] }>('/api/tasks')
      .subscribe(res => this.tasks = res.tasks);
  }

  addTask() {
    if (!this.newTitle.trim() || !this.newContent.trim()) {
      alert('Please enter title and content.');
      return;
    }
    this.http.post<Task>('/api/tasks', {
      title:   this.newTitle.trim(),
      content: this.newContent.trim()
    }).subscribe(_ => {
      this.newTitle = '';
      this.newContent = '';
      this.fetchTasks();
    });
  }

  deleteTask(title: string) {
    this.http.delete<{ message: string }>(`/api/tasks/${encodeURIComponent(title)}`)
      .subscribe(_ => this.fetchTasks());
  }

  clearTasks() {
    this.http.delete<{ message: string }>('/api/tasks')
      .subscribe(_ => this.tasks = []);
  }

  // ── EDIT MODE HANDLERS ────────────────────────

  startEdit(task: Task) {
    this.editingOldTitle = task.title;       // mark which one we’re editing
    this.editingTitle    = task.title;       // prefill inputs
    this.editingContent  = task.content;
  }

  cancelEdit() {
    this.editingOldTitle = null;
    this.editingTitle = '';
    this.editingContent = '';
  }

  saveEdit() {
    if (!this.editingTitle.trim() || !this.editingContent.trim()) {
      alert('Title and content cannot be empty.');
      return;
    }
    // send PUT to your existing update route
    this.http.put<Task>(
      `/api/tasks/${encodeURIComponent(this.editingOldTitle!)}`,
      {
        newTitle:   this.editingTitle.trim(),
        newContent: this.editingContent.trim()
      }
    ).subscribe(_ => {
      this.cancelEdit();
      this.fetchTasks();
    });
  }
}
