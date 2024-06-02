import { Button } from "@mui/material";
import React, { useEffect } from "react";
import useCards from "../cards/hooks/useCards";

export default function LifeCycle() {
  const { getCardDetails } = useCards();
  useEffect(() => {
    console.log("The component has mount");

    return () => {
      console.log("The component has UNmount");
    };
  }, []);

  return (
    <>
      <div>Life Cycle</div>
      <Button onClick={()=>{getCardDetails("661e438b00b4d006b4fb08ef")}}>TEST</Button>
    </>
  );
}
