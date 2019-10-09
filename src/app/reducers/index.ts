import { NgModule } from '@angular/core';
import { StoreModule, combineReducers, ActionReducer, State, compose } from '@ngrx/store';
// import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromQuote from './quote.reducers';

// import * as class from '../actions/class';


// const initialState: State = {
//   quote: fromQuote.initialState,
// };

const reducers = {
  quote: fromQuote.reducer,
};

// const productionReducers: ActionReducer<State> = combineReducers(reducers);
// const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers(reducers));

// export function reducer(state = initialState, action: any): State {
//   return productionReducers(state, action);
// }

@NgModule({
  imports: [
    // StoreModule.provideStore(fromQuote),
    // RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrument(),
  ]
})
export class AppStoreModule { }


