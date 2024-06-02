import {
  Box,
  Button,
  CardMedia,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function OneCardData({ cardData }) {
  const formatUrl = (url) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return "http://" + url;
    }
    return url;
  };

  return (
    <Box>
      <Box style={{ maxWidth: "100%", maxHeight: 400, overflow: "hidden" }}>
        <CardMedia
          component="img"
          image={cardData.image.url}
          alt={cardData.image.alt}
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Description:
                <Typography variant="h4" gutterBottom>
                  {cardData.description}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Title:<Typography>{cardData.title}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Subtitle:<Typography>{cardData.subtitle}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Business Number:<Typography>{cardData.bizNumber}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  component="a"
                  href={formatUrl(cardData.web)}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ marginLeft: 1 }}
                >
                  Go to Website
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Likes:<Typography>{cardData.likes.length}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Email:<Typography>{cardData.email}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Phone:<Typography>{cardData.phone}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Box>
  );
}
