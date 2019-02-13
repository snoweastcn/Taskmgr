import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { slideAnim } from 'src/app/anims/router.anim';
import { listAnim } from 'src/app/anims/list.anim';
import { ProjectService } from 'src/app/service/project.service';
import * as _ from 'lodash';
import { filter, switchMap, map, take } from 'rxjs/operators';
import { Project } from 'src/app/domain';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    slideAnim,
    listAnim
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, OnDestroy {
  @HostBinding('@routeAnim') state;
  projects: Project[];
  sub: Subscription;
  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private service$: ProjectService) { }

  ngOnInit() {
    this.sub = this.service$.get('1').subscribe(projects => {
      this.projects = projects;
      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      console.log(1);
      this.sub.unsubscribe();
    }
  }

  openNewProjectDialog() {
    const selectedImg = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { thumbnails: this.getThumbnails(), img: selectedImg } });
    dialogRef.afterClosed().pipe(take(1)).pipe(filter(n => n)).pipe(map(val => ({ ...val, coverImage: this.buildImgSrc(val.coverImage) }))).pipe(switchMap(v => this.service$.add(v))).subscribe(project => {
      this.projects = [...this.projects, project];
      this.cd.markForCheck();
    });
  }

  lanchInviteDialog() {
    this.dialog.open(InviteComponent);
  }

  launchUpdateDialog(project: Project) {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { thumbnails: this.getThumbnails(), project: project } });
    dialogRef.afterClosed().pipe(take(1)).pipe(filter(n => n)).pipe(map(val => ({ ...val, id: project.id, coverImage: this.buildImgSrc(val.coverImage) }))).pipe(switchMap(v => this.service$.update(v))).subscribe(pro => {
      const index = this.projects.map(p => p.id).indexOf(pro.id);
      this.projects = [...this.projects.slice(0, index), pro, ...this.projects.slice(index + 1)];
      this.cd.markForCheck();
    });
  }

  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: '删除项目', content: '你确认删除项目吗？' } });
    dialogRef.afterClosed().pipe(take(1)).pipe(filter(n => n)).pipe(switchMap(__ => this.service$.delete(project))).subscribe(prj => {
      this.projects = this.projects.filter(p => p.id !== prj.id);
      this.cd.markForCheck();
    });
  }

  private getThumbnails() {
    return _.range(0, 40).map(i => `/assets/img/covers/${i}_tn.jpg`);
  }

  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img;
  }
}
