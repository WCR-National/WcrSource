import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from '.././app/components/home/home.component';  

const routes: Routes = [
    {
        path: '', component: HomeComponent, pathMatch: 'prefix',
        //children: [
        //    { path: '', component: SiteCalculatorComponent },
        //    { path: 'site-notice', component: SiteSiteNoticeComponent }
        //]
    }
    //{
    //    path: 'app', component: AppComponent
    //}, {
    //    path: 'category', component: CategoryComponent
    //},
    //{
    //    path: '', redirectTo: '/app', pathMatch: 'full'
    //}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
