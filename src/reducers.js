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
  filtered_meds: [],
  schedule: [],
  filtered_schedule: [],
  notes: [],
  filtered_notes: [],
  health: [],
  filtered_health: [],
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

export function data (state, action) {
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
      new_state = Object.assign({}, state);
      
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
      new_state.meds = [...state.meds];
      new_state.notes = [...state.notes];
      new_state.health = [...state.health];
      new_state.schedule = [...state.schedule];
      
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
      new_state.filtered_meds = [...state.filtered_meds];
      new_state.meds = [...state.meds];
      
      new_state.meds.push(action.data);
      
      console.log(new_state);
      return new_state;
      
    case 'EDIT_MED':
      new_state = Object.assign({}, state);
      new_state.filtered_meds = [...state.filtered_meds];
      new_state.meds = [...state.meds];
      
      data = Object.assign({}, action.data);
      delete data.orig;
      new_state.meds[action.index] = data;
      new_state.filtered_meds[action.index] = action.data;
      
      return new_state;
      
    case 'DELETE_MED':
      new_state = Object.assign({}, state);
      new_state.filtered_meds = [...state.filtered_meds];
      new_state.meds = [...state.meds];
      
      
      console.log(action.findex, action.oindex);
      new_state.filtered_meds.splice(action.findex, 1);
      new_state.meds.splice(action.oindex, 1);
      
      return new_state;
      

    case 'ADD_HEALTH':
      new_state = Object.assign({}, state);
      new_state.filtered_health = [...state.filtered_health];
      new_state.health = [...state.health];
      
      new_state.health.push(action.data);
      
      console.log(new_state);
      return new_state;
      
    case 'EDIT_HEALTH':
      new_state = Object.assign({}, state);;
      
      new_state.filtered_health = [...state.filtered_health];
      new_state.health = [...state.health];
      
      data = Object.assign({}, action.data);
      delete data.orig;
      new_state.health[action.index] = data;
      new_state.filtered_health[action.index] = action.data;
      
      return new_state;
      
    case 'DELETE_HEALTH':
      new_state = Object.assign({}, state);
      
      new_state.filtered_health = [...state.filtered_health];
      new_state.health = [...state.health];
      
      
      console.log(action.findex, action.oindex);
      new_state.filtered_health.splice(action.findex, 1);
      new_state.health.splice(action.oindex, 1);
      
      return new_state;
      
    case 'ADD_SCHEDULE':
      new_state = Object.assign({}, state);
      new_state.filtered_schedule = [...state.filtered_schedule];
      new_state.schedule = [...state.schedule];
      
      new_state.schedule.push(action.data);
      
      console.log(new_state);
      return new_state;
      
    case 'EDIT_SCHEDULE':
      new_state = Object.assign({}, state);
      
      new_state.schedule = [...state.schedule];
      
      data = Object.assign({}, action.data);
      delete data.orig;
      new_state.schedule[action.index] = data;
      new_state.filtered_schedule[action.index] = action.data;
      
      return new_state;
      
    case 'DELETE_SCHEDULE':
      new_state = Object.assign({}, state);
      
      new_state.filtered_schedule = [...state.filtered_schedule];
      new_state.schedule = [...state.contacts];
      
      
      console.log(action.findex, action.oindex);
      new_state.filtered_schedule.splice(action.findex, 1);
      new_state.schedule.splice(action.oindex, 1);
      
      return new_state;
    
      case 'ADD_NOTES':
      new_state = Object.assign({}, state);
      new_state.filtered_notes = [...state.filtered_notes];
      new_state.notes = [...state.notes];
      
      new_state.notes.push(action.data);
      
      console.log(new_state);
      return new_state;
      
    case 'EDIT_NOTES':
      new_state = Object.assign({}, state);
      new_state.filtered_notes = [...state.filtered_notes];
      new_state.notes = [...state.notes];
      
      data = Object.assign({}, action.data);
      delete data.orig;
      new_state.notes[action.index] = data;
      new_state.filtered_notes[action.index] = action.data;
      
      return new_state;
      
    case 'DELETE_NOTES':
      new_state = Object.assign({}, state);
      new_state.filtered_notes = [...state.filtered_notes];
      new_state.notes = [...state.notes];
      
      
      console.log(action.findex, action.oindex);
      new_state.filtered.splice(action.findex, 1);
      new_state.notes.splice(action.oindex, 1);
      
      return new_state;
      
    default:
      return state;
  }
}


export default data