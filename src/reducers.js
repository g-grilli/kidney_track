import debounce from 'debounce';
import {doNSort, doNSearch, doSort, doSearch, doSSort, doSSearch, doHSort, doHSearch, doMSort, doMSearch} from './actions';
import store from './store';

function sort_state () {
  store.dispatch(doSort());
}

function sort_state2 () {
  store.dispatch(doNSort());
}

function sort_state3 () {
  store.dispatch(doSSort());
}

function sort_state4 () {
  store.dispatch(doHSort());
}

function sort_state5 () {
  store.dispatch(doMSort());
}

var debounceSort = debounce(sort_state, 1000);
var debounceSort2 = debounce(sort_state2, 1000);
var debounceSort3 = debounce(sort_state3, 1000);
var debounceSort4 = debounce(sort_state4, 1000);
var debounceSort5 = debounce(sort_state5, 1000);

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

function compareHealth(a,b) {
  if (a.notes < b.notes) {
    return -1;
  }
  if (a.notes > b.notes) {
    return 1;
  } 
  return 0;
}

function compareMed(a,b) {
  if (a.drugName < b.drugName) {
    return -1;
  }
  if (a.drugName > b.drugName) {
    return 1;
  } 
  return 0;
}

function compareSchedule(a,b) {
  if (a.lastName < b.lastName) {
    return -1;
  }
  if (a.lastName > b.lastName) {
    return 1;
  } 
  return 0;
}

