const INITIAL_APP = {
  appInit: false,
  layout: {}
}

export default function app(state = INITIAL_APP, action) {
  switch (action.type) {
    case 'INIT_LAYOUT_INFO':
      return {
        ...state,
        layout: action.layout
      }
    case 'CHANGE_APP_INIT_STATUS':
      return {
        ...state,
        appInit: action.appInit
      }
    default:
      return state
  }
}
