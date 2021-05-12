import { Component, OnInit} from '@angular/core';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ITemplate, Week } from '@interfaces/template';
import { TemplateService } from '@shared/services/template.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  isLoading: boolean = false; 
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

    // initForm():void{
    //   this.templateForm =  this.fBuilder.group({
    //     _id: [''],
    //     name: [''],
    //     schedule: 
    //     this.fBuilder.group({
    //       firstName: ['', Validators.required],
    //       lastName: ['', Validators.required],
    //       avatar: [''],
    //       dni: ['', Validators.required]
    //     })
    //   });
    // }  
  
  // set news DB values on the form
  editTemplate(template: ITemplate) {
    // this.templateForm.patchValue({
    //   _id: template._id,
    //   name: template.name,
    //   schedule: template.concept,
    // });

  
  }
  
  
  onSubmit():void{
    if(this.name.length){
      this.template.name = this.name;
    }
    this.week.days.map((d) => {
      if(d.completed){

        this.template.schedule.push({
          day: d.name,
          firstTime: d.firstTime,
          secondTime: d.secondTime
        });
      }
    }); 
    this.templateService.createOrUpdate(this.template, this.template._id).subscribe((res) => {
      this.router.navigate(['/dashboard/agendas/templates']);
    });
    
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
    if(sch === 'H1'){
      this.week.days[index].firstTime.from = e;
    }else if(sch === 'H2'){
      this.week.days[index].secondTime.from = e;
    }
  }
  setToDate(e, sch, index): void {
    if(sch === 'H1'){
      this.week.days[index].firstTime.to = e;
    }else if(sch === 'H2'){
      this.week.days[index].secondTime.to = e;
    }
  }
}