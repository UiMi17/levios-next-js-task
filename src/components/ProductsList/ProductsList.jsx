import PropTypes from "prop-types";
import ProductsListElement from "../ProductsListElement/ProductsListElement";
import { Container, Grid } from "@mui/material";

const ProductsList = ({ products }) => {
  return products.length !== 0 ? (
    <Grid container spacing={3} justifyContent="center">
      {products.map(({ asin, bsr_category, img, name, price }) => {
        return (
          <ProductsListElement
            key={asin}
            asin={asin}
            bsr_category={bsr_category}
            img={img}
            name={name}
            price={price}
          />
        );
      })}
    </Grid>
  ) : (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <h1>Oops. Nothing found.</h1>
    </Container>
  );
};

ProductsList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string,
      asin: PropTypes.string,
      price: PropTypes.string,
      bsr_category: PropTypes.string,
      link: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

export default ProductsList;
