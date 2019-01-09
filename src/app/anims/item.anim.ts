import { trigger, state, style, transition, animate } from '@angular/animations';

export const itemAnim = trigger('item', [
  state('out', style({ 'border-left-width': '3px' })),
  state('hover', style({ 'border-left-width': '8px' })),
  transition('out => hover', animate('100ms ease-in')),
  transition('hover => out', animate('100ms ease-out')),
]);
