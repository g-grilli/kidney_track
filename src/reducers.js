import debounce from 'debounce';

import {doSort, doSearch} from './actions';
import store from './store';

function sort_state () {
  store.dispatch(doSort());
}

var debounceSort = debounce(sort_state, 1000);

var initialState = {
  contacts: [],
  filtered: [],
  meds:[],
  appointments: [],
  notes: [],
  health: [],
  term: ''
};

function compare(a,b) {
  if (a.lastName < b.lastName) {
    return -1;
  }
  if (a.lastName > b.lastName) {
    return 1;
  } 
  return 0;
}

export function contacts (state, action) {
  if (state === undefined) {
    return initialState;
  }
  switch (action.type) {
    case 'ADD_CONTACT':
      var new_state = Object.assign({}, state);
      new_state.filtered = [...state.filtered];
      new_state.contacts = [...state.contacts];
      
      new_state.contacts.push(action.data);
      
      setTimeout(function() {
        store.dispatch(doSearch(state.term || ''));
      });
      
      return new_state;
      
    case 'EDIT_CONTACT':
      var new_state = Object.assign({}, state);
      
      new_state.filtered = [...state.filtered];
      new_state.contacts = [...state.contacts];
      
      var data = Object.assign({}, action.data);
      delete data.orig;
      new_state.contacts[action.data.orig] = data;
      new_state.filtered[action.index] = action.data;
      
      return new_state;
      
    case 'DO_SORT':
      new_state = Object.assign({}, state);
      
      new_state.filtered = [...state.filtered];
      new_state.contacts = [...state.contacts];
      
      new_state.filtered.sort(compare);
      new_state.contacts.sort(compare);
      return new_state;
      
    case 'DO_SEARCH':
      var filter_contacts = [];
      var contacts = [];
      new_state = Object.assign({}, state);
      
      state.contacts.forEach(function (c, index) {
        if (c.lastName.toLowerCase().search(action.term.toLowerCase()) > -1) {
          filter_contacts.push(
            Object.assign({}, c, {orig: index, expanded: false})
          );
        }
        
        contacts.push(Object.assign({}, c));
      });
      
      new_state.contacts = contacts;
      new_state.filtered = filter_contacts;
      new_state.term = action.term;
      debounceSort();
      return new_state;
      
    case 'DELETE_CONTACT':
      new_state = Object.assign({}, state);
      
      new_state.filtered = [...state.filtered];
      new_state.contacts = [...state.contacts];
      
      
      console.log(action.findex, action.oindex);
      new_state.filtered.splice(action.findex, 1);
      new_state.contacts.splice(action.oindex, 1);
      
      new_state.filtered.sort(compare);
      new_state.contacts.sort(compare);
      
      return new_state;
      
    case 'DO_EXPAND':
      new_state = Object.assign({}, state);
      
      new_state.filtered = [...state.filtered];
      new_state.contacts = [...state.contacts];
      
      new_state.filtered[action.index].expanded = action.expanded;
      
      return new_state;
      
    case 'INIT_CONTACTS':
      new_state = Object.assign({}, state, action.data);
      // var filtered = [];
      // action.data.forEach(function (c, index) {
      //   filtered.push(Object.assign({}, c, {orig: index, expanded: false}));
      // });
      
      return new_state;
      
    case 'ADD_MED':
      new_state = Object.assign({}, state);
      console.log(new_state);
      new_state.meds = [...state.meds];
      
      new_state.meds.push(action.data);
      
      console.log(new_state);
      return new_state;
      
    case 'EDIT_MED':
      var new_state = Object.assign({}, state);
      
      new_state.meds = [...state.meds];
      
      var data = Object.assign({}, action.data);
      delete data.orig;
      new_state.meds[action.data.orig] = data;
      new_state.filtered[action.index] = action.data;
      
      return new_state;
      
    case 'DELETE_MED':
      new_state = Object.assign({}, state);
      
      new_state.meds = [...state.meds];
      
      
      console.log(action.findex, action.oindex);
      new_state.filtered.splice(action.findex, 1);
      new_state.meds.splice(action.oindex, 1);
      
      return new_state;
      

    case 'ADD_HEALTH':
      new_state = Object.assign({}, state);
      console.log(new_state);
      new_state.health = [...state.health];
      
      new_state.health.push(action.data);
      
      console.log(new_state);
      return new_state;
      
    case 'EDIT_HEALTH':
      var new_state = {};
      
      new_state.health = [...state.health];
      
      var data = Object.assign({}, action.data);
      delete data.orig;
      new_state.meds[action.data.orig] = data;
      new_state.filtered[action.index] = action.data;
      
      return new_state;
      
    case 'DELETE_HEALTH':
      new_state = {};
      
      new_state.health = [...state.health];
      
      
      console.log(action.findex, action.oindex);
      new_state.filtered.splice(action.findex, 1);
      new_state.health.splice(action.oindex, 1);
      
      return new_state;
      
    default:
      return state;
  }
}


export default contacts