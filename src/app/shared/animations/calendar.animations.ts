import { trigger, state, animate, transition, style } from '@angular/animations';

export const expandEventsDate =
  trigger('expandEventsDate', [
    state('expanded', style({ "max-height": "200px" })),
    state('collapsed', style({ "max-height": "0px" })),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
  ]);

