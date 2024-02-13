import { LOCALE_ID, NgModule } from '@angular/core';

import es from '@angular/common/locales/es-ar'
import { registerLocaleData } from '@angular/common';

registerLocaleData(es);

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './layouts/auth/auth.module';
import { DashboardModule } from './layouts/dashboard/dashboard.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    AuthModule,
    DashboardModule,
    
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'es-AR'
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
