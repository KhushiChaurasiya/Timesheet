import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { LayoutComponent } from './layout.component';
import { TimesheettrackerComponent } from './timesheettracker.component';

const routes: Routes = [
  {
      path: '', component: LayoutComponent,
      children: [
          { path:'list', component:ListComponent },
          { path: 'add', component: AddEditComponent },
          { path: 'edit/:id', component: AddEditComponent },
          { path : 'Timesheet', component: TimesheettrackerComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }

