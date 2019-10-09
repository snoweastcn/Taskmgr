import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../domain';
import { map, mergeMap, count, switchMap, mapTo } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

@Injectable()
export class ProjectService {
  private readonly domain = 'projects';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }

  // POST
  add(project: Project): Observable<Project> {
    project.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.post(uri, project).pipe(map(res => res as Project));
  }

  // PUT
  update(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg
    };
    return this.http.patch(uri, toUpdate).pipe(map(res => res as Project));
  }

  // DELETE
  delete(project: Project): Observable<Project> {
    const delTasks$ = from(project.taskLists ? project.taskLists : []).pipe(mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`))).pipe(count());
    return delTasks$.pipe(switchMap(_ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`))).pipe(mapTo(project));
  }

  // GET
  get(userId: string): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, { params: { 'members_like': userId } }).pipe(map(res => res as Project[]));
  }
}
