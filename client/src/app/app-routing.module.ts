import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListsComponent } from './members/member-lists/member-lists.component';
import { MessagesComponent } from './messages/messages.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsaveChangesGuard } from './_guards/prevent-unsave-changes.guard';

const routes: Routes = [
  {path: '',component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers : 'always',
    canActivate: [AuthGuard],
    children: [
      {path : 'members',component: MemberListsComponent},
      {path : 'members/edit', component: MemberEditComponent, canDeactivate : [PreventUnsaveChangesGuard]},
      {path : 'members/:userName',component: MemberDetailComponent},
      
      {path : 'lists',component: ListsComponent },
      {path : 'messages',component: MessagesComponent}
      
    ]
  },
  {path: 'internel-server',component: ServerErrorComponent},
  {path : '**', component: HomeComponent,pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
