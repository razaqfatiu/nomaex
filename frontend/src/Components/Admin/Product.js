import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllProducts } from '../../Store/actions/productAction'
import Loading from '../layout/Loading'
import { Button, Nav, Card, Container, Row, Col, CardGroup, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'
import './Product.scss'

class Product extends Component {

  componentWillMount() {
    this.props.getAllProducts()
  }

  render() {
    const { product } = this.props
    const { products } = product
    console.log(products)

    if (product.loading) return <Loading />
    if (!product.loading) {

      return (
        <Container className="product-div">
          <h2 className="text-center" >ALL PRODUCTS</h2>
          <hr />
          <Row>
          {/* className="overflow-autos" */}
            <CardGroup className="justify-content-center ">

              {products.map((product) => (
                <Link key={product.productId}  to={`/admin/products/${product.productId}`}>
                  <Col className="mb-4" xs={12} sm={12} md={12} lg={4}>
                    <Card className="text-center card" style={{ width: '20rem', height: '30rem' }}>
                      {product.Product_images.map((Product_image, i) => (
                        (Product_image && i === 0) ? <Card.Img key={Product_image.imageId} className="p-2" variant="top" src={Product_image.imageUrl} alt="Card image cap" height="200" /> : ''))}
                      {/* {product.Product_images.map(Product_image => ((Product_image) ? <Card.Img key={Product_image.imageId} className="p-2" variant="top" src={Product_image.imageUrl} alt="Card image cap" /> : ''))} */}

                      <Card.Body>
                        <Card.Title>
                          <span>&#8358;</span>
                          {' '}
                          {product.productPrice}
                        </Card.Title>
                        <Card.Text>
                          {(product['productDescription'].length > 95) ? `${product['productDescription'].slice(0, 90)} ...` : product['productDescription'].slice(0, 5)}
                        </Card.Text>
                        <Button variant="success">
                          <FontAwesomeIcon icon={faCartArrowDown} />
                          {' '} Add to Cart {' '}
                          <span className="badge badge-light">{0}</span>
                        </Button>
                        <br />
                        <ButtonGroup className="mt-3" aria-label="Basic example">
                          <Button variant="secondary">Edit Product</Button>
                          <Button variant="secondary">Delete Product</Button>
                          {/* <Button variant="secondary">Right</Button> */}
                        </ButtonGroup>
                        {/* <Card.Link className="bg-danger p-2 rounded" href="#">Edit Product</Card.Link>
                      <Card.Link className="bg-success p-2 rounded" href="#">Delete Product</Card.Link> */}
                      </Card.Body>
                    </Card>
                  </Col>
                </Link>
              ))}

            </CardGroup>
          </Row>
        </Container>
      )
    }
  }
}
// }

const mapStateToProps = (state) => {
  return {
    product: state.product,
    // ProductImages: state.productImages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: () => dispatch(getAllProducts()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Product)