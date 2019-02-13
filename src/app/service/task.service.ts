import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task, TaskList } from '../domain';
import { map, mergeMap, mapTo, reduce } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

@Injectable()
export class TaskService {
  private readonly domain = 'projects';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }

  // POST
  add(task: Task): Observable<Task> {
    task.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.post(uri, JSON.stringify(task)).pipe(map(res => res as Task));
  }

  // PUT
  update(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    const toUpdate = {
      desc: task.desc,
      priority: task.priority,
      dueDate: task.dueDate,
      ownerId: task.ownerId,
      particpantIds: task.participantIds,
      remark: task.remark
    };
    return this.http.patch(uri, JSON.stringify(toUpdate)).pipe(map(res => res as Task));
  }

  // DELETE
  delete(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/taskLists/${task.id}`;
    task.id = null;
    return this.http.delete(uri).pipe(mapTo(task));
  }

  // GET
  get(taskListId: string): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, { params: { 'taskListId': taskListId } }).pipe(map(res => res as Task[]));
  }

  getByLists(lists: TaskList[]): Observable<Task[]> {
    return from(lists).pipe(mergeMap(list => this.get(list.id))).pipe(reduce((tasks: Task[], t: Task[]) => [...tasks, ...t], []));
  }

  complete(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http.patch(uri, { completed: !task.completed }).pipe(map(res => res as Task));
  }

  move(taskId: string, taskListId: string): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}/${taskId}`;
    return this.http.patch(uri, { taskListId: taskListId }).pipe(map(res => res as Task[]));
  }

  moveAll(srcListId: string, targetListId: string): Observable<Task[]> {
    return this.get(srcListId).pipe(mergeMap(tasks => from(tasks))).pipe(mergeMap(task => this.move(task.id, targetListId))).pipe(reduce((arr, x) => [...arr, x], []));
  }
}
