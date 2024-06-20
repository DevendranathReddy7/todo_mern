const initialState = [];

const TODO = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "EDIT":
      return "";
    case "DELETE":
      return "";
    default:
      return state;
  }
};

export default TODO;
