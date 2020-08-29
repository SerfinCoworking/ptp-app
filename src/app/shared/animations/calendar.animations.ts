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

export const expandEventDay =
  trigger('expandEventDay', [
    state('expanded', style({"left": "0px", "bottom": "0px", "height": "100%", "width":"100%", "border-radius": "0%" })),
    state('collapsed', style({"left": "0.2rem", "bottom": "0.2rem", "height": "20px", "width":"20px",  "border-radius": "50%" })),
    transition('expanded <=> collapsed', animate('500ms 150ms cubic-bezier(0.83, 0, 0.17, 1)'))
  ]);

export const displayEventCount =
  trigger('displayEventCount', [
    state('expanded', style({"opacity": "0"})),
    state('collapsed', style({"opacity": "1" })),
    transition('expanded => collapsed', animate('500ms 650ms cubic-bezier(0.83, 0, 0.17, 1)')),
    transition('collapsed => expanded', animate('500ms cubic-bezier(0.83, 0, 0.17, 1)'))
  ]);
