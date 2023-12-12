import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoriesComponent } from './stories/stories.component';
import { HomeComponent } from './home/home.component';
import { AddFpoComponent } from './add-fpo/add-fpo.component';
import { ViewFpoComponent } from './view-fpo/view-fpo.component';

const routes: Routes = [
  { path: "", redirectTo: 'view', pathMatch: 'full' },
  { path: "view", component: HomeComponent },
  { path: "view/:fpoDetailsId", component: ViewFpoComponent },
  { path: "add-fpo", component: AddFpoComponent },
  { path: "edit-fpo/:fpoDetailsId", component: AddFpoComponent },
  { path: "stories", component: StoriesComponent },
  { path: '**', redirectTo: 'view', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
