import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

const DayListItem = ({ name, spots, selected, setDay }) => {
  const dayClass = classNames("day-list__item", {
    selected: selected,
    full: spots === 0
  });

  const formatSpots = () => {
    switch (spots) {
      default:
        break;
      case 0:
        spots = "no spots remaining";
        break;
      case 1:
        spots = "1 spot remaining";
        break;
      case 2:
        spots = "2 spots remaining";
        break;
      case 3:
        spots = "3 spots remaining";
        break;
      case 4:
        spots = "4 spots remaining";
        break;
      case 5:
        spots = "5 spots remaining";
        break;
    }
    return spots;
  };

  return (
    <li className={dayClass} onClick={() => setDay(name)} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
};

export default DayListItem;
