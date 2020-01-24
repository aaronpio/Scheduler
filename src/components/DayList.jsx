import React from "react";

import DayListItem from "./DayListItem";

const DayList = props => {
  const dayItemComponent = props.state.days.map(day => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.state.day}
      setDay={props.setDay}
    />
  ));

  return <ul>{dayItemComponent}</ul>;
};

export default DayList;
