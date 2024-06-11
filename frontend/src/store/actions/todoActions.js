export const add = (payload) => ({
  type: "ADD",
  payload: payload,
});

export const edit = (payload, id) => ({
  type: "EDIT",
  payload: { payload, id },
});

export const Delete = (id) => ({
  type: "DELETE",
  payload: id,
});