function compareNote(a,b) {
  if (a.note < b.note) {
    return -1;
  }
  if (a.note > b.note) {
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
      
      new_state.filtered[action.index].expanded = action.expanded;
      
      return new_state;
      
    case 'INIT_DATA':
      new_state = Object.assign({}, state, action.data);
      var filtered_notes = [];
      if (action.data.notes) {
        action.data.notes.forEach(function (n, index) {
          filtered_notes.push(Object.assign({}, n, {orig: index, expanded: false}));
        });
      }
      new_state.filtered_notes = filtered_notes;
      
      var filtered_meds = [];
      if (action.data.meds) {
        action.data.meds.forEach(function (m, index) {
          filtered_meds.push(Object.assign({}, m, {orig: index, expanded: false}));
        });
      }
      new_state.filtered_meds = filtered_meds;
      
      var filtered_schedule = [];
      if (action.data.schedule) {
        action.data.schedule.forEach(function (s, index) {
          filtered_schedule.push(Object.assign({}, s, {orig: index, expanded: false}));
        });
      }
      new_state.filtered_schedule = filtered_schedule;
      
      var filtered_health = [];
      if (action.data.health) {
        action.data.health.forEach(function (h, index) {
          filtered_health.push(Object.assign({}, h, {orig: index, expanded: false}));
        });
      }
      new_state.filtered_health = filtered_health;
      
      
      return new_state;
      
    case 'ADD_MED':
      new_state = Object.assign({}, state);
      new_state.filtered_meds = [...state.filtered_meds];
      new_state.meds = [...state.meds];
      
      new_state.meds.push(action.data);
      
      setTimeout(function() {
        store.dispatch(doMSearch(state.term || ''));
      });
      
      console.log(new_state);
      return new_state;
      
      
    case 'EDIT_MED':
      new_state = Object.assign({}, state);
      new_state.filtered_meds = [...state.filtered_meds];
      new_state.meds = [...state.meds];
      
      data = Object.assign({}, action.data);
      delete data.orig;
      new_state.meds[action.data.orig] = data;
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
    
    case 'DO_MSORT':
      new_state = Object.assign({}, state);
      
      new_state.filtered_meds = [...state.filtered_meds];
      new_state.meds = [...state.meds];
      
      new_state.filtered_meds.sort(compareMed);
      new_state.meds.sort(compareMed);
      return new_state;
      
    case 'DO_MSEARCH':
      var filter_meds = [];
      var meds = [];
      new_state = Object.assign({}, state);
      
      state.meds.forEach(function (c, index) {
        if (c.drugName.toLowerCase().search(action.term.toLowerCase()) > -1) {
          filter_meds.push(
            Object.assign({}, c, {orig: index, expanded: false})
          );
        }
        
        meds.push(Object.assign({}, c));
      });
      
      new_state.meds = meds;
      new_state.filtered_meds = filter_meds;
      new_state.term = action.term;
      debounceSort5();
      return new_state;
    
    case 'DO_MEXPAND':
      new_state = Object.assign({}, state);
      
      new_state.filtered_meds = [...state.filtered_meds];
      new_state.meds = [...state.meds];
    
      
      new_state.filtered_meds[action.index].expanded = action.expanded;
      
      return new_state;  

    case 'ADD_HEALTH':
      new_state = Object.assign({}, state);
      new_state.filtered_health = [...state.filtered_health];
      new_state.health = [...state.health];
      
      new_state.health.push(action.data);
      
      setTimeout(function() {
        store.dispatch(doHSearch(state.term || ''));
      });
      
      console.log(new_state);
      return new_state;
      
    case 'EDIT_HEALTH':
      new_state = Object.assign({}, state);
      new_state.filtered_health = [...state.filtered_health];
      new_state.health = [...state.health];
      
      data = Object.assign({}, action.data);
      delete data.orig;
      console.log(action.data);
      new_state.health[action.data.orig] = data;
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
    
    case 'DO_HSORT':
      new_state = Object.assign({}, state);
      
      new_state.filtered_health = [...state.filtered_health];
      new_state.health = [...state.health];
      
      new_state.filtered_health.sort(compareHealth);
      new_state.health.sort(compareHealth);
      return new_state;
      
    case 'DO_HSEARCH':
      var filter_health = [];
      var health = [];
      new_state = Object.assign({}, state);
      
      state.health.forEach(function (c, index) {
        if (c.notes.toLowerCase().search(action.term.toLowerCase()) > -1) {
          filter_health.push(
            Object.assign({}, c, {orig: index, expanded: false})
          );
        }
        
        health.push(Object.assign({}, c));
      });
      
      new_state.health = health;
      new_state.filtered_health = filter_health;
      new_state.term = action.term;
      debounceSort4();
      return new_state;
    
    case 'DO_HEXPAND':
      new_state = Object.assign({}, state);
      
      new_state.filtered_health = [...state.filtered_health];
      new_state.health = [...state.health];
    
      
      new_state.filtered_health[action.index].expanded = action.expanded;
      
      return new_state;
      
    case 'ADD_SCHEDULE':
      new_state = Object.assign({}, state);
      new_state.filtered_schedule = [...state.filtered_schedule];
      new_state.schedule = [...state.schedule];
      
      new_state.schedule.push(action.data);
      
      setTimeout(function() {
        store.dispatch(doSSearch(state.term || ''));
      });
      
      console.log(new_state);
      return new_state;
      
    case 'EDIT_SCHEDULE':
      new_state = Object.assign({}, state);
      new_state.filtered_schedule = [...state.filtered_schedule];
      new_state.schedule = [...state.schedule];
      
      data = Object.assign({}, action.data);
      delete data.orig;
      console.log(action.data);
      new_state.schedule[action.data.orig] = data;
      new_state.filtered_schedule[action.index] = action.data;
      
      return new_state;
      
    case 'DELETE_SCHEDULE':
      new_state = Object.assign({}, state);
      new_state.filtered_schedule = [...state.filtered_schedule];
      new_state.schedule = [...state.schedule];
      
      
      console.log(action.findex, action.oindex);
      new_state.filtered_schedule.splice(action.findex, 1);
      new_state.schedule.splice(action.oindex, 1);
      
      return new_state;
      
    case 'DO_SSORT':
      new_state = Object.assign({}, state);
      
      new_state.filtered_schedule = [...state.filtered_schedule];
      new_state.schedule = [...state.schedule];
      
      new_state.filtered_schedule.sort(compareSchedule);
      new_state.schedule.sort(compareSchedule);
      return new_state;
      
    case 'DO_SSEARCH':
      var filter_schedule = [];
      var schedule = [];
      new_state = Object.assign({}, state);
      
      state.schedule.forEach(function (c, index) {
        if (c.lastName.toLowerCase().search(action.term.toLowerCase()) > -1) {
          filter_schedule.push(
            Object.assign({}, c, {orig: index, expanded: false})
          );
        }
        
        schedule.push(Object.assign({}, c));
      });
      
      new_state.schedule = schedule;
      new_state.filtered_schedule = filter_schedule;
      new_state.term = action.term;
      debounceSort3();
      return new_state;
    
    case 'DO_SEXPAND':
      new_state = Object.assign({}, state);
      
      new_state.filtered_schedule = [...state.filtered_schedule];
      new_state.schedule = [...state.schedule];
    
      
      new_state.filtered_schedule[action.index].expanded = action.expanded;
      
      return new_state;
    
      case 'ADD_NOTES':
      new_state = Object.assign({}, state);
      new_state.filtered_notes = [...state.filtered_notes];
      new_state.notes = [...state.notes];
      
      new_state.notes.push(action.data);
      
      setTimeout(function() {
        store.dispatch(doNSearch(state.term || ''));
      });
      
      console.log(new_state);
      return new_state;
      
    case 'EDIT_NOTES':
      new_state = Object.assign({}, state);
      new_state.filtered_notes = [...state.filtered_notes];
      new_state.notes = [...state.notes];
      
      data = Object.assign({}, action.data);
      delete data.orig;
      console.log(action.data);
      new_state.notes[action.data.orig] = data;
      new_state.filtered_notes[action.index] = action.data;
      
      return new_state;
      
    case 'DELETE_NOTES':
      new_state = Object.assign({}, state);
      new_state.filtered_notes = [...state.filtered_notes];
      new_state.notes = [...state.notes];
      
      
      console.log(action.findex, action.oindex);
      new_state.filtered_notes.splice(action.findex, 1);
      new_state.notes.splice(action.oindex, 1);
      
      return new_state;

    case 'DO_NSORT':
      new_state = Object.assign({}, state);
      
      new_state.filtered_notes = [...state.filtered_notes];
      new_state.notes = [...state.notes];
      
      new_state.filtered_notes.sort(compareNote);
      new_state.notes.sort(compareNote);
      return new_state;
      
    case 'DO_NSEARCH':
      var filter_notes = [];
      var notes = [];
      new_state = Object.assign({}, state);
      
      state.notes.forEach(function (c, index) {
        if (c.note.toLowerCase().search(action.term.toLowerCase()) > -1) {
          filter_notes.push(
            Object.assign({}, c, {orig: index, expanded: false})
          );
        }
        
        notes.push(Object.assign({}, c));
      });
      
      new_state.notes = notes;
      new_state.filtered_notes = filter_notes;
      new_state.term = action.term;
      debounceSort2();
      return new_state;
    
    case 'DO_NEXPAND':
      new_state = Object.assign({}, state);
      
      new_state.filtered_notes = [...state.filtered_notes];
      new_state.notes = [...state.notes];
    
      
      new_state.filtered_notes[action.index].expanded = action.expanded;
      
      return new_state;
    
      
    default:
      return state;
  }
}

  


export default data