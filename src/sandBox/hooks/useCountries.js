import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useCountries() {
  const [countriesList, setCountriesList] = useState([]);
  const [effectTriger, setEffectTriger] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const refreshFunc = useCallback(() => {
    setCountriesList([]);
    setEffectTriger((prev) => !prev);
  }, []);

  useEffect(() => {
    const getAllCountries = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const data = response.data;
        setCountriesList(data);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
      setIsLoading(false);
    };

    getAllCountries();
  }, [effectTriger]);

  return { countriesList, refreshFunc, isLoading, error };
}

//   const getAllCountries = async () => {
//     const response = await axios.get("https://restcountries.com/v3.1/all");
//     const data = response.data;
//     setCountriesList(data);
//   };

// הדמיה של קוד למניעת תקיעה של התוכנה במקרה של תקלה במשיכת הנתונים:
