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
  term: ''
};

function compare(a,b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
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
      var new_state = {};
      
      new_state.filtered = [...state.filtered];
      new_state.contacts = [...state.contacts];
      
      new_state.contacts.push(action.data);
      
      setTimeout(function() {
        store.dispatch(doSearch(state.term || ''));
      });
      
      return new_state;
      
    case 'EDIT_CONTACT':
      var new_state = {};
      
      new_state.filtered = [...state.filtered];
      new_state.contacts = [...state.contacts];
      
      var data = Object.assign({}, action.data);
      delete data.orig;
      new_state.contacts[action.data.orig] = data;
      new_state.filtered[action.index] = action.data;
      
      return new_state;
      
    case 'DO_SORT':
      new_state = {};
      
      new_state.filtered = [...state.filtered];
      new_state.contacts = [...state.contacts];
      
      new_state.filtered.sort(compare);
      new_state.contacts.sort(compare);
      return new_state;
      
    case 'DO_SEARCH':
      var filter_contacts = [];
      var contacts = [];
      new_state = {};
      
      state.contacts.forEach(function (c, index) {
        if (c.name.toLowerCase().search(action.term.toLowerCase()) > -1) {
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
      new_state = {};
      
      new_state.filtered = [...state.filtered];
      new_state.contacts = [...state.contacts];
      
      
      console.log(action.findex, action.oindex);
      new_state.filtered.splice(action.findex, 1);
      new_state.contacts.splice(action.oindex, 1);
      
      new_state.filtered.sort(compare);
      new_state.contacts.sort(compare);
      
      return new_state;
      
    case 'DO_EXPAND':
      new_state = {};
      
      new_state.filtered = [...state.filtered];
      new_state.contacts = [...state.contacts];
      
      new_state.filtered[action.index].expanded = action.expanded;
      
      return new_state;
      
    case 'INIT_CONTACTS':
      var filtered = [];
      action.data.forEach(function (c, index) {
        filtered.push(Object.assign({}, c, {orig: index, expanded: false}));
      });
      
      return {
        contacts: action.data,
        filtered: filtered
      };
      
    default:
      return state;
  }
}


export default contacts;