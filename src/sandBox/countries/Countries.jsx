import React from "react";
import CountriesTable from "./CountriesTable";
import useCountries from "../hooks/useCountries";

export default function Countries() {
  const { countriesList, refreshFunc, isLoading, error } = useCountries();

  return (
    <CountriesTable
      countriesList={countriesList}
      refreshFunc={refreshFunc}
      isLoading={isLoading}
      error={error}
    />
  );
}
