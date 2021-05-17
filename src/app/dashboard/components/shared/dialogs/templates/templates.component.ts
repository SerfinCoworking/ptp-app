import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ITemplate } from '@interfaces/template';
import { TemplateService } from '@shared/services/template.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.sass']
})
export class TemplatesComponent implements OnInit {

  selectedTemplate: ITemplate | undefined;
  templates: Array<ITemplate>;

  constructor(
    private templateService: TemplateService,
    public dialogRef: MatDialogRef<TemplatesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}


  ngOnInit(): void { 
    this.templateService.getTemplates().subscribe((res) => {
      this.templates = res.docs;
    });

  }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(this.selectedTemplate);
  }
}
