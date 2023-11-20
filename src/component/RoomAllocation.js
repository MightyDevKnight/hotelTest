import React, { useState, useEffect } from "react";
import CustomInputNumber from "./common/CustomInputNumber";
import "./RoomAllocation.css";

const RoomAllocation = ({ guest, room, onChange }) => {
  const [allocation, setAllocation] = useState([]);
  const [remainingGuests, setRemainGuests] = useState(0);

  useEffect(() => {
    allocateRooms();
    setRemainGuests(guest - room);
  }, []);

  const allocateRooms = () => {
    const totalCapacity = room * 4;
    const allocatedGuests = Math.min(guest, totalCapacity);

    const allocatedRooms = [];
    for (let i = 0; i < room; i++) {
      if (i < allocatedGuests) {
        allocatedRooms.push({ adult: 1, child: 0 });
      } else {
        allocatedRooms.push({ adult: 0, child: 0 });
      }
    }

    setAllocation(allocatedRooms);

    if (onChange) {
      onChange(allocatedRooms);
    }
  };

  const getTotalAllocationNumber = (updatedAllocation) => {
    return updatedAllocation.reduce((a, { adult, child }) => {
      return a + adult + child;
    }, 0);
  };

  const handleAdultChange = (index, value) => {
    const updatedAllocation = [...allocation];
    updatedAllocation[index].adult = value;
    const totalAllocationNumber = getTotalAllocationNumber(updatedAllocation);
    setRemainGuests(guest - totalAllocationNumber);

    setAllocation(updatedAllocation);
    if (onChange) {
      onChange(updatedAllocation);
    }
  };

  const handleChildChange = (index, value) => {
    const updatedAllocation = [...allocation];
    updatedAllocation[index].child = value;
    const totalAllocationNumber = getTotalAllocationNumber(updatedAllocation);
    setRemainGuests(guest - totalAllocationNumber);
    setAllocation(updatedAllocation);
    if (onChange) {
      onChange(updatedAllocation);
    }
  };

  return (
    <div className="room-allocation-form">
      <div>
        住客人數 ：{guest}人/{room}房
      </div>
      <div className="room-remainGuest">尚未分配人數 ：{remainingGuests}人</div>
      {allocation.map((roomAllocation, index) => (
        <div key={index} className="room-form">
          <div>房門 ：{roomAllocation.adult + roomAllocation.child}人</div>
          <div className="room-adult-child-form">
            <div>
              大人
              <br />
              <span style={{ color: "grey" }}>年龄 20+</span>
            </div>
            <CustomInputNumber
              min={1}
              max={4}
              step={1}
              name={`adult-${index}`}
              value={roomAllocation.adult}
              onChange={(event) => handleAdultChange(index, event.target.value)}
              disabled={
                remainingGuests === 0 ||
                roomAllocation.adult + roomAllocation.child >= 4
              }
            />
          </div>
          <div className="room-adult-child-form">
            小孩
            <CustomInputNumber
              min={0}
              max={4}
              step={1}
              name={`child-${index}`}
              value={roomAllocation.child}
              onChange={(event) => handleChildChange(index, event.target.value)}
              disabled={
                remainingGuests === 0 ||
                roomAllocation.adult + roomAllocation.child >= 4
              }
            />
          </div>
          <hr className="room-divider" />
        </div>
      ))}
    </div>
  );
};

export default RoomAllocation;
