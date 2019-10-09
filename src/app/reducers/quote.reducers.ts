import * as quoteAction from '../actions/quote.action';
import { Quote } from '../domain';

export interface State {
  quote: Quote;
}

export const initialState: State = {
  quote: {
    cn: '提示标签是显示在表单字段下划线下方的额外的描述性文本。',
    en: 'Angular is a platform that makes it easy to build applications with the web.',
    pic: '/assets/images/kitten-cosmic.png'
  }
};

export function reducer(state = initialState, action: { type: string; payload: any }): State {
  switch (action.type) {
    case quoteAction.QUOTE_SUCCESS: {
      return { ...state, quote: action.payload };
    }
    case quoteAction.QUOTE_FAIL:
    default: {
      return state;
    }
  }
}

