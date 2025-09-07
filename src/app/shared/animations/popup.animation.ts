import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export const popupAnimation = trigger('popupAnimation', [
  state('void', style({
    opacity: 0,
    transform: 'scale(0.8) translateY(-20px)'
  })),
  state('*', style({
    opacity: 1,
    transform: 'scale(1) translateY(0)'
  })),
  transition(':enter', [
    animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)')
  ]),
  transition(':leave', [
    animate('200ms ease-out')
  ])
]);

export const backdropAnimation = trigger('backdropAnimation', [
  state('void', style({
    opacity: 0
  })),
  state('*', style({
    opacity: 1
  })),
  transition(':enter', [
    animate('300ms ease-in')
  ]),
  transition(':leave', [
    animate('200ms ease-out')
  ])
]);
