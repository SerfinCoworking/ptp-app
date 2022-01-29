import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IObjective } from '@shared/models/objective';
import { IPeriod, ISchedule, IShift } from '@shared/models/schedule';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { IEmployee } from '@shared/models/employee';
import { ScheduleService } from '@shared/services/schedule.service';
import moment from 'moment';
import { ObjectiveService } from '@shared/services/objective.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  faTimes = faTimes;
  notMatchEmployeeList: string[] = [];
  selectedEmployees: IShift[] = [];
  selectedEmployeesIds: string[] = [];// ctrl var, for check / uncheck employee list
  scheduleForm: FormGroup = this.fBuilder.group({
    objective: [""],
    fromDate: [""],
    toDate: [""]
  });

  employeeFilter: FormControl = this.fBuilder.control('');

  schedule: ISchedule;
  storedPeriod: IPeriod;
  period: IPeriod = {
    shifts: []
  } as IPeriod;
  objectives: IObjective[];
  employees: IEmployee[] = [];
  employeesInShift: IShift[] = [];

  constructor(private fBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private scheduleService: ScheduleService,
    private objectiveService: ObjectiveService ) { }

  ngOnInit(): void {
    setTimeout(() =>{
      this.scheduleForm.get('objective').valueChanges.subscribe((value) => {
        this.objectiveService.getObjectives(value).subscribe((res) =>{
          this.objectives = res.docs;
        });
      });
    });
      
    this.scheduleForm.valueChanges.subscribe((form) => {
      if(form.objective){
        this.period.objective = {
          _id: form.objective?._id,
          name: form.objective?.name
        }
      }
      this.period.fromDate = moment.isMoment(form.fromDate) ? form.fromDate.format("YYYY-MM-DD") : form.fromDate,
      this.period.toDate = moment.isMoment(form.toDate) ? form.toDate.format("YYYY-MM-DD") : form.toDate
    });  

    this.activatedRoute.data.subscribe( data => {
      this.storedPeriod = data.period;
      this.schedule = data.schedule;
      this.employees = data.employees;
      if(this.schedule){
        this.period.objective = {
          _id: this.schedule.objective._id,
          name: this.schedule.objective.name
        },
        this.scheduleForm.reset({
          objective: this.schedule.objective,
          fromDate: this.storedPeriod?.fromDate,
          toDate: this.storedPeriod?.toDate
        });
        this.scheduleForm.get('objective').disable();
      }
        
      this.employeesInShift = this.employees.map((employee: IEmployee) => {
        const shift: IShift = this.storedPeriod?.shifts.find((shift: IShift) => shift.employee._id == employee._id)
        return { employee: {
          _id: employee._id,
          firstName: employee.profile.firstName,
          lastName: employee.profile.lastName,
          avatar: employee.profile.avatar
        }, ...shift } as IShift;
      });

      this.selectedEmployees = this.employeesInShift.filter((shiftParsed: IShift) => {
        return this.storedPeriod?.shifts.find((shift: IShift) => shift.employee._id == shiftParsed.employee._id)
      });

      this.selectedEmployeesIds = this.storedPeriod?.shifts.map((shift: IShift) => {
        return shift.employee._id
      }) || [];
      
    });


    this.employeeFilter.valueChanges.subscribe((filter) => {
      if(!filter.length){
        this.notMatchEmployeeList = [];
      } // when nothing has typed*/
      if (typeof filter === 'string') {

        this.notMatchEmployeeList = this.employees.filter((employee: IEmployee) => {
          const fullname: string = employee.profile.firstName.trim().toLowerCase() + employee.profile.lastName.trim().toLowerCase();
          // at least one word match in firstName or lastName
          const words: string[] = filter.trim().split(" ");
          const matches = words.filter( (word: string) => {
            return fullname.includes(word);
          });

          return matches.length == 0; //return employees do not matched
        }).map((employee: IEmployee) => {return employee._id});
      }
    })
  }

  isInValid(field: string): boolean {
		return !!(
			this.scheduleForm.controls[field].errors &&
			this.scheduleForm.controls[field].touched
		);
	}

  onSubmit(): void {
    this.scheduleService.createOrUpdate(this.period, this.storedPeriod?._id).subscribe((res) => {
      this.router.navigate(['/dashboard/agendas/planificacion', res._id]);
    },
    (err) => {
      err.error.map((error: any) => {
        const errorMsg = error.message.split("_");
        this.scheduleForm.get(error.property).setErrors({ invalid: errorMsg[1]});
      })
    });
  }

  clearFilter(){
    this.employeeFilter.reset("");
  }

  selectionChangeHandler(e){
    this.selectedEmployees = e.source.selectedOptions.selected.map((option) => {
      return option.value;
    });

    this.selectedEmployeesIds = this.selectedEmployees.map((shift: IShift) => {
      return shift.employee._id
    });

    // Build shifts only with employee according selected employees 
    this.period.shifts = this.selectedEmployees;
  }

  displayFn(objective: IObjective): string {
    return objective ? objective.name : '';
  }
}
