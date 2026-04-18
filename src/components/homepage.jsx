import { Container, Typography, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
export default function Homepage() {
  const isMobile = useMediaQuery("(max-width:700px)");
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        mt: 2,
        gap: 9,
        color: "purple",
        mx: "auto",
      }}
    >
      <Typography variant={isMobile ? "h3" : "h1"} data-aos="fade-left">
        Collection
      </Typography>
      <Typography variant={isMobile ? "h3" : "h1"} data-aos="fade-right">
        EARA
      </Typography>
      <Typography variant={isMobile ? "body2" : "h6"} data-aos="fade-left">
        Découvrez nos produits premium avec une palette
      </Typography>
      <Button
        data-aos="fade-right"
        variant="contained"
        color="primary"
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "space-evenly",
          alignItems: "center",
          p: 2,
          borderRadius: 22,
        }}
        component={Link}
        to={'/products'}
      >
        Explorer la collection
        <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
      </Button>
    </Container>
  );
}
