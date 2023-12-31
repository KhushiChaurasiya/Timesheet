import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout.component';
import { ProjectRoutingModule } from './project-routing.module';
import { TimesheettrackerComponent } from './timesheettracker.component';



@NgModule({
  declarations: [
    ListComponent,
    AddEditComponent,
    LayoutComponent,
    TimesheettrackerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
