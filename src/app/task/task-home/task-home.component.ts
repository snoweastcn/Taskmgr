import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { slideAnim } from 'src/app/anims/router.anim';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [
    slideAnim
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit {
  @HostBinding('@routeAnim') state;

  lists = [
    {
      id: 1,
      order: 1,
      name: '待办',
      tasks: [
        {
          id: 1,
          desc: '任务一：去星巴克买杯咖啡',
          completed: true,
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatar'
          },
          priority: 3,
          dueDate: new Date(),
          reminder: new Date(),
        },
        {
          id: 2,
          desc: '任务二：去德克士买个汉堡',
          completed: false,
          owner: {
            id: 2,
            name: '李四',
            avatar: 'avatar'
          },
          priority: 2,
          dueDate: new Date(),
        }
      ]
    },
    {
      id: 2,
      order: 2,
      name: '进行中',
      tasks: [
        {
          id: 3,
          desc: '任务三：代码优化审核',
          completed: false,
          owner: {
            id: 3,
            name: '王五',
            avatar: 'avatar'
          },
          priority: 1,
          dueDate: new Date(),
        },
        {
          id: 3,
          desc: '任务四：制定项目计划',
          completed: false,
          owner: {
            id: 3,
            name: '李白',
            avatar: 'avatar'
          },
          priority: 2,
          dueDate: new Date(),
        }
      ]
    }
  ];
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  launchNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { title: '新建任务：' } });
  }

  launchCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, { data: { lists: this.lists } });
  }

  launchUpdateTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { title: '修改任务：', task: task } });
  }

  launchConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: '删除任务列表：', content: '你确定要删除该任务吗？' } });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchEditListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { title: '更改列表名称：' } });
    dialogRef.afterClosed().subscribe(result => console.log(result));

  }

  launchNewListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { title: '修改列表名称：' } });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  handleMove(srcData, list) {
    switch (srcData.tag) {
      case 'task-item':
        console.log('handing item');
        break;
      case 'task-list':
        console.log('handing list');
        const srcList = srcData.data;
        const tempOrder = srcList.order;
        srcList.order = list.order;
        list.order = tempOrder;
        break;
      default:
        break;
    }
  }
}
