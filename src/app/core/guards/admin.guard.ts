import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  return accountService.currentUser$.pipe(
    map(user => {
      if(user.roles.includes('Admin') || user.roles.includes('Moderator')) {
        return true;
      }
      toastr.error('You do not have permission to access this area.');
      return false;
    })
  );
};
