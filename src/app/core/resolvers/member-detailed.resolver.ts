import { ResolveFn } from '@angular/router';
import { Member } from '../../models/member';
import { inject } from '@angular/core';
import { MembersService } from '../services/members.service';

export const memberDetailedResolver: ResolveFn<Member> = (route) => {
  const membersService = inject(MembersService);

  return membersService.getMember(route.paramMap.get('username'));
};
