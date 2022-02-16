import React from "react";
import { useParams } from "react-router-dom";
import CreateGroup from './CreateGroup'

export default function Group({ memberList }) {
  // const { memberList } = useParams();
  console.log(memberList)
  return (
    <div>Group</div>
  );
}
