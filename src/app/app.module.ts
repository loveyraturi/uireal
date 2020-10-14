import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { appRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Navigation} from "./components/navigation/navigation.component";
import {RouterModule} from "@angular/router";
import {OwnerComponent} from "./pages/owner/owner.component";
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { HomeComponent } from './pages/home/home.component';
import { PropertiesService } from './services/properties.service';
import { Footer } from './components/footer/footer.component';
import { PropertiesDetailsComponent } from './pages/properties_details/properties_details.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { PropertiesRegistrationComponent } from './pages/properties_registration/properties_registration.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './pages/main/main.component';
import { OwnerReportComponent } from './pages/ownerReport/ownerReport.component';
import { TenantReportComponent } from './pages/tenantReport/tenantReport.component';
import { SortlistedPropertiesComponent } from './pages/sortlisted_properties/sortlisted_properties.component';
import { ManagePropertiesComponent } from './pages/manage_properties/manage_properties.component';
import { EditPropertyComponent } from './pages/edit_property/edit_property.component';
// import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { MatchRequirementsComponent } from './pages/match_requirements/match_requirements.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { SuccessComponent } from './pages/success/success.component';
import { FailureComponent } from './pages/failure/failure.component';
import { AboutUsComponent } from './pages/about_us/about_us.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavigationAdminComponent } from './components/navigation_admin/navigation_admin.component';
import { OwnerPropertyComponent } from './pages/ownerProperty/ownerProperty.component';
import { TenantPropertyComponent } from './pages/tenantProperty/tenantProperty.component';
import { AlertService } from './_services';
import { AlertComponent } from './_directives';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgxSpinnerModule } from "ngx-spinner";
import { AdminUserService } from './services/admin_user.service';
import { AdminLoginComponent } from './pages/admin_login/admin_login.component';
import { TenantDetailsComponent } from './pages/tenantDetails/tenantDetails.component';
import { OwnerPropertyDetailsComponent } from './pages/ownerPropertyDetails/ownerPropertyDetails.component';
import { UserRegistrationComponent } from './pages/userRegistration/userRegistration.component';
import { UserLoginComponent } from './pages/userLogin/userLogin.component';
import { FilterComponent } from './pages/filter/filter.component';
import { TenantsRequirementsComponent } from './pages/tenantsRequirements/tenantsRequirements.component';
import { NgDatepickerModule } from 'ng2-datepicker';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './pages/terms-condition/terms-condition.component';
import { ProfileComponent } from './pages/profile/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ManagePropertiesComponent,
    Navigation,
    EditPropertyComponent,
    TenantDetailsComponent,
    MatchRequirementsComponent,
    SortlistedPropertiesComponent,
    TenantReportComponent,
    OwnerReportComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    OwnerPropertyDetailsComponent,
    AlertComponent,
    OwnerComponent,
    LoginComponent,
    PropertiesRegistrationComponent,
    DashboardComponent,
    SuccessComponent,
    AboutUsComponent,
    TenantsRequirementsComponent,
    FilterComponent,
    OwnerPropertyComponent,
    TenantPropertyComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    FailureComponent,
    PaymentComponent,
    AppointmentComponent,
    SidebarComponent,
    NavigationAdminComponent,
    AdminLoginComponent,
    Footer,
    RegistrationComponent,
    PropertiesDetailsComponent,
    PrivacyPolicyComponent,
    TermsConditionComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AngularDateTimePickerModule,
    FormsModule,
    HttpModule,
    UiSwitchModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgDatepickerModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [PropertiesService,AlertService,AdminUserService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
