export function addContact (data) {
  return {
    type: 'ADD_CONTACT',
    data: data
  }
}

export function editContact (index, data) {
  return {
    type: 'EDIT_CONTACT',
    index: index,
    data: data
  }
}

export function deleteContact (findex, oindex) {
  return {
    type: 'DELETE_CONTACT',
    findex: findex,
    oindex: oindex
  }
}

export function initContacts (data) {
  return {
    type: 'INIT_CONTACTS',
    data: data
  }
}

export function doSort () {
  return {
    type: 'DO_SORT'
  }
}

export function doExpand (index, expanded) {
  return {
    type: 'DO_EXPAND',
    expanded: expanded,
    index: index
  }
}

export function doSearch (term) {
  return {
    type: 'DO_SEARCH',
    term: term
  }
}
export function addMed (data) {
  return {
    type: 'ADD_MED',
    data: data
  }
}

export function editMed (index, data) {
  return {
    type: 'EDIT_MED',
    index: index,
    data: data
  }
}

export function deleteMed (findex, oindex) {
  return {
    type: 'DELETE_MED',
    findex: findex,
    oindex: oindex
  }
}

export function initMed (data) {
  return {
    type: 'INIT_MED',
    data: data
  }
}
export function addHealth (data) {
  return {
    type: 'ADD_HEALTH',
    data: data
  }
}

export function editHealth (index, data) {
  return {
    type: 'EDIT_HEALTH',
    index: index,
    data: data
  }
}

export function deleteHealth (findex, oindex) {
  return {
    type: 'DELETE_HEALTH',
    findex: findex,
    oindex: oindex
  }
}

export function initHealth (data) {
  return {
    type: 'INIT_HEALTH',
    data: data
  }
}

export function addSchedule (data) {
  return {
    type: 'ADD_SCHEDULE',
    data: data
  }
}

export function editSchedule (index, data) {
  return {
    type: 'EDIT_SCHEDULE',
    index: index,
    data: data
  }
}

export function deleteSchedule (findex, oindex) {
  return {
    type: 'DELETE_SCHEDULE',
    findex: findex,
    oindex: oindex
  }
}

export function initSchedule (data) {
  return {
    type: 'INIT_SCHEDULE',
    data: data
  }
}

export function addNotes (data) {
  return {
    type: 'ADD_NOTES',
    data: data
  }
}

export function editNotes (index, data) {
  return {
    type: 'EDIT_NOTES',
    index: index,
    data: data
  }
}

export function deleteNotes (findex, oindex) {
  return {
    type: 'DELETE_NOTES',
    findex: findex,
    oindex: oindex
  }
}

export function initNotes (data) {
  return {
    type: 'INIT_NOTES',
    data: data
  }
}




