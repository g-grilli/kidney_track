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
    type: 'ADD_MEDS',
    data: data
  }
}

export function editMed (index, data) {
  return {
    type: 'EDIT_MEDS',
    index: index,
    data: data
  }
}

export function deleteMed (findex, oindex) {
  return {
    type: 'DELETE_MEDS',
    findex: findex,
    oindex: oindex
  }
}

export function initMed (data) {
  return {
    type: 'INIT_MEDS',
    data: data
  }
}





