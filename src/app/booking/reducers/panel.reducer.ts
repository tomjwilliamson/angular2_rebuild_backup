// panel.ts
import { ActionReducer, Action } from '@ngrx/store';

export const PANEL_STATE = 'PANEL_STATE';
export const PANEL_INCREMENT = 'PANEL_INCREMENT';
export const PANEL_DECREMENT = 'PANEL_DECREMENT';
export const PANEL_RESET = 'PANEL_RESET';
export const PANEL_SET = 'PANEL_SET';

export function updatePanelReducer(state = 1, action: Action) {
  switch (action.type) {

    case PANEL_STATE:
      return state;

    case PANEL_INCREMENT:
      return state + 1;

    case PANEL_DECREMENT:
      return state - 1;

    case PANEL_SET:
      return state;

    case PANEL_RESET:
      return 1;

    default:
      return state;
  }
}
