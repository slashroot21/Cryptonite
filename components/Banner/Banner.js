import { Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

function Banner() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              color: "white",
              fontWeight: "bold",
              marginBottom: 15,
              marginRight: 150,
              fontFamily: "Montserrat",
            }}
          >
            Cryptonite
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "white",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              marginRight: 150,
            }}
          >
            Get your favorite Crypto Currency now!
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
