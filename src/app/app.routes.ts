import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { UnitsComponent } from '../Pages/units/units.component';
import { DetailsComponent } from '../Pages/details/details.component';
import { OwnerInfoComponent } from '../Pages/owner-info/owner-info.component';
import { RegisterComponent } from '../Pages/register/register.component';
import { LoginComponent } from '../Pages/login/login.component';

export const routes: Routes = [
    {path:'',redirectTo:'units',pathMatch:"full"},
    {path:'units',loadComponent:() => import('../Pages/units/units.component').then(m => m.UnitsComponent)},
    {path:'details/:id',component:DetailsComponent},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'owner',loadComponent: () => import('../Pages/owner-info/owner-info.component').then(m => m.OwnerInfoComponent)}
    
];
