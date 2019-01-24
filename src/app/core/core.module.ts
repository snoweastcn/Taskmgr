import { NgModule, SkipSelf, Optional } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { loadSvgResources } from '../utils/svg.util';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import '../utils/debug.util';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  exports: [
    SharedModule,
    AppRoutingModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  providers: [
    {
      provide: 'BASE_CONFIG', useValue: {
        uri: 'http://localhost:3000'
      }
    }
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    ir: MatIconRegistry,
    ds: DomSanitizer
  ) {
    if (parent) {
      throw new Error('模块已经存在，不能再次加载！');
    }
    loadSvgResources(ir, ds);
  }
}
