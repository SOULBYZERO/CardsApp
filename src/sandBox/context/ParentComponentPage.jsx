import React from "react";
import DataProvider from "./DataProvider";
import ChildComponentPage from "./ChildComponentPage";

export default function ParentComponentPage() {
  return (
    <DataProvider>
      <div>
        Parent component
        <ChildComponentPage />
      </div>
    </DataProvider>
  );
}
