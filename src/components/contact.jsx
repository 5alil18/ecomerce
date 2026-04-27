import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Autocomplete,
  Snackbar,
  Alert,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ProductContext } from "../contexts/productContext";
import { useContext, useState } from "react";

export default function Contact({ handledata }) {
  const isMobile = useMediaQuery("(max-width:700px)");
  const { total, wilayas, chosen, vider } = useContext(ProductContext);

  const [selected, setselected] = useState(null);
  const [mode, setMod] = useState("bureux");
  const prixliv = selected
    ? mode === "bureux"
      ? selected.bureau
      : selected.domicile
    : 0;
  const somme = prixliv + total;
  const [color, setColor] = useState("bureux");
  const [infomation, setinfomration] = useState({
    name: "",
    phonenumber: "",
  });
  function handleinfomration() {
    const info = {
      name: infomation.name,
      phone: infomation.phonenumber,
      wilaya: selected?.name,
      nom_pro: chosen.map((p) => p.name),
      quantity: chosen.map((p) => p.quantiti),
      modeLivraison: mode,
      prixLivraison: prixliv,
      total: somme,
    };

    handledata(info);
  }
  const [open, setOpen] = useState(false);

  function message() {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "primary.main",
        minHeight: "70vh",
        gap: 4,
        py: 3,
        textAlign: "center",
        my: isMobile ? 5 : 1,
      }}
    >
      <Typography variant={isMobile ? "h5" : "h4"} data-aos="zoom-in">
        Passer la commande
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          bgcolor: "rgb(255, 255,255, 0.4)",
          width: "80%",
          borderRadius: 6,
          padding: 4,
        }}
      >
        <TextField
          data-aos="fade-right"
          id="outlined-basic"
          label="name"
          variant="outlined"
          value={infomation.name}
          sx={{ width: !isMobile ? "50%" : "80%" }}
          onChange={(e) => {
            setinfomration({ ...infomation, name: e.target.value });
          }}
        />
        <TextField
          data-aos="fade-left"
          value={infomation.phonenumber}
          id="outlined-basic"
          label="phone number"
          variant="outlined"
          sx={{ width: !isMobile ? "50%" : "80%" }}
          onChange={(e) => {
            setinfomration({ ...infomation, phonenumber: e.target.value });
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 2 : 3,
            flexDirection: isMobile ? "column" : "row",
            width: "100%",
            mx: "auto",
            justifyContent: "center",
          }}
        >
          <Autocomplete
            sx={{ width: !isMobile ? "50%" : "80%" }}
            disablePortal
            value={selected}
            options={wilayas}
            onChange={(e, value) => setselected(value)}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="wilya" />}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 2 : 3,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Typography data-aos="fade-right" color="textPrimary">
            mode de laivraison :
          </Typography>
          <Box
            sx={{ display: "flex", gap: 3, alignItems: "center" }}
            data-aos="zoom-in"
          >
            <Button
              onClick={() => {
                setMod("home");
                setColor("home");
              }}
              variant={color === "home" ? "contained" : "outlined"}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <HomeIcon></HomeIcon>au maison
            </Button>
            <Button
              onClick={() => {
                setMod("bureux");
                setColor("bureux");
              }}
              variant={color === "bureux" ? "contained" : "outlined"}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <ApartmentIcon></ApartmentIcon>au bureux
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography color="textPrimary" data-aos="fade-left">
            Frais de livraison :
          </Typography>
          <Button
            data-aos="fade-right"
            variant="outlined"
            sx={{ width: !isMobile ? "50%" : "80%" }}
          >
            {prixliv ? prixliv : 0} DA
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography color="textPrimary" data-aos="fade-left">
            la somme de produit avec laivraison :
          </Typography>
          <Button
            variant="outlined"
            sx={{ width: !isMobile ? "50%" : "80%" }}
            data-aos="fade-right"
          >
            {somme} DA
          </Button>
        </Box>
        <Button
          variant="contained"
          color="success"
          sx={{
            my: 2,
            width: "90%",
            mx: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
          onClick={() => {
            handleinfomration();
            message();
            vider()
            setinfomration({
              name: "",
              phonenumber: "",
            });

            setselected(null); //
          }}
          disabled={
            !selected ||
            !infomation.name ||
            infomation.phonenumber.length !== 10 ||
            !chosen.length
          }
        >
          <CheckIcon /> confirmé l'achat
        </Button>
      </Box>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          demande envoiyé!!
        </Alert>
      </Snackbar>
    </Container>
  );
}
