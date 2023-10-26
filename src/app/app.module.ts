import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './shared/intersptor/user-intersptor';
import { HttpErrorInterceptor } from './shared/intersptor/user-error-intersptor';
import { ExtendedMenuNavModule } from './extended-menu-nav/extended-menu-nav.module';
import { AdminComponent } from './areas/admin/admin.component';
import { RouterModule } from '@angular/router';
import { AdminLayoutModule } from './areas/admin/admin-layout.module';
import { CompactMenuNavModule } from './compact-menu-nav/compact-menu-nav.module';
@NgModule({
  declarations: [AppComponent, AdminComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ExtendedMenuNavModule,
    CompactMenuNavModule,
    HttpClientModule,
    RouterModule.forRoot([

      {
        path: "admin",
        loadChildren: () => AdminLayoutModule,
        pathMatch: "full",

      },

    ]),
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
