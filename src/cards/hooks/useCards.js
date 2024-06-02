import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createCard,
  deleteCard,
  likeCard,
  editCard,
  getAllCardsService,
  getCardDetailsService,
  getLocationCoordinate,
} from "../services/cardsApiService";
import { useSnackbar } from "../../providers/SnackbarProvider";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ROUTES from "../../routs/routsModel";
import normalizeCard from "../helpers/normalization/normalizeCard";
import useAxios from "../../hooks/useAxios";
import normalizeAddress from "../helpers/normalization/normalizeAddress";
import { useUser } from "../../users/providers/UserProvider";

export default function useCards(id) {
  const [cardsList, setCardsList] = useState([]);
  const [cardData, setCardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [mapCenter, setMapCenter] = useState({});
  const { snackbarActivation } = useSnackbar();
  const [query, setQuery] = useState("");
  const [filteredCards, setFilter] = useState(null);
  const [searchParams] = useSearchParams();
  const [filterCount, setfilterCount] = useState();
  const navigate = useNavigate();
  const { user } = useUser();
  const location = useLocation();

  useAxios();

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    const getFilteredCards = () => {
      if (user) {
        switch (location.pathname) {
          case "/my-cards":
            return cardsList.filter((card) => card.user_id === user._id);
          case "/fav-cards":
            return cardsList.filter((card) => card.likes.includes(user._id));
          default:
            return cardsList;
        }
      }
      return cardsList;
    };
    if (cardsList) {
      const cards1 = getFilteredCards();
      setFilter(
        cards1.filter(
          (card) =>
            card.title.includes(query) ||
            String(card.bizNumber).includes(query) ||
            card.phone.includes(query) ||
            card.email.includes(query) ||
            card.subtitle.includes(query) ||
            card.address.city.includes(query)
        )
      );
    }
  }, [cardsList, query, location.pathname, user]);

  useEffect(() => {
    if (filteredCards !== null && filteredCards.length >= 0) {
      setfilterCount(filteredCards.length);
    }
  }, [filteredCards]);

  const getAllCards = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await getAllCardsService();
      setCardsList(data);
      snackbarActivation("success", "All the cards are here");
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
    setIsLoading(false);
  }, [snackbarActivation]);

  const getCardDetails = useCallback(async (id) => {
    try {
      setIsLoading(true);
      const data = await getCardDetailsService(id);
      setCardData(data);
      setIsLoading(false);
      return data;
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const handleCreateCard = useCallback(
    async (cardFromClient) => {
      setError(null);
      setIsLoading(true);

      try {
        const card = await createCard(normalizeCard(cardFromClient));
        setCardData(card);
        snackbarActivation("success", "A new business card has been created");
        setTimeout(() => {
          navigate(ROUTES.ROOT);
        }, 1000);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    [snackbarActivation, navigate]
  );

  const handleUpdateCard = useCallback(
    async (cardId, cardFromClient) => {
      setIsLoading(true);

      try {
        const card = await editCard(cardId, normalizeCard(cardFromClient));
        setCardData(card);
        snackbarActivation(
          "success",
          "The business card has been successfully updated"
        );
        setTimeout(() => {
          navigate(ROUTES.ROOT);
        }, 1000);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    [snackbarActivation, navigate]
  );

  const handleCardDelete = useCallback(
    async (id) => {
      try {
        const card = await deleteCard(id);
        setCardData(card);
        snackbarActivation("primary", "You deleted card No. " + id, "filled");
        setTimeout(() => {
          getAllCards();
        }, 1000);
      } catch (error) {
        setError(error.message);
      }
    },
    [snackbarActivation, getAllCards]
  );

  const handleCardLike = useCallback(async (id, user) => {
    try {
      const card = await likeCard(id);
      setCardData(card);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const addressForMap = useCallback(async (address) => {
    setIsLoading(true);
    setError(null);
    try {
      const center = await getLocationCoordinate(normalizeAddress(address));
      setMapCenter(center);
    } catch (error) {
      setMapCenter(false);
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  const value = useMemo(() => {
    return {
      cardData,
      isLoading,
      error,
      cardsList,
      filteredCards,
      filterCount,
    };
  }, [cardData, isLoading, error, cardsList, filteredCards, filterCount]);

  return {
    value,
    mapCenter,
    handleCardDelete,
    handleCardLike,
    getAllCards,
    getCardDetails,
    handleCreateCard,
    handleUpdateCard,
    addressForMap,
  };
}
