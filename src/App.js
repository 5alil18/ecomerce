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
  },
  {
    id: 1,
    details: "est la meilleur couleur demandé qui satisfait les client",
    quantiti: 1,
    prix: 5000,
    da: "da",
    imag: PRODUIT2,
    name: "Couleur Premium",
  },
  {
    id: 2,
    details: "est la meilleur couleur demandé qui satisfait les client",
    quantiti: 1,
    prix: 5000,
    da: "da",
    imag: PRODUIT3,
    name: "Couleur Exclusive",
  },
  {
    id: 3,
    details: "est la meilleur couleur demandé qui satisfait les client",
    quantiti: 1,
    prix: 5000,
    da: "da",
    imag: PRODUIT3,
    name: "Couleur Exclusive",
  },
  {
    id: 4,
    details: "est la meilleur couleur demandé qui satisfait les client",
    quantiti: 1,
    prix: 5000,
    da: "da",
    imag: PRODUIT3,
    name: "Couleur Exclusive",
  },
  {
    id: 5,
    details: "est la meilleur couleur demandé qui satisfait les client",
    quantiti: 1,
    prix: 5000,
    da: "da",
    imag: PRODUIT3,
    name: "Couleur Exclusive",
  },
];

function App() {
  const [chosen, setchosen] = useState([]);
  function handlechosen(e) {
    const exist = chosen.find((item) => item.id === e.id);

    if (!exist) {
      setchosen((prev) => [...prev, e]);
    } else {
      const updatechosen = chosen.map((el) => {
        return el.id === e.id ? { ...el, quantiti: el.quantiti + 1 } : el;
      });
      setchosen(updatechosen);
    }
  }
  console.log(chosen);
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

  return (
    <BrowserRouter>
      {" "}
      <ProductContext.Provider
        value={{ product, chosen, setchosen, total, wilayas }}
      >
        <Box
          sx={{
            backgroundImage:
              "linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(139, 92, 246, 0.8) 25%, rgba(236, 72, 153, 0.7) 50%, rgba(245, 158, 11, 0.6) 75%, rgba(16, 185, 129, 0.5) 100%)",
          }}
        >
          <ResponsiveAppBar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route
              path="/products"
              element={<Productlist chosenproduct={handlechosen} />}
            />
            <Route
              path="/contact"
              element={<Contact handledata={handledata} />}
            />
          </Routes>
          {/* <Homepage></Homepage>
          <Productlist chosenproduct={handlechosen}></Productlist>
          <Contact handledata={handledata}></Contact> */}
        </Box>
      </ProductContext.Provider>
    </BrowserRouter>
  );
}

export default App;
