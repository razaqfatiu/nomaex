import React, { Component } from 'react'
import './ProductUpload.scss'
import { connect } from 'react-redux';
import { getCategories } from '../../Store/actions/categoryAction';
import Loading from '../layout/Loading';
import { createNewProduct } from '../../Store/actions/productAction';
const axios = require('axios').default


class ProductUpload extends Component {
  constructor(props) {
    super(props);
    this.data = null;
    this.state = {
      productName: '',
      productPrice: '',
      productDescription: '',
      categoryId: '',
      unit: '',
      productImage: [],
      invalidImage: '',
      // data: null
    };
  }

  componentWillMount() {
    this.props.getCategories()
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
    // console.log(this.state)
  }

  onSelect = (event) => {
    const selectedIndex = event.target.options.selectedIndex;
    this.setState({ categoryId: event.target.options[selectedIndex].getAttribute('data-key') });
     // console.log(this.state.categoryId)
  }

  onChangeFile = event => {
    const imageFiles = event.target.files;
    this.setState({ productImage: imageFiles })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.data = new FormData(document.getElementById('productForm'))
    this.data.append('categoryId', this.state.categoryId)
    console.log(this.state.categoryId)
    if (this.state.invalidImage) return false
    return this.props.createNewProduct(this.data)
  };


  render() {
    const { categories: categoriesState, product } = this.props
    const { categories } = categoriesState
    // console.log(product)
    // if (categories.categoryError) return (<Loading />)
    return (
      <div className="main">
        <form className="text-center border rounded border-light p-5 bg-light" id="productForm" onSubmit={this.handleSubmit} encType="multipart/form-data">
          <div className="form-group row">
            <label htmlFor="productName" className="col-sm-2 col-form-label">Product Name:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="productName" id="productName" placeholder="Product Name" onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="productDescription" className="col-sm-2 col-form-label">Product Description:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="productDescription" id="productDescription" placeholder="Password" onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="productPrice" className="col-sm-2 col-form-label">Product Price:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="productPrice" id="productPrice" placeholder="Product Price" onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="categories" className="col-sm-2 col-form-label">Category:</label>
            <div className="col-sm-10">
              <select id="categories" className="form-control" name="categories" id="categoryId" onChange={this.onSelect} >
                <option defaultValue>Choose...</option>
                {categories.map(category => (<option key={category.categoryId} data-key={category.categoryId} >{category.value}</option>))}
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="unit" className="col-sm-2 col-form-label">Unit:</label>
            <div className="col-sm-5">
              <input type="number" className="form-control" name="unit" id="unit" placeholder="Available Unit" onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="productImage" className="col-sm-2 col-form-label">Product Images</label>
            <div className="col-sm-5">
              <input type="file" className="form-control" name="productImage" id="productImage" required multiple accept=".png, .jpg, .jpeg" onChange={this.onChangeFile} />
              {/* <small id="invalidImage" class="form-text text-danger">{this.state.invalidImage}</small> */}

            </div>
          </div>

          <button className="btn btn-success btn-lg my-4" type="submit" id="upload">Upload</button>

        </form>

      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    categories: state.category,
    product: state.product
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategories()),
    createNewProduct: (cred) => dispatch(createNewProduct(cred))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductUpload)