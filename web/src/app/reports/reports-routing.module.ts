import { ReportsHomePageComponent } from './_pages/reports-home-page/reports-home-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: ReportsHomePageComponent,
    pathMatch: 'exact'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
