import { trigger, state, animate, transition, style } from '@angular/animations';

export const expandEventsDate =
  trigger('expandEventsDate', [
    state('expanded', style({ "max-height": "300px", "padding": "0.5rem", "overflow": "auto" })),
    state('collapsed', style({ "max-height": "0px", "padding": "0", "overflow": "hidden" })),
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
    state('collapsed', style({"left": "0.2rem", "bottom": "0.2rem", "height": "25px", "width":"25px",  "border-radius": "50%" })),
    transition('expanded <=> collapsed', animate('500ms 150ms cubic-bezier(0.83, 0, 0.17, 1)'))
  ]);
  
export const expandEventToday =
  trigger('expandEventToday', [
    state('expanded', style({"border": "2px solid #ff4081", "border-radius": "50%",  })),
    state('collapsed', style({"border": "none", "height": "*", "width":"*",  "border-radius": "0%" })),
    transition('expanded <=> collapsed', animate('500ms 150ms cubic-bezier(0.83, 0, 0.17, 1)'))
  ]);

  export const expandEventTodayBg =
  trigger('expandEventTodayBg', [
    state('expanded', style({"background-color": "#ff4081", "color": "#fff"})),
    state('collapsed', style({"background-color": "none", "color": "rgba(0,0,0,.87)"})),
    transition('expanded <=> collapsed', animate('500ms 0ms cubic-bezier(0.83, 0, 0.17, 1)'))
  ]);

  export const expandEventBtn =
  trigger('expandEventBtn', [
    state('down', style({"transform": "rotate(0deg)", "background-color": "#e6e7ed", "border-color": "#7a82af", "color": "#7a82af"})),
    state('up', style({"transform": "rotate(-180deg)", "background-color": "#28a745", "border-color": "#7a82af", "color": "#fff"})),
    transition('down <=> up', animate('500ms 0ms cubic-bezier(0.83, 0, 0.17, 1)'))
  ]);

export const displayEventCount =
  trigger('displayEventCount', [
    state('expanded', style({"opacity": "0"})),
    state('collapsed', style({"opacity": "1" })),
    transition('expanded => collapsed', animate('500ms 650ms cubic-bezier(0.83, 0, 0.17, 1)')),
    transition('collapsed => expanded', animate('500ms cubic-bezier(0.83, 0, 0.17, 1)'))
  ]);

export const collapseDefaultSchedules =
  trigger('collapseDefaultSchedules', [
    state('expanded', style({"max-height": "500px"})),
    state('collapsed', style({"max-height": "0" })),
    transition('expanded <=> collapsed', animate('500ms cubic-bezier(0.83, 0, 0.17, 1)'))
  ]);
