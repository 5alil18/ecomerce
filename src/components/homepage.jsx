import { Box, Button, Container, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../contexts/productContext";
import "./homepage.css";

export default function Homepage() {
  const { product } = useContext(ProductContext);
  const featuredProduct = product[1] || product[0];

  return (
    <Container maxWidth="xl" className="home-page">
      <Box component="section" className="hero">
        <Box className="hero-copy" data-aos="fade-right">
          <Typography className="hero-eyebrow">
            L’élégance, tout simplement
          </Typography>
          <Typography component="h1" className="hero-title">
            Collection
            <span>EARA</span>
          </Typography>
          <Typography className="hero-description">
            Découvrez une collection pensée pour vous. Des pièces
            soigneusement sélectionnées, faites pour accompagner votre style au
            quotidien.
          </Typography>
          <Box className="hero-actions">
            <Button
              component={Link}
              to="/products"
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon />}
              className="hero-primary-action"
            >
              Découvrir la collection
            </Button>
            <Button component={Link} to="/contact" className="hero-secondary-action">
              Nous contacter
            </Button>
          </Box>
          <Box className="hero-note">
            <span className="hero-note-line" />
            <Typography>Une signature. Votre style.</Typography>
          </Box>
        </Box>

        <Box className="hero-visual" data-aos="fade-left">
          <Box className="hero-image-frame">
            {featuredProduct && (
              <Box
                component="img"
                src={featuredProduct.imag}
                alt={featuredProduct.name}
                className="hero-product-image"
              />
            )}
            <Box className="hero-image-label">
              <Typography variant="overline">La collection EARA</Typography>
              <Typography variant="h6">L’essentiel, avec caractère.</Typography>
            </Box>
          </Box>
          <Box className="hero-stamp" aria-hidden="true">
            <span>EARA</span>
            <span>EST. WITH CARE</span>
          </Box>
        </Box>
      </Box>
      <Box className="hero-bottom-rule">
        <span>01 / Une sélection pensée pour vous</span>
        <span>Découvrez nos nouveautés&nbsp; ↓</span>
      </Box>
    </Container>
  );
}
