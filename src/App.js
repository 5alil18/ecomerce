import "./App.css";
import AOS from "aos";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "aos/dist/aos.css";
import Box from "@mui/material/Box";
import ResponsiveAppBar from "./components/appbar";
import Homepage from "./components/homepage";
import { ProductContext } from "./contexts/productContext";
import Productlist from "./components/productlist";
import PRODUIT from "./imgs/PRODUIT.jpg";
import PRODUIT2 from "./imgs/PRODUIT2.jpg";
import PRODUIT3 from "./imgs/PRODUIT3.jpg";
import { useState, useEffect } from "react";
import Contact from "./components/contact";
import ProductDetails from "./components/ProductDetails";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#70443f",
      dark: "#54322f",
      light: "#9b7169",
    },
    secondary: {
      main: "#b38a70",
    },
    background: {
      default: "#f4f0eb",
      paper: "#fffdfa",
    },
    text: {
      primary: "#302725",
      secondary: "#766a65",
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: '"Aptos", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    button: {
      textTransform: "none",
    },
  },
});
const wilayas = [
  { id: 1, name: "Adrar", domicile: 1600, bureau: 800 },
  { id: 2, name: "Chlef", domicile: 900, bureau: 450 },
  { id: 3, name: "Laghouat", domicile: 1200, bureau: 600 },
  { id: 4, name: "Oum El Bouaghi", domicile: 900, bureau: 350 },
  { id: 5, name: "Batna", domicile: 900, bureau: 350 },
  { id: 6, name: "Bejaia", domicile: 850, bureau: 400 },
  { id: 7, name: "Biskra", domicile: 850, bureau: 350 },
  { id: 8, name: "Bechar", domicile: 1400, bureau: 800 },
  { id: 9, name: "Blida", domicile: 800, bureau: 350 },
  { id: 10, name: "Bouira", domicile: 850, bureau: 400 },
  { id: 11, name: "Tamanrasset", domicile: 1600, bureau: 1000 },
  { id: 12, name: "Tebessa", domicile: 800, bureau: 600 },
  { id: 13, name: "Tlemcen", domicile: 900, bureau: 350 },
  { id: 14, name: "Tiaret", domicile: 950, bureau: 400 },
  { id: 15, name: "Tizi Ouzou", domicile: 850, bureau: 400 },
  { id: 16, name: "Alger", domicile: 750, bureau: 350 },
  { id: 17, name: "Djelfa", domicile: 1200, bureau: 600 },
  { id: 18, name: "Jijel", domicile: 850, bureau: 400 },
  { id: 19, name: "Setif", domicile: 850, bureau: 350 },
  { id: 20, name: "Saida", domicile: 1000, bureau: 400 },
  { id: 21, name: "Skikda", domicile: 850, bureau: 400 },
  { id: 22, name: "Sidi Bel Abbes", domicile: 900, bureau: 400 },
  { id: 23, name: "Annaba", domicile: 850, bureau: 350 },
  { id: 24, name: "Guelma", domicile: 850, bureau: 400 },
  { id: 25, name: "Constantine", domicile: 850, bureau: 400 },
  { id: 26, name: "Medea", domicile: 850, bureau: 400 },
  { id: 27, name: "Mostaganem", domicile: 900, bureau: 400 },
  { id: 28, name: "Msila", domicile: 900, bureau: 350 },
  { id: 29, name: "Mascara", domicile: 950, bureau: 400 },
  { id: 30, name: "Ouargla", domicile: 1200, bureau: 600 },
  { id: 31, name: "Oran", domicile: 900, bureau: 350 },
  { id: 32, name: "El Bayadh", domicile: 1400, bureau: 600 },
  { id: 33, name: "Illizi", domicile: 1800, bureau: 1200 },
  { id: 34, name: "Bordj Bou Arreridj", domicile: 850, bureau: 400 },
  { id: 35, name: "Boumerdes", domicile: 650, bureau: 400 },
  { id: 36, name: "El Tarf", domicile: 850, bureau: 400 },
  { id: 37, name: "Tindouf", domicile: 1600, bureau: 1000 },
  { id: 38, name: "Tissemsilt", domicile: 950, bureau: 400 },
  { id: 39, name: "El Oued", domicile: 1000, bureau: 600 },
  { id: 40, name: "Khenchela", domicile: 800, bureau: 350 },
  { id: 41, name: "Souk Ahras", domicile: 850, bureau: 400 },
  { id: 42, name: "Tipaza", domicile: 850, bureau: 350 },
  { id: 43, name: "Mila", domicile: 800, bureau: 350 },
  { id: 44, name: "Ain Defla", domicile: 900, bureau: 400 },
  { id: 45, name: "Naama", domicile: 1400, bureau: 800 },
  { id: 46, name: "Ain Temouchent", domicile: 950, bureau: 400 },
  { id: 47, name: "Ghardaia", domicile: 1200, bureau: 600 },
  { id: 48, name: "Relizane", domicile: 950, bureau: 400 },
];

const product = [
  {
    id: 0,
    details: "est la meilleur couleur demandé qui satisfait les client",
    quantiti: 1,
    prix: 5000,
    da: "da",
    imag: PRODUIT,
    name: "Couleur Classique",
    category: "Classique",
    size: ["s","m","l","xl"]
  },
  {
    id: 1,
    details: "est la meilleur couleur demandé qui satisfait les client",
    quantiti: 1,
    prix: 5000,
    da: "da",
    imag: PRODUIT2,
    name: "Couleur Premium",
    category: "Premium",
    size: ["s","m","l","xl"]
  },
  {
    id: 2,
    details: "est la meilleur couleur demandé qui satisfait les client",
    quantiti: 1,
    prix: 5000,
    da: "da",
    imag: PRODUIT3,
    name: "Couleur Exclusive",
    category: "Exclusive",
    size: ["s","m","l","xl"]
  },
  


];

function App() {
  const [chosen, setchosen] = useState([]);
  function handlechosen(e) {
    const exist = chosen.find((item) => item.id === e.id && item.selectedSize === e.selectedSize);
    if (!exist) {
      setchosen((prev) => [...prev, e]);
    } else {
      const updatechosen = chosen.map((el) => {
        return el.id === e.id && el.selectedSize === e.selectedSize ? { ...el, quantiti: el.quantiti + 1 } : el;
      });
      setchosen(updatechosen);
    }
  }
  const total = chosen?.reduce(
    (acc, item) => acc + item.prix * item.quantiti,
    0,
  );
  const [infouser, setinfo] = useState(null);
  function handledata(data) {
    setinfo(data);
  }
  console.log(infouser);
  ///////////////////////////aniamtion////////////////////////////////////////////////
  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: "linear  ",
    });
  }, []);
///////////////////////////vider la carte/////////////////////
  function vider() {
    setchosen([]);
  }

  ///////////////////////////////:connecter avec le backend////////////////////////////////////////

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ProductContext.Provider
          value={{ product, chosen, setchosen, total, wilayas, vider }}
        >
          <Box
            sx={{
              minHeight: "100vh",
              backgroundColor: "#f4f0eb",
              color: "#302725",
            }}
          >
            <ResponsiveAppBar />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/products" element={<Productlist />} />
              <Route
                path="/product/:id"
                element={<ProductDetails chosenproduct={handlechosen} />}
              />
              <Route
                path="/contact"
                element={<Contact handledata={handledata} />}
              />
            </Routes>
          </Box>
        </ProductContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
