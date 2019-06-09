import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
    // Feature modules
    { path: '', loadChildren: 'app/pages/home/home.module#HomeModule' },
    { path: 'store', loadChildren: 'app/pages/store/store.module#StoreModule', canActivate: [AuthGuard] },
    { path: 'forgotpassword', component: ForgotpasswordComponent },
    { path: 'resetpassword', component: ResetpasswordComponent },

    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
