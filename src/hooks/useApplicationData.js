import React, { useState } from "react";

import Axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  Promise.all([
    Axios.get("http://localhost:8001/api/days"),
    Axios.get("http://localhost:8001/api/appointments"),
    Axios.get("http://localhost:8001/api/interviewers")
  ]).then(all => {
    setState(prev => ({
      ...prev,
      days: all[0].data,
      appointments: all[1].data,
      interviewers: all[2].data
    }));
  });

  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    return Axios.put(`http://localhost:8001/api/appointments/${id}`, {
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

      setState({
        ...state,
        appointments
      });
    });
  };

  const cancelInterview = id => {
    return Axios.delete(`http://localhost:8001/api/appointments/${id}`);
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
