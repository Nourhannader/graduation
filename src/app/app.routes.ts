import { NotFoundComponent } from './../not-found/not-found.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { UnitsComponent } from '../Pages/units/units.component';
import { DetailsComponent } from '../Pages/details/details.component';
import { OwnerInfoComponent } from '../Pages/owner-info/owner-info.component';
import { RegisterComponent } from '../Pages/register/register.component';
import { LoginComponent } from '../Pages/login/login.component';
import { OwnerEditCommunityComponent } from '../Pages/owner-edit-community/owner-edit-community.component';
import { OwnerComponent } from '../Pages/owner/owner.component';
import { OwnerAddUnitComponent } from '../Pages/owner-add-unit/owner-add-unit.component';
import { OwnerEditUnitComponent } from '../Pages/owner-edit-unit/owner-edit-unit.component';
import { ReviewComponent } from '../Pages/review/review.component';
import { AdvertisementsComponent } from '../Pages/advertisements/advertisements.component';
import { RenterHomeComponent } from '../renter-home/renter-home.component';
import { RenterTabsComponent } from '../renter-tabs/renter-tabs.component';
import { OwnerRentComponent } from '../owner-rent/owner-rent.component';
import { ScheduleComponent } from '../Pages/schedule/schedule.component';
import { BookingComponent } from '../Pages/booking/booking.component';

import { NotificationComponent } from '../notification/notification.component';
import { HomeComponent } from '../home/home.component';
import { guardRedirectGuard } from '../Services/guard-redirect.guard';
import { authGuard } from '../Services/auth.guard';
import { AdminHomeComponent } from '../Pages/admin-home/admin-home.component';
import { DashboardHomeComponent } from '../Pages/dashboard-home/dashboard-home.component';
import { AdminBookingComponent } from '../Pages/admin-booking/admin-booking.component';
import { RentersComponent } from './renters/renters.component';
import { OwnersComponent } from './owners/owners.component';
import { ResetPasswordComponent } from '../Pages/reset-password/reset-password.component';
import { RequestResetPasswordComponent } from '../Pages/request-reset-password/request-reset-password.component';




export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:"full"},
    {path:'register',component:RegisterComponent,canActivate:[guardRedirectGuard]},
    {path:'login',component:LoginComponent,canActivate:[guardRedirectGuard]},
    { path: 'ownerHome', component: OwnerComponent, title:"Owner Home",canActivate:[authGuard],data: { roles: ['Owner']},children:[
        {path:'',redirectTo:'owner',pathMatch:"full"},
        {path:'units',component:UnitsComponent},
        {path:'details/:id',component:DetailsComponent},
        {path:'editUnit/:id',component:OwnerEditUnitComponent},
        {path:'owner',loadComponent: () => import('../Pages/owner-info/owner-info.component').then(m => m.OwnerInfoComponent)},
        { path: 'EditCommunity', component: OwnerEditCommunityComponent, title:"Edit Community"},
        { path: 'AddUnit', component: OwnerAddUnitComponent, title:"Add Unit"},
        {path:'ownerRent', component:OwnerRentComponent, title:"Owner Rent"},
        {path:'schedule',component:ScheduleComponent},
        {path:'booking',component:BookingComponent}
        // { path: 'notifications',    component: NotificationComponent,    title: 'Notifications'}
    ]},
     {  path: 'notifications',    component: NotificationComponent,    title: 'Notifications'},

    { path: 'renterTabs', component: RenterTabsComponent, title:"Renter Tabs",canActivate:[authGuard],data: { roles: ['Renter']},children:[
    //  {path:'payment?rentId=:id',loadComponent:() => import('../payment/payment.component').then(m => m.PaymentComponent), title:"Payment"},
     {path:'renterHistory',loadComponent:() => import('../renter-history/renter-history.component').then(m => m.RenterHistoryComponent), title:"Renter History"},
    ]},

     {path:'community',loadComponent:() => import('../Pages/Community/community.component').then(m => m.CommunityComponent), title:"Community"},
     {path:'review',component:ReviewComponent},
     {path:'ads',component:AdvertisementsComponent},
     {path:'RenterHome',component:RenterHomeComponent,canActivate:[authGuard],data: { roles: ['Renter']}},
     {path:'payment/:id',loadComponent:() => import('../payment/payment.component').then(m => m.PaymentComponent), title:"Payment"},
     {path:'renterHistory',loadComponent:() => import('../renter-history/renter-history.component').then(m => m.RenterHistoryComponent), title:"Renter History"},
    // {path:'ownerRent', component:OwnerRentComponent, title:"Owner Rent"},
     //  {path:'renterTabs',component:  RenterTabsComponent, title:"Renter Tabs"},
    //  {path:'unpaidRent',loadComponent:() => import('../unpaid-rent/unpaid-rent.component').then(m => m.UnpaidRentComponent), title:"Unpaid Rent"},

    //  {path:'renterTabs',component:RenterTabsComponent},
    {path:'home',component:HomeComponent},
    //{path:'adminHome',component:DashboardHomeComponent},
    {path:'adminHome',component:AdminHomeComponent,data: { roles: ['Admin']},children:[
        {path:'',redirectTo:'DashBoard',pathMatch:"full"},
        {path:'DashBoard',component:DashboardHomeComponent},
        {path:'adminbooking',component:AdminBookingComponent},
        {path:'Renters',component:RentersComponent},
        {path:'Owners',component:OwnersComponent},
        
    ]},
    { path: 'reset-password', component: ResetPasswordComponent ,canActivate:[guardRedirectGuard]},
    {path:'request-password',component:RequestResetPasswordComponent,canActivate:[guardRedirectGuard]},
    {path:'404',component:NotFoundComponent},
    {path:'**',redirectTo:'404'}


];

