import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Project } from '../domain';
import { map, switchMap, filter, reduce } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';

@Injectable()
export class UserService {
  private readonly domain = 'users';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }

  searchUsers(fil: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, { params: { 'email_like': fil } }).pipe(map(res => res as User[]));
  }

  getUsersByProject(projectId: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, { params: { 'projectId': projectId } }).pipe(map(res => res as User[]));
  }

  addProjectRef(user: User, projectId: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    if (projectIds.indexOf(projectId) > -1) {
      return of(user).pipe(map(res => [res]));
    }
    return this.http.patch(uri, { 'projectIds': [...projectIds, projectId] }).pipe(map(res => res as User[]));
  }

  removeProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    const index = projectIds.indexOf(projectId);
    if (index === -1) {
      return of(user);
    }
    const toUpdate = [...projectIds.slice(0, index), ...projectIds.slice(index + 1)];
    return this.http.patch(uri, { params: { 'projectIds': toUpdate } }).pipe(map(res => res as User));
  }

  batchUpdateProjectRef(project: Project): Observable<User[]> {
    const projectId = project.id;
    const memberIds = project.members ? project.members : [];
    return from(memberIds).pipe(switchMap(id => {
      const uri = `${this.config.uri}/${this.domain}/${id}`;
      return this.http.get(uri).pipe(map(res => res as User)).pipe(filter(user => user.projectIds.indexOf(projectId) === -1)).pipe(switchMap(u => this.addProjectRef(u, projectId))).pipe(reduce((arr, curr) => [...arr, curr], []));
    }));
  }
}
