import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout.component';
import { ProjectRoutingModule } from './project-routing.module';
import { TimesheettrackerComponent } from './timesheettracker.component';
import { ProjecttaskComponent } from './projecttask.component';
import { AddEdittaskComponent } from './add-edittask.component';
import { DynamictrackerComponent } from './dynamictracker.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FieldsetModule } from "primeng/fieldset";



@NgModule({
  declarations: [
    ListComponent,
    AddEditComponent,
    LayoutComponent,
    TimesheettrackerComponent,
    ProjecttaskComponent,
    AddEdittaskComponent,
    DynamictrackerComponent
  ],
  imports: [
    CommonModule,
    FieldsetModule,
    ReactiveFormsModule,
    ProjectRoutingModule
    // BrowserAnimationsModule
  ]
})
export class ProjectModule { }
