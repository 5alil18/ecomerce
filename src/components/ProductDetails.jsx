import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../contexts/productContext";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Snackbar,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function ProductDetails({ chosenproduct }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width:700px)");

  const { product } = useContext(ProductContext);

  const [selectedSize, setSelectedSize] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  

  const selectedProduct = product.find(
    (e) => e.id.toString() === id
  );

  function handleClick() {
    setOpenAlert(true);

    setTimeout(() => {
      setOpenAlert(false);
    }, 1500);
  }

  function handleProduct() {
    chosenproduct({...selectedProduct, selectedSize});
    console.log(selectedProduct);
  }

  // Produit introuvable
  if (!selectedProduct) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          px: 2,
          textAlign: "center",
        }}
      >
        <Typography variant={isMobile ? "h5" : "h4"}>
          Produit introuvable
        </Typography>

        <Button
          variant="contained"
          color="warning"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/products")}
        >
          Retour aux produits
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "95vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isMobile ? 3 : 4,
        px: isMobile ? 2 : 4,
        py: isMobile ? 3 : 5,
        boxSizing: "border-box",
      }}
    >
      {/* RETOUR */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 1100,
        }}
      >
        <Button
          variant="contained"
          color="warning"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/products")}
          size={isMobile ? "small" : "medium"}
        >
          Retour aux produits
        </Button>
      </Box>

      {/* CARD */}
      <Card
        sx={{
          width: "100%",
          maxWidth: 1100,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          borderRadius: isMobile ? 2 : 4,
          overflow: "hidden",
          boxShadow: 4,
        }}
      >
        {/* IMAGE */}
        <Box
          sx={{
            width: isMobile ? "100%" : "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: isMobile ? 2 : 4,
          }}
        >
          <CardMedia
            component="img"
            image={selectedProduct.imag}
            alt={selectedProduct.name}
            sx={{
              width: "100%",
              height: isMobile ? 280 : 500,
              maxWidth: isMobile ? 350 : 500,
              objectFit: "contain",
            }}
          />
        </Box>

        {/* INFORMATIONS */}
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: isMobile ? 2 : 3,
            p: isMobile ? 2.5 : 4,
          }}
        >
          {/* NOM */}
          <Typography
            variant={isMobile ? "h5" : "h3"}
            sx={{
              fontWeight: "bold",
              textAlign: isMobile ? "center" : "left",
              wordBreak: "break-word",
            }}
          >
            {selectedProduct.name}
          </Typography>

          {/* DESCRIPTION */}
          <Typography
            variant={isMobile ? "body2" : "body1"}
            sx={{
              textAlign: isMobile ? "center" : "left",
              lineHeight: 1.7,
            }}
          >
            {selectedProduct.details}
          </Typography>

          {/* PRIX */}
          <Typography
            variant={isMobile ? "h5" : "h4"}
            color="primary"
            sx={{
              fontWeight: "bold",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            {selectedProduct.prix} {selectedProduct.da}
          </Typography>

          {/* TAILLE */}
          <Box>
            <Typography
              variant={isMobile ? "body1" : "h6"}
              sx={{
                mb: 1.5,
                textAlign: isMobile ? "center" : "left",
                fontWeight: "bold",
              }}
            >
              Taille :
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                justifyContent: isMobile
                  ? "center"
                  : "flex-start",
              }}
            >
              {selectedProduct.size.map((size) => (
                <Button
                  key={size}
                  variant={
                    selectedSize === size
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() => setSelectedSize(size)}
                  sx={{
                    minWidth: isMobile ? 50 : 60,
                  }}
                >
                  {size.toUpperCase()}
                </Button>
              ))}
            </Box>
          </Box>

          {/* QUANTITÉ */}
          <Typography
            variant="body1"
            sx={{
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Quantité disponible :{" "}
            <strong>{selectedProduct.quantiti}</strong>
          </Typography>

          {/* MESSAGE ERREUR */}
          {!selectedSize && (
            <Typography
              color="error"
              variant="body2"
              sx={{
                textAlign: isMobile ? "center" : "left",
              }}
            >
              Veuillez choisir une taille
            </Typography>
          )}

          {/* PANIER */}
          <Button
            variant="contained"
            size={isMobile ? "medium" : "large"}
            fullWidth
            disabled={!selectedSize}
            startIcon={<ShoppingCartIcon />}
            onClick={() => {
              handleProduct();
              handleClick();
            }}
            sx={{
              mt: 1,
              py: isMobile ? 1.2 : 1.5,
            }}
          >
            Ajouter au panier
          </Button>
        </CardContent>
      </Card>

      {/* MESSAGE SUCCESS */}
      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: isMobile ? "center" : "right",
        }}
        message="Le produit est ajouté au panier"
      />
    </Box>
  );
}
