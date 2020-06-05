import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Row, Col, Carousel } from "react-bootstrap";
import './Product.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { saveState, loadState } from '../../Store/localStorage';
import ProductForm from './ProductForm';

class ProductDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      product: loadState(),
      index: 0,
      setIndex: 0
    }
  }

  componentWillMount() {
    if (this.props.product) {
      saveState(this.props.product)
      this.setState({ product: loadState() });
    }

  }

  handleSelect = (selectedIndex, e) => {
    this.state.setIndex(selectedIndex);
  };

  render() {
    // const { index, setIndex } = this.state


    const { product } = this.state
    // const id = this.props.match.params.id;
    console.log(product, this.props)
    // const [index, setIndex] = useState(0);


    return (
      <Container className="product-details-container">
        <h2 className="text-center mb-3">{product.productName}</h2>
        <hr />
        <Row>
          <Col xs={12} sm={12} lg={6} className="product-details-left">
            {product.Product_images.map(productImage => (
              <Carousel key={productImage.imageId}>
                <Carousel.Item>
                  <img
                    className=""
                    src={productImage.imageUrl}
                    alt={`Slide ${productImage.imageId}`}
                  />
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </Carousel.Caption>
                </Carousel.Item>

              </Carousel>
            ))}

          </Col>
          <Col xs={12} sm={12} lg={6} className="product-details-right" >
            <div>
              <span className="label text-left">Product Name: </span>
              <span>{product.productName}</span>
            </div>

            <div>
              <span className="label text-left">Product Price: </span>
              <span><span>&#8358;</span>{`${product.productPrice}`}</span>
            </div>
            <div>
              <span className="label text-left">Product Quantity: </span>
              <span> {product.unit} </span>
            </div>

            <div>
              <span className="label text-left">Product Description: </span>
              <span>{product.productDescription}</span>
            </div>

            <Button variant="success">
              <FontAwesomeIcon icon={faCartArrowDown} />
              {' '} Add to Cart {' '}
              <span className="badge badge-light">{0}</span>
            </Button>
          </Col>
        </Row>

        <ProductForm product={product} />


      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = parseInt(ownProps.match.params.id);
  const products = state.product.products;
  const product = products.filter((prod) => prod.productId === id )[0]
  return {
    product,
    products: state.product.products
  }
}


export default connect(mapStateToProps)(ProductDetails)