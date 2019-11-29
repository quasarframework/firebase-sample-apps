export const setCurrentUserData = (state, data) => {
  state = Object.assign(state, data)
}

export const setEditUserDialog = (state, editUserDialog) => {
  state.editUserDialog = editUserDialog
}

export const setUserRooms = (state, userRooms) => {
  state.userRooms = userRooms
}
