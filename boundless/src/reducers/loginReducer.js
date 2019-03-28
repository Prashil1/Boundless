const initState = {
  error: null
};

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case "invalid_login":
      // console.log("Login Error");


      console.log(JSON.stringify(state))
      
      return { ...state, error: "Invalid email or password" };

    case "valid_login":
      console.log("Login Success");
      return { ...state, error: null };

    case "valid_signup":
      console.log("Signup Success");
      return { ...state, error: null };

    case "invalid_signup":
      console.log("Signup Unsuccessfull");
      return { ...state, error: "Signup failed" };

    case "sign_out":
      console.log("SignOut Good");
      return state;

    default:
      return state;
  }
};

export default loginReducer;
