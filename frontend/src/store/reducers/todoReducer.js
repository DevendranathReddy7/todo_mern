const initialState = [
  {
    title: "",
    description: "",
    priority: "",
    status: "",
    date: "test",
  },
];

const TODO = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          title: payload.title,
          description: payload.description,
          priority: payload.priority,
          status: payload.status,
          date: payload.date,
        },
      ];
    case "EDIT":
      return "";
    case "DELETE":
      return "";
    default:
      return state;
  }
};

export default TODO;
