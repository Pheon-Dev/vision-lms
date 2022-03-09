import React from "react";
import { useParams, useNavigate } from 'react-router-dom';

export default function ScheduleReport() {
  const { scheduleId } = useParams();
  const navigate = useNavigate();

  console.log(scheduleId)
  return (
    <>
      <div className="font-bold flex justify-center w-full text-3xl">
        Schedule Report
      </div>
      <br />
      <div className="font-bold flex justify-center w-full text-xl">
        Shows Specific Customer Loan Schedule
      </div>
    </>
  )
}




