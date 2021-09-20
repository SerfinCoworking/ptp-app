import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IObjective } from '@shared/models/objective';
import { IPeriod, ISchedule, IShift } from '@shared/models/schedule';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { IEmployee } from '@shared/models/employee';
import { ScheduleService } from '@shared/services/schedule.service';
import moment from 'moment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  faTimes = faTimes;
  notMatchEmployeeList: string[] = [];
  selectedEmployees: IEmployee[] = [];
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

  constructor(private fBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.scheduleForm.valueChanges.subscribe((form) => {
      
      this.period = {
        objective: {
          _id: form.objective._id,
          name: form.objective.name
        },
        fromDate: moment.isMoment(form.fromDate) ? form.fromDate.format("YYYY-MM-DD") : form.fromDate,
        toDate: moment.isMoment(form.toDate) ? form.toDate.format("YYYY-MM-DD") : form.toDate
      }
      
    });

    this.activatedRoute.data.subscribe( data => {
      this.storedPeriod = data.period;
      this.schedule = data.schedule;
      this.objectives = data.objectives.docs;
      this.employees = data.employees;
      
      this.scheduleForm.reset({
        objective: this.objectives.find((objective) => data.schedule.objective._id === objective._id),
        fromDate: this.storedPeriod.fromDate,
        toDate: this.storedPeriod.toDate
      });
      // falta mostrar el check en los seleccionados
      this.selectedEmployees = this.employees.filter((employee: IEmployee) => {
        return this.storedPeriod.shifts.find((shift: IShift) => shift.employee._id == employee._id)
      })

      this.selectedEmployeesIds = this.storedPeriod.shifts.map((shift: IShift) => {
        return shift.employee._id
      });
      
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

  onSubmit(): void {
    this.scheduleService.createOrUpdate(this.period, this.storedPeriod?._id).subscribe((res) => {
      console.log(res, "<===============debug ");

    });
  }

  clearFilter(){
    this.employeeFilter.reset("");
  }

  selectionChangeHandler(e){
    this.selectedEmployees = e.source.selectedOptions.selected.map((option) => {
      return option.value;
    });

    this.selectedEmployeesIds = this.selectedEmployees.map((employee: IEmployee) => {
      return employee._id
    });

    // Build shifts only with employee according selected employees 
    this.period.shifts = this.selectedEmployees.map((selectedEmpl) => {
        return {
          employee: {
            _id: selectedEmpl._id,
            firstName: selectedEmpl.profile.firstName,
            lastName: selectedEmpl.profile.lastName,
            avatar: selectedEmpl.profile.avatar
          }
        };
      }) as IShift[]    
  }
}
