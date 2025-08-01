import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guardRedirectGuard: CanActivateFn = (route, state) => {
  const _router=inject(Router)
  const token=localStorage.getItem('token');
  const role=localStorage.getItem('role')
  if(token){
    if(role == 'Owner'){
      _router.navigate(['/ownerHome'])
    }else if(role =='Renter'){
      _router.navigate(['/RenterHome'])
    }else{
      _router.navigate(['/home'])
    }
    return false;
  }
  return true;
};
