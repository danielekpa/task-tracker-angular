import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private tasksService: TaskService) { }

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  addTask(task: Task) { 
    console.log(task);
    this.tasksService.addTask(task).subscribe((newTask) => this.tasks.push(newTask));
  }

  deleteTask(task: Task) {
    console.log('deelete');
    console.log(task);

    this.tasksService.deleteTask(task).subscribe(() => this.tasks = this.tasks.filter(t => t.id !== task.id));
  }

  toggleTask(task: Task) {
    task.reminder = !task.reminder;
    
    console.log(task.reminder);
    this.tasksService.updateTaskReminder(task).subscribe();
  }
}
