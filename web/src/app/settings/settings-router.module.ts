import { UserPreferencesPageComponent } from './_pages/user-preferences-page/user-preferences-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: 'preferences',
    component: UserPreferencesPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRouterModule { }
