export const SET_DAY = "SET_DAY";
export const SET_DAYS = "SET_DAYS";
export const SET_APPOINTMENTS = "SET_APPOINTMENTS";
export const SET_INTERVIEWERS = "SET_INTERVIEWERS";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value };
    case SET_DAYS:
      return { ...state, days: action.value };
    case SET_INTERVIEWERS: {
      console.log("action set interviewers", action);

      return { ...state, interviewers: action.value };
    }
    case SET_APPOINTMENTS: {
      console.log("action set appointments", action);
      return { ...state, appointments: action.value };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default reducer;
