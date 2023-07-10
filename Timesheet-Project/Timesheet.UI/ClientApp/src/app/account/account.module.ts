import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login.component';
import { RegistrationComponent } from './registration.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegistrationComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule,
    ],
})
export class AccountModule { }
