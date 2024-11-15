import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceListComponent } from './service-list/service-list.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
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
import { SettingComponent } from './setting/setting.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { ServiceManagementComponent } from './service-management/service-management.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  // { path: '', component: FrontpageComponent },
  { path: '', component: Frontpage2Component },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'dashboard-admin', component: DashboardAdminComponent },
  { path: 'dashboard-vendor', component: DashboardVendorComponent },
  { path: 'servicemanagement', component: ServiceManagementComponent },
  { path: 'serviceslist', component: ServiceListComponent },
  { path: 'bookappointment', component: BookAppointmentComponent },
  { path: 'listbusiness', component: ListBusinessComponent },
  { path: 'corporateAdd', component: CorporateCollabAddComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'appointmentList', component: AppointmentListComponent },
  { path: 'edit-appointment/:id', component: AppointmentUpdateComponent },
  { path: 'view-appointment/:id', component: AppointmentDetailComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'vendorlist', component: VendorListComponent },
  { path: 'userlist', component: UserListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
