import { useReducer, useEffect } from "react";

import Axios from "axios";

import reducer, {
  SET_DAY,
  SET_DAYS,
  SET_APPOINTMENTS,
  SET_INTERVIEWERS
} from "../reducers/appReducer";

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, value: day });
  const setDays = days => dispatch({ type: SET_DAYS, value: days });
  const setAppointments = appointments =>
    dispatch({ type: SET_APPOINTMENTS, value: appointments });
  const setInterviewers = interviewers =>
    dispatch({ type: SET_INTERVIEWERS, value: interviewers });

  useEffect(() => {
    Promise.all([
      Axios.get("/api/days"),
      Axios.get("/api/appointments"),
      Axios.get("/api/interviewers")
    ]).then(all => {
      setDays(all[0].data);
      setInterviewers(all[2].data);
      setAppointments(all[1].data);
    });
  }, []);

  const bookInterview = (id, interview) => {
    return Axios.put(`/api/appointments/${id}`, {
      interview
    }).then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      setAppointments(appointments);
      Axios.get("/api/days").then(res => setDays(res.data));
    });
  };

  const cancelInterview = id => {
    return Axios.delete(`/api/appointments/${id}`).then(() => {
      Axios.get("/api/days").then(res => setDays(res.data));
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
