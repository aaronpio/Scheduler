export function getAppointmentsForDay(state, day) {
  const matchingDay = state.days.filter(dayEl => dayEl.name === day);

  if (matchingDay.length === 0) {
    return [];
  }

  const appointmentArrayOfIds = matchingDay[0].appointments;

  const intersection = appointmentArrayOfIds.map(apptId => {
    if (state.appointments[apptId]) {
      return state.appointments[apptId];
    } else {
      return "";
    }
  });

  return intersection;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerIdForAppt = interview.interviewer;

  const interviewerObject = state.interviewers[interviewerIdForAppt];

  return { ...interview, interviewer: interviewerObject };
}

export function getInterviewersForDay(state, day) {
  const matchingDay = state.days.filter(dayEl => dayEl.name === day);

  if (matchingDay.length === 0) {
    return [];
  }

  const interviewersArrayOfIds = matchingDay[0].interviewers;

  const intersection = interviewersArrayOfIds.map(apptId => {
    if (state.appointments[apptId]) {
      return state.interviewers[apptId];
    } else {
      return null;
    }
  });

  const interviewersArray = intersection.filter(interviewer => interviewer);

  return interviewersArray;
}
