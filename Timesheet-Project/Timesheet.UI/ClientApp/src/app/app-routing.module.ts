import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const projectModule = () => import('./project/project.module').then(x => x.ProjectModule);
const routes: Routes = [  
  // { path: '', component: HomeComponent },
  { path: '', loadChildren: projectModule },
  { path: 'account', loadChildren: accountModule },
  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
