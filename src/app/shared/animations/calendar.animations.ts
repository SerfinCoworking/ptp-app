import { trigger, state, animate, transition, style } from '@angular/animations';

export const expandEventsDate =
  trigger('expandEventsDate', [
    state('expanded', style({ "max-height": "200px" })),
    state('collapsed', style({ "max-height": "0px" })),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
  ]);


export const expandCalendar =
  trigger('expandCalendar', [
    state('expanded', style({ "position": "absolute", "left": "0px", "top": "0px", "z-index": "100"})),
    state('collapsed', style({ "position": "relative" })),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
  ]);

