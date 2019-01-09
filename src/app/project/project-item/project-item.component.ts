import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { cardAnim } from 'src/app/anims/card-anim';
import { listAnim } from 'src/app/anims/list.anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [
    cardAnim,
    listAnim
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectItemComponent implements OnInit {
  @Input() item: any;
  @Output() invite = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @HostBinding('@card') cardState = 'out';
  @HostBinding('@listAnim') state;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('mouseenter')
  onmouseenter() {
    this.cardState = 'hover';
  }

  @HostListener('mouseleave')
  onmouseleave() {
    this.cardState = 'out';
  }

  onInviteClick() {
    this.invite.emit();
  }

  onEditClick() {
    this.edit.emit();
  }

  onDelClick() {
    this.delete.emit();
  }
}
