import { Card, CardActionArea } from "@mui/material";
import CardHeaderComponent from "./CardHeaderComponent";
import CardBody from "./CardBody";
import CardActionBar from "./CardActionBar";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routs/routsModel";

function CardComponent({ card, handleCardDelete, handleCardLike }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: 250, m: 2 }}>
      <CardActionArea
        onClick={() => navigate(ROUTES.CARD_INFO + "/" + card._id)}>
        <CardHeaderComponent image={card.image} />
        <CardBody
          title={card.title}
          subtitle={card.subtitle}
          phone={card.phone}
          address={card.address}
          cardNumber={card.bizNumber}
          cardLikes={card.likes.length}
        />
      </CardActionArea>
      <CardActionBar
        cardId={card._id}
        userId={card.user_id}
        handleCardDelete={handleCardDelete}
        handleCardLike={handleCardLike}
        cardLikes={card.likes}
        cardTitle={card.title}
        cardPhone={card.phone}
      />
    </Card>
  );
}

export default CardComponent;
