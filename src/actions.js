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

