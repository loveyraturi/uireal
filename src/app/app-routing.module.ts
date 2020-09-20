import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about_us/about_us.component';
import { MainComponent } from './pages/main/main.component';
import { EditPropertyComponent } from './pages/edit_property/edit_property.component';
import { SortlistedPropertiesComponent } from './pages/sortlisted_properties/sortlisted_properties.component';
import { ManagePropertiesComponent } from './pages/manage_properties/manage_properties.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { OwnerReportComponent } from './pages/ownerReport/ownerReport.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { TenantReportComponent } from './pages/tenantReport/tenantReport.component';
import { PropertiesDetailsComponent } from './pages/properties_details/properties_details.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { OwnerComponent } from './pages/owner/owner.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OwnerPropertyComponent } from './pages/ownerProperty/ownerProperty.component';
import { TenantPropertyComponent } from './pages/tenantProperty/tenantProperty.component';
import { SuccessComponent } from './pages/success/success.component';
import { LoginComponent } from './pages/login/login.component';
import { PropertiesRegistrationComponent } from './pages/properties_registration/properties_registration.component';
import { MatchRequirementsComponent } from './pages/match_requirements/match_requirements.component';
import { FailureComponent } from './pages/failure/failure.component';
import { AdminLoginComponent } from './pages/admin_login/admin_login.component';
import { TenantDetailsComponent } from './pages/tenantDetails/tenantDetails.component';

export const appRoutes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'aboutus',
        component: AboutUsComponent
    },
    {
        path: 'main',
        component: MainComponent
    },
    {
        path: 'editProperty/:propertyId',
        component: EditPropertyComponent
    },
    {
        path: 'sortlisted',
        component: SortlistedPropertiesComponent
    },
    {
        path: 'manage',
        component: ManagePropertiesComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'reset-password/:email/:uuid',
        component: ResetPasswordComponent
    },
    {
        path: 'ownerReport',
        component: OwnerReportComponent
    },
    {
        path: 'tenantReport',
        component: TenantReportComponent
    },
    {
        path: 'payment',
        component: PaymentComponent
    },
    {
        path: 'properties_details',
        component: PropertiesDetailsComponent
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: 'awner',
        component: OwnerComponent
    },
    {
        path: 'admin',
        component: DashboardComponent
    },
    {
        path: 'ownerProperty',
        component: OwnerPropertyComponent
    },
    {
        path: 'tenantProperty',
        component: TenantPropertyComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'adminLogin',
        component: AdminLoginComponent
    },
    {
        path: 'tenantsDetails/:id',
        component: TenantDetailsComponent
    },
    {
        path: 'properties_registration',
        component: PropertiesRegistrationComponent
    },
    {
        path: 'match_requirements',
        component: MatchRequirementsComponent
    },
    {
        path: 'success',
        component: SuccessComponent
    },
    {
        path: 'failure',
        component: FailureComponent
    },
    {
        path: 'others',
        loadChildren: './pages/others/others.module#OthersModule',
    }
];