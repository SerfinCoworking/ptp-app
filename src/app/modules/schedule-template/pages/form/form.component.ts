import { Component, OnInit} from '@angular/core';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ITemplate, Week } from '@shared/models/template';
import { TemplateService } from '@shared/services/template.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  isLoading: boolean = false; 
  nameHasError: boolean = false; 
  faSpinner = faSpinner;  
  faTimes = faTimes;
  name: string;
  week: Week = {
    name: 'Todos',
    completed: false,
    color: 'primary',
    days: [
      {
        name: 'Lunes',
        completed: false,
        color: 'accent', 
        firstTime: {
          from: {
            hour: '',
            minute: ''
          },
          to: {
            hour: '',
            minute: ''
          }
        },
        secondTime: {
          from: {
            hour: '',
            minute: ''
          },
          to: {
            hour: '',
            minute: ''
          }
        }
      },
      {
        name: 'Martes',
        completed: false,
        color: 'accent',
        firstTime: {
          from: {
            hour: '',
            minute: ''
          },
          to: {
            hour: '',
            minute: ''
          }
        },
        secondTime: {
          from: {
            hour: '',
            minute: ''
          },
          to: {
            hour: '',
            minute: ''
          }
        }
      },
      {
        name: 'Miércoles',
        completed: false,
        color: 'accent',
        firstTime: {
          from: {
            hour: '',
            minute: ''
          },
          to: {
            hour: '',
            minute: ''
          }
        },
        secondTime: {
          from: {
            hour: '',
            minute: ''
          },
          to: {
            hour: '',
            minute: ''
          }
        }
      },
      {
        name: 'Jueves',
        completed: false,
        color: 'accent',
        firstTime: {
          from: {
            hour: '',
            minute: ''
          },
          to: {
            hour: '',
            minute: ''
          }
        },
        secondTime: {
          from: {
            hour: '',
            minute: ''
          },
          to: {
            hour: '',
            minute: ''
          }
        }
      },
      {
        name: 'Viernes',
        completed: false,
        color: 'accent',
        firstTime: {
          from: {
            hour: '',
            minute: ''
          },
          to: {
            hour: '',
            minute: ''
          }
        },
        secondTime: {
          from: {
            hour: '',
            minute: ''
          },
          to: {
            hour: '',
            minute: ''
          }
        }
      },
      {
        name: 'Sábado',
        completed: false,
        color: 'accent',
        firstTime: {
          from: {
            hour: '',
            minute: ''
          },
          to: {
            hour: '',
            minute: ''
          }
        },
        secondTime: {
          from: {
            hour: '',
            minute: ''
          },
          to: {
            hour: '',
            minute: ''
          }
        }
      },
      {
        name: 'Domingo',
        completed: false,
        color: 'accent',
        firstTime: {
          from: {
            hour: '',
            minute: ''
          },
          to: {
            hour: '',
            minute: ''
          }
        },
        secondTime: {
          from: {
            hour: '',
            minute: ''
          },
          to: {
            hour: '',
            minute: ''
          }
        }
      }
    ]
  };
  
  template: ITemplate = {
    name: '',
    schedule: []
  };
  allComplete: boolean = false;

  constructor(
    private templateService: TemplateService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
        
      // this.initForm();
    this.activatedRoute.data.subscribe( data => {
      if(data.template){
        // this.isEdit = true;
        // this.user = data.user;
        this.editTemplate(data.template);
      }
    }); 
  }

  // set news DB values on the form
  editTemplate(template: ITemplate) {
    this.template = template;
    this.name = template.name;
    template.schedule.map((sch) => {
      this.week.days.map((d, index) => {
        if(sch.day === d.name){
          this.week.days[index].completed = true;
          this.week.days[index].firstTime = sch.firstTime;
          this.week.days[index].secondTime = sch.secondTime;
        }
      });
    });  
  }
  
  
  onSubmit():void{
    
    if(typeof(this.name) !== 'undefined' && this.name.length){
      this.template.name = this.name;
    
      this.week.days.map((d) => {
        if(d.completed){
          const index: number = this.template.schedule.findIndex((sch, index) => sch.day === d.name);
          if(index >= 0){
            this.template.schedule[index].firstTime = d.firstTime;
            this.template.schedule[index].secondTime = d.secondTime;
          }else{
            this.template.schedule.push({
              day: d.name,
              firstTime: d.firstTime,
              secondTime: d.secondTime
            });
          }
        }
      }); 
      this.templateService.createOrUpdate(this.template, this.template._id).subscribe((res) => {
        this.router.navigate(['/dashboard/agendas/templates']);
      });
    }else{
      this.nameHasError = true;
    }
    
  }

  updateAllComplete() {
    this.allComplete = this.week.days != null && this.week.days.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.week.days == null) {
      return false;
    }
    return this.week.days.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.week.days == null) {
      return;
    }
    this.week.days.forEach(t => t.completed = completed);
  }
 
  setFromDate(e, sch, index): void {
    if(sch === 'H1' && e?.hour >= 0 && e?.minute >= 0){
      this.week.days[index].firstTime.from = e;
    }else if(sch === 'H2' && e?.hour >= 0 && e?.minute >= 0){
      this.week.days[index].secondTime.from = e;
    }
  }

  setToDate(e, sch, index): void {
    if(sch === 'H1' && e?.hour >= 0 && e?.minute >= 0){
      this.week.days[index].firstTime.to = e;
    }else if(sch === 'H2' && e?.hour >= 0 && e?.minute >= 0){
      this.week.days[index].secondTime.to = e;
    }
  }
}