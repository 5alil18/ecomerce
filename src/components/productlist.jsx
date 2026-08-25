import { ProductContext } from "../contexts/productContext";
import { useContext, useMemo, useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

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
     sx={{
       justifyContent: isMobile ? "center" : "flex-start",
       borderRadius: 2,
       minWidth: isMobile ? "auto" : "100%",
       color: selectedCategory === category ? "white" : "#e2e8f0",
       borderColor: "rgba(255,255,255,0.18)",
       backgroundColor:
         selectedCategory === category ? "primary.main" : "rgba(255,255,255,0.04)",
       textTransform: "none",
       fontWeight: 600,
       px: 2,
       py: 1,
       boxShadow:
         selectedCategory === category ? "0 10px 20px rgba(99, 102, 241, 0.35)" : "none",
       transition: "all 0.2s ease",
       "&:hover": {
         borderColor: "rgba(255,255,255,0.35)",
         backgroundColor:
           selectedCategory === category ? "primary.dark" : "rgba(255,255,255,0.08)",
       },
     }}
   >
     {category}
   </Button>
 );

 return (
   <Box
     sx={{
       display: "flex",
       flexDirection: "column",
       justifyContent: "center",
       gap: 4,
       minHeight: "85vh",
       py: 5,
     }}
   >
     <Typography
       variant={isMobile ? "h4" : "h3"}
       sx={{ textAlign: "center", py: isMobile ? 5 : 2, color: "white" }}
       data-aos="zoom-in-down"
     >
       Notre produits
     </Typography>

     {isMobile && (
       <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2 }}>
         <Button
           variant="contained"
           startIcon={<FilterListOutlinedIcon />}
           onClick={() => setDrawerOpen(true)}
           sx={{
             borderRadius: 2,
             px: 2,
             py: 1,
             boxShadow: "0 12px 24px rgba(99, 102, 241, 0.3)",
             textTransform: "none",
             fontWeight: 700,
           }}
         >
           Filtrer
         </Button>
       </Box>
     )}

     <Box
       sx={{
         display: "flex",
         flexDirection: isMobile ? "column" : "row",
         alignItems: isMobile ? "stretch" : "flex-start",
         justifyContent: "center",
         gap: 3,
         px: { xs: 2, md: 3 },
         width: "100%",
         maxWidth: 1400,
         mx: "auto",
       }}
     >
       {!isMobile && (
         <Box
           sx={{
             width: 230,
             position: "sticky",
             top: 90,
             background: "linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.75))",
             border: "1px solid rgba(255,255,255,0.12)",
             borderRadius: 3,
             p: 2,
             boxShadow: "0 18px 40px rgba(15, 23, 42, 0.25)",
             backdropFilter: "blur(8px)",
           }}
         >
           <Typography
             variant="h6"
             sx={{
               color: "white",
               mb: 2,
               fontWeight: 700,
               textAlign: "center",
               letterSpacing: 0.5,
             }}
           >
             Catégories
           </Typography>

           <Box
             sx={{
               display: "flex",
               flexDirection: "column",
               gap: 1.25,
             }}
           >
             {categories.map(renderCategoryButton)}
           </Box>
         </Box>
       )}

       <Drawer
         anchor="left"
         open={drawerOpen}
         onClose={() => setDrawerOpen(false)}
         PaperProps={{
           sx: {
             width: 260,
             background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))",
             color: "white",
             borderRight: "1px solid rgba(255,255,255,0.12)",
             p: 2,
           },
         }}
       >
         <Typography
           variant="h6"
           sx={{
             color: "white",
             mb: 2,
             fontWeight: 700,
             textAlign: "center",
             letterSpacing: 0.5,
           }}
         >
           Catégories
         </Typography>

         <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
           {categories.map(renderCategoryButton)}
         </Box>
       </Drawer>

       <Box
         sx={{
           display: "flex",
           justifyContent: "center",
           alignItems: "stretch",
           gap: { xs: 3, md: 6 },
           flexWrap: "wrap",
           flex: 1,
           pb: 2,
         }}
       >
         {filteredProducts.map((e) => (
           <Card
             data-aos="zoom-in"
             key={e.id}
             sx={{
               maxWidth: 345,
               borderRadius: 2,
               backgroundColor: "rgba(255,255,255,0.95)",
               "&:hover": {
                 scale: !isMobile ? 1.05 : 1,
                 transition: "all 0.3s",
                 boxShadow: "0px 0px 10px 10px rgba(139, 92, 246, 0.8)",
               },
             }}
             onClick={() => {
               navigate(`/product/${e.id}`);
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
                   navigate(`/product/${e.id}`);
                 }}
               >
                 details
               </Button>
             </CardActions>
           </Card>
         ))}
       </Box>
     </Box>
   </Box>
 );
}
