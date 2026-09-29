import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Drawer,
  Typography,
} from "@mui/material";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductContext } from "../contexts/productContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./productlist.css";

export default function Productlist({ chosenproduct }) {
  const isMobile = useMediaQuery("(max-width:700px)");
  const { product } = useContext(ProductContext);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const categories = useMemo(
    () => ["Tous", ...new Set(product.map((item) => item.category).filter(Boolean))],
    [product]
  );

  const filteredProducts =
    selectedCategory === "Tous"
      ? product
      : product.filter((item) => item.category === selectedCategory);

  const renderCategoryButton = (category) => (
    <Button
      key={category}
      variant={selectedCategory === category ? "contained" : "outlined"}
      onClick={() => {
        setSelectedCategory(category);
        setDrawerOpen(false);
      }}
      className={`category-button${selectedCategory === category ? " is-selected" : ""}`}
    >
      {category}
    </Button>
  );

  return (
    <Box component="section" className="products-section">
      <Box className="products-heading">
        <Typography className="products-eyebrow">L’univers EARA</Typography>
        <Typography component="h1" className="products-title">
          Notre collection
        </Typography>
        <Typography className="products-intro">
          Des essentiels choisis avec soin, pour chaque occasion.
        </Typography>
      </Box>

      {isMobile && (
        <Box className="mobile-filter">
          <Button
            variant="outlined"
            startIcon={<FilterListOutlinedIcon />}
            onClick={() => setDrawerOpen(true)}
          >
            Catégories
          </Button>
        </Box>
      )}

      <Box className="products-layout">
        {!isMobile && (
          <Box component="aside" className="category-panel">
            <Typography className="category-heading">Catégories</Typography>
            <Box className="category-list">{categories.map(renderCategoryButton)}</Box>
          </Box>
        )}

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{ className: "category-drawer" }}
        >
          <Typography className="category-heading">Catégories</Typography>
          <Box className="category-list">{categories.map(renderCategoryButton)}</Box>
        </Drawer>

        <Box className="products-carousel-wrap">
          {filteredProducts.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1.12}
              breakpoints={{
                560: { slidesPerView: 2, spaceBetween: 20 },
                900: { slidesPerView: 2, spaceBetween: 24 },
                1200: { slidesPerView: 3, spaceBetween: 24 },
              }}
              className="products-swiper"
            >
              {filteredProducts.map((item) => (
                <SwiperSlide key={item.id}>
                  <Card
                    className="product-card"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <Box className="product-image-wrap">
                      <CardMedia
                        component="img"
                        image={item.imag}
                        alt={item.name}
                        className="product-image"
                      />
                      <span className="product-category">{item.category}</span>
                    </Box>
                    <CardContent className="product-card-content">
                      <Typography className="product-name">{item.name}</Typography>
                      <Typography className="product-description">
                        {item.details}
                      </Typography>
                    </CardContent>
                    <CardActions className="product-card-actions">
                      <Typography className="product-price">
                        {item.prix} {item.da}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        Découvrir
                      </Button>
                    </CardActions>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Typography className="empty-products">
              Aucun produit dans cette catégorie pour le moment.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
