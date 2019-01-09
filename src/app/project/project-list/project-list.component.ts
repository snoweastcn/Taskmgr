import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { slideAnim } from 'src/app/anims/router.anim';
import { listAnim } from 'src/app/anims/list.anim';

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
export class ProjectListComponent implements OnInit {
  @HostBinding('@routeAnim') state;

  projects = [
    {
      'id': 1,
      'name': '企业协作平台',
      'desc': '这是一个企业内部项目',
      'coverImg': '/assets/images/kitten-cosmic.png'
    },
    {
      'id': 2,
      'name': '企业协作平台',
      'desc': '这是一个企业内部项目',
      'coverImg': '/assets/images/kitten-cosmic.png'
    }
  ];
  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: '新建项目：' } });
    dialogRef.afterClosed().subscribe(result => {
      this.projects = [...this.projects, {
        id: 3,
        name: '一个新项目',
        desc: '这是一个新项目',
        coverImg: '/assets/images/kitten-cosmic.png'
      }, {
        id: 4,
        name: '又一个新项目',
        desc: '这又是一个新项目',
        coverImg: '/assets/images/kitten-cosmic.png'
      }];
      this.cd.markForCheck();
    });
  }

  lanchInviteDialog() {
    this.dialog.open(InviteComponent);
  }

  launchUpdateDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: '编辑项目：' } });
  }

  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: '删除项目', content: '你确认删除项目吗？' } });
    dialogRef.afterClosed().subscribe(result => {
      this.projects = this.projects.filter(p => p.id !== project.id);
      this.cd.markForCheck();
    });
  }
}
