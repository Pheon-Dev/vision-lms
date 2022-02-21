import React from "react";
import { useParams } from "react-router-dom";
import CreateGroup from './CreateGroup'

export default function Group({ memberList }) {
  // const { memberList } = useParams();
  console.log(memberList)
  return (
    <>
      <div className="font-bold flex justify-center w-full text-3xl">
        All Groups Page
      </div>
      <br />
      <div className="font-bold flex justify-center w-full text-xl">
        Shows a list of all created groups.
      </div>
    </>
  );
}
