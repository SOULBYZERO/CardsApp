import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  IconButton,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routs/routsModel";
import { useUser } from "../users/providers/UserProvider";
import { Carousel } from "react-responsive-carousel";
import CardComponent from "../cards/components/card/CardComponent";
import useCards from "../cards/hooks/useCards";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PageHeader from "../components/PageHeader";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { value, getAllCards, handleCardLike, handleCardDelete } = useCards();
  const [mostLikedCards, setMostLikedCards] = useState([]);
  const { filteredCards = [] } = value;
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    getAllCards();
  }, [getAllCards]);

  let centerSlidePercentage = 33.33;
  if (isMediumScreen) {
    centerSlidePercentage = 50;
  } else if (isSmallScreen) {
    centerSlidePercentage = 100;
  }

  useEffect(() => {
    if (filteredCards && filteredCards.length > 0) {
      const sortedCards = [...filteredCards].sort(
        (a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)
      );
      setMostLikedCards(sortedCards.slice(0, 3));
    } else {
      setMostLikedCards([]);
    }
  }, [filteredCards]);

  return (
    <>
      <PageHeader
        title="Welcome to Business Cards Library"
        subtitle="Free and fun website for businesses advertising"
      />
      <Paper
        elevation={3}
        sx={{ padding: 4, mt: 4, mb: 4, maxWidth: "1100px", mx: "auto" }}>
        <Container sx={{ textAlign: "center", mt: 4 }}>
          <Box sx={{ my: 4 }}>
            <Typography variant="h5" gutterBottom>
              <strong>Explore our users designs</strong>
            </Typography>
            <Box justifyContent="center" display="flex">
              <Box width="100%">
                <Carousel
                  showThumbs={false}
                  infiniteLoop
                  showStatus={false}
                  showIndicators={false} // Set to true to show page dots
                  centerMode
                  autoPlay
                  stopOnHover
                  interval={5000}
                  transitionTime={1000}
                  centerSlidePercentage={centerSlidePercentage}
                  sx={{
                    marginTop: "200px",
                  }}>
                  {(filteredCards ?? []).length > 0 ? (
                    filteredCards.map((item, index) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", justifyContent: "center" }}>
                        <CardComponent
                          key={item._id}
                          card={item}
                          handleCardDelete={handleCardDelete}
                          handleCardLike={handleCardLike}
                        />
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body1">No cards available</Typography>
                  )}
                </Carousel>
              </Box>
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => {
                navigate(ROUTES.CARDS);
              }}>
              Explore more Designs
            </Button>
          </Box>
          <Box sx={{ my: 4, py: 4, backgroundColor: "transparent" }}>
            <Typography sx={{ color: "default" }} variant="h5" gutterBottom>
              <strong>
                Discover the Difference: Why Choose Us for Your Business Cards?
              </strong>
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {[
                {
                  title: "Create Business Cards Easily",
                  description:
                    "With our user-friendly builder, you can create and update your business cards in minutes.",
                  icon: "computer",
                  image: "/assets/imgs/customize.png",
                },
                {
                  title: "Search for Businesses",
                  description:
                    "Easily find other businesses on our site and see how many likes they have.",
                  icon: "search",
                  image: "/assets/imgs/Search.png",
                },
                {
                  title: "Reach More Customers",
                  description:
                    "Using our site allows you to reach out to more customers and enhance your advertising.",
                  icon: "thumb_up",
                  image: "/assets/imgs/Reach.png",
                },
              ].map((item, index) => (
                <Grid item key={index} xs={12} md={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ marginTop: 16, maxWidth: "30%" }}
                    />
                    <Typography
                      sx={{ color: "default" }}
                      variant="h6"
                      gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: "default" }} variant="body1">
                      {item.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            {user && user.isBusiness === false ? (
              <Box sx={{ paddingTop: 5 }}>
                <Typography>
                  <strong>
                    You must be registered as Business to create Business cards
                  </strong>
                </Typography>
              </Box>
            ) : null}
            {user && user.isBusiness === true ? (
              <Button
                onClick={() => {
                  navigate(ROUTES.CREATE_CARD);
                }}
                variant="contained"
                color="primary"
                sx={{ mt: 4 }}>
                Create new Business Card
              </Button>
            ) : null}
            {!user ? (
              <Button
                onClick={() => {
                  navigate(ROUTES.SIGNUP);
                }}
                variant="contained"
                color="primary"
                sx={{ mt: 4 }}>
                Signup
              </Button>
            ) : null}
          </Box>
          <Box sx={{ my: 4 }}>
            <Typography variant="h5" gutterBottom>
              <strong>Our Most Liked Business Cards</strong>
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {(mostLikedCards ?? []).length > 0 ? (
                mostLikedCards.map((item, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <CardComponent
                      card={item}
                      handleCardDelete={handleCardDelete}
                      handleCardLike={handleCardLike}
                    />
                  </Grid>
                ))
              ) : (
                <Typography variant="body1">
                  No top liked cards available
                </Typography>
              )}
            </Grid>
          </Box>
        </Container>
      </Paper>
    </>
  );
};

export default HomePage;
