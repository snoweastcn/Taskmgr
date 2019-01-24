import { NgModule, ModuleWithProviders } from '@angular/core';
import { QuoteService } from './quote.service';

@NgModule({
  providers: [QuoteService]
})
export class ServiceModule {
  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: ServiceModule,
  //     providers: [
  //       QuoteService
  //     ]
  //   };
  // }
}
