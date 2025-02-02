import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListBusinessComponent } from './list-business/list-business.component';
import { Frontpage2Component } from './frontpage2/frontpage2.component';
import { CorporateCollabAddComponent } from './corporate-collab-add/corporate-collab-add.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardVendorComponent } from './dashboard-vendor/dashboard-vendor.component';
import { ProfileComponent } from './profile/profile.component';
import { AppointmentUpdateComponent } from './appointment-update/appointment-update.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { AppointmentDeleteComponent } from './appointment-delete/appointment-delete.component';
import { SettingComponent } from './setting/setting.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { ServiceManagementComponent } from './service-management/service-management.component';
import { ApiService } from './service/api.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AiDiagnosticDialogComponent } from './components/ai-diagnostic-dialog/ai-diagnostic-dialog.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AiDiagnosticDialogComponent,
    ServiceListComponent,
    FrontpageComponent,
    LoginComponent,
    SignupComponent,
    BookAppointmentComponent,
    DashboardComponent,
    ListBusinessComponent,
    Frontpage2Component,
    CorporateCollabAddComponent,
    AboutUsComponent,
    AppointmentListComponent,
    DashboardAdminComponent,
    DashboardVendorComponent,
    ProfileComponent,
    AppointmentUpdateComponent,
    AppointmentDetailComponent,
    AppointmentDeleteComponent,
    SettingComponent,
    VendorListComponent,
    UserListComponent,
    ServiceManagementComponent,
    ForgotPasswordComponent,
    ServiceDetailsComponent,
    ModalComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatCardModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({   // Configure Toastr globally
      timeOut: 3000,         // Duration of toast (in ms)
      positionClass: 'toast-top-right', // Position
      preventDuplicates: true // Avoid duplicate toasts
    })
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
