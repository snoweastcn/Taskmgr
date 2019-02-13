import { trigger, state, style, transition, animate } from '@angular/animations';

export const cardAnim = trigger('card', [
  state('out', style({ transform: 'scale(1)', 'box-shadow': 'none' })),
  state('hover', style({ transform: 'scale(1.1)', 'box-shadow': '3px -3px 10px 0px #ccc' })),
  transition('out => hover', animate('200ms ease-in')),
  transition('hover => out', animate('200ms ease-out')),
]);
