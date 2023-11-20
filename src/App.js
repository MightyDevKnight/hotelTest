import React from "react";
import RoomAllocation from "./component/RoomAllocation";

export const App = () => {
  return (
    <RoomAllocation
      guest={10}
      room={3}
      onChange={(result) => console.log(result)}
    />
  );
};
