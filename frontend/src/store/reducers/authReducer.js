const initialState = {
  currentUser: "",
  name: "",
};

const AUTH = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        currentUser: action.payload.id,
        name: action.payload.name,
      };

    default:
      return state;
  }
};

export default AUTH;
