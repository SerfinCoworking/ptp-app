import { trigger, sequence, state, animate, transition, style } from '@angular/animations';

export const panelOne =
  trigger('panelOne', [
    state('fullwidth', style({ width: "100%" })),
    state('midwidth', style({ width: "calc((100% / 2) - 10px)" })),
    transition('fullwidth <=> midwidth', animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
  ]);

export const panelTwo =
  trigger('panelTwo', [
    state('hidden', style({ right: "calc((-100% / 2) - 10px)", opacity: "0" })),
    state('visible', style({ right: "0%", opacity: "1" })),
    transition('hidden <=> visible', animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
  ]);
