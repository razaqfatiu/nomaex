import React, { Component } from 'react'
import { Spinner, Container, Row, Col } from 'react-bootstrap'

export default class Loading extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col className="text-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Col>
        </Row>

      </Container>
    )
  }
}
