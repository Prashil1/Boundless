const initState = {
  settings: null
};

const settingsReducer = (state = initState, action) => {
  switch (action.type) {
    case "update_settings":
      console.log("updating settings");
      return { ...state, settings: action.payload };
    case "invalid_report_user":
      console.log("did not reported user");
    case "valid_report_user":
      console.log("reported user");
    default:
      return state;
  }
};

export default settingsReducer;
