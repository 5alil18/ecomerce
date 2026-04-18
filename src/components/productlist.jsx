import { ProductContext } from "../contexts/productContext";
import { useContext } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { Divider } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Productlist({ chosenproduct }) {
  const isMobile = useMediaQuery("(max-width:700px)");

  function handleproduct(e) {
    chosenproduct(e);
  }
  const { product } = useContext(ProductContext);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1500);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent:'center',
        gap: 10,
        minHeight: "100vh",
        py:5
      }}
    >
      <Typography
        variant={isMobile ? "h4" : "h3"}
        color="primary"
        sx={{ textAlign: "center", py:isMobile?5:2 }}
        data-aos="zoom-in-down"

      >
        Notre produits
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-AROUND",
          alignItems: "center",
          gap: 6,
          flexWrap: "wrap",
        }}
      >
        {product.map((e) => {
          return (
            <Card
              data-aos="zoom-in"
              key={e.id}
              sx={{
                maxWidth: 345,
                borderRadius: 2,
                "&:hover": {
                  scale: !isMobile ? 1.1 : 1,
                  transition: "all 0.3s",
                  boxShadow: "0px 0px 10px 10px  rgba(139, 92, 246, 0.8)",
                },
              }}
            >
              <CardMedia
                sx={{ height: 300, objectFit: "contain", width: "100%" }}
                image={e.imag}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  color="primary"
                  variant="h5"
                  sx={{ textAlign: "center" }}
                >
                  {e.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", textAlign: "center" }}
                >
                  {e.details}
                </Typography>
              </CardContent>
              <CardActions>
                <Typography variant="h6" color="primary" sx={{ mx: "auto" }}>
                  {e.prix} {e.da}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ m: "auto", gap: 2 }}
                  onClick={() => {
                    handleproduct(e);
                    handleClick();
                  }}
                >
                  add to card
                  <AddShoppingCartIcon></AddShoppingCartIcon>
                </Button>
              </CardActions>
            </Card>
          );
        })}
        {/* //////////////////////////////////snackbar ///////////////////////////////////*/}
        <Snackbar
          open={open}
          autoHideDuration={2000}
          message="le produit est ajouté dans la pannié"
        />
      </Box>
    </Box>
  );
}
