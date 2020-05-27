import { trigger, sequence, state, animate, transition, style } from '@angular/animations';

export const sidebarToggle =
  trigger('sidebarToggle', [
    state('visible', style({ left: "0px" })),
    state('hidden', style({ left: "calc(-275px + 50px)" })),
    transition('visible <=> hidden', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
  ]);

export const contentToggle =
  trigger('contentToggle', [
    state('midwidth', style({ width: "calc(100% - 275px)", left: "275px" })),
    state('fullwidth', style({ width: "calc(100% - 50px)", left: "50px" })),
    transition('midwidth <=> fullwidth', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
  ]);


