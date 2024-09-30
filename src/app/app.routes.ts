import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MemberListComponent } from './features/members/member-list/member-list.component';
import { MemberDetailComponent } from './features/members/member-detail/member-detail.component';
import { MessagesComponent } from './features/messages/messages.component';
import { ListsComponent } from './features/lists/lists.component';
import { authGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './core/errors/not-found/not-found.component';
import { ServerErrorComponent } from './core/errors/server-error/server-error.component';
import { MemberEditComponent } from './features/members/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './core/guards/prevent-unsaved-changes.guard';
import { memberDetailedResolver } from './core/resolvers/member-detailed.resolver';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            {path: 'members', component: MemberListComponent},
            {path: 'members/:username', component: MemberDetailComponent, resolve: {member: memberDetailedResolver}},
            {path: 'member/edit', component: MemberEditComponent, canDeactivate: [preventUnsavedChangesGuard]},
            {path: 'lists', component: ListsComponent},
            {path: 'messages', component: MessagesComponent}
        ]
    },
    {path: 'not-found', component: NotFoundComponent},
    {path: 'server-error', component: ServerErrorComponent},
    {path:'**', component: NotFoundComponent, pathMatch: 'full'}
];
