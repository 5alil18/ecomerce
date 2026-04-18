import { Box, Typography, Drawer, Divider, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { ProductContext } from "../contexts/productContext";
import DeleteIcon from "@mui/icons-material/Delete";
export default function Addcard({ card, handleclose }) {
  const isMobile = useMediaQuery("(max-width:700px)");
  const { chosen, setchosen, total } = useContext(ProductContext);

  /////////////////////function total//////////////////////
 
  ////////////////////////function delete////////////////////
  function delet(index) {
    const newproduct = chosen.filter((item) => {
      return item.id !== index;
    });
    setchosen(newproduct);
  }

  return (
    <>
      <Box>
        <Drawer
          anchor="right"
          open={card}
          onClose={() => {
            handleclose();
          }}
        >
          <Box
            sx={{
              width: isMobile ? "300px" : "400px",
              textAlign: "center",
              position: "relative",
              color: "primary.main",
              p: 2,
            }}
          >
            <Typography
              variant="h5"
              color="secondary"
              gutterBottom
              sx={{ p: 1 }}
            >
              produits selectoné
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                top: 4,
                right: 5,
                pt: 2,
                cursor: "pointer",
              }}
            >
              <CloseIcon
                sx={{
                  height: "30px",
                  width: "30px",
                  "&:hover": {
                    scale: 1.1,
                    transition: "0.3 all linear",
                  },
                }}
                onClick={() => {
                  handleclose();
                }}
              ></CloseIcon>
            </Typography>
            <Divider></Divider>
            {/* /////////////////////////////////////////////////////product////////////////////////////////////////////////////////////////// */}
            {chosen.map((e) => {
              return (
                <Box
                  key={e.id}
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <img
                    src={e.imag}
                    alt="PRODUIT"
                    style={{ height: "80px", width: "80px", borderRadius: 2 }}
                  />
                  <Typography variant="h6">{e.details}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      width: "50%",
                      gap: 1,
                    }}
                  >
                    <Button
                      sx={{ bgcolor: "primary.main", color: "white" }}
                      onClick={() => {
                        const update = chosen.map((el) => {
                          return el.id === e.id
                            ? { ...el, quantiti: el.quantiti + 1 }
                            : el;
                        });
                        setchosen(update);
                      }}
                    >
                      +
                    </Button>
                    {e.quantiti}
                    <Button sx={{ bgcolor: "primary.main", color: "white" }}onClick={()=>{
                      const update =chosen.map((el)=>{
                        return( el.id===e.id && e.quantiti>1 ?{...el, quantiti:el.quantiti-1}:el)
                      })
                      setchosen(update)
                    }}>
                      -
                    </Button>
                    <DeleteIcon
                      color="error"
                      sx={{ scale: 1.1, cursor: "pointer" }}
                      onClick={() => {
                        delet(e.id);
                      }}
                    ></DeleteIcon>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography>prix :</Typography>
                    <Typography>
                      {e.prix} {e.da}
                    </Typography>
                  </Box>
                  <Divider sx={{ width: "100%" }}></Divider>
                </Box>
              );
            })}
          </Box>
          {/* ///////////////////////////////////////////foter/////////////////////////////////////////////////////////// */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: 2,
            }}
          >
            <Typography variant="h5" color="secondary">
              TOTAL :
            </Typography>
            <Typography variant="h5" color="secondary">
              {total} da
            </Typography>
          </Box>
         
        </Drawer>
      </Box>
    </>
  );
}
