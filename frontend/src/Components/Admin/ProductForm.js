import React, { Component } from 'react'
import { getCategories } from '../../Store/actions/categoryAction';
import { connect } from 'react-redux';
import { updateAProduct } from '../../Store/actions/productAction';


class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.data = null;
    this.state = {
      // productId: this.props.product.productId,
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
    this.data.append('productId', this.props.productId)
    // if (this.state.invalidImage) return false
    this.props.updateAProduct(this.data)
  };


  render() {
    const { categories: categoriesState } = this.props
    const { categories } = categoriesState
    const { product } = this.props
    console.log(product)

    return (
      <div>
        <form className="text-center border rounded border-light p-5 bg-light" id="productForm" onSubmit={this.handleSubmit} encType="multipart/form-data">
          <div className="form-group row">
            <label htmlFor="productName" className="col-sm-2 col-form-label">Product Name:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="productName" id="productName" placeholder={product.productName || "Product Name"} onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="productDescription" className="col-sm-2 col-form-label">Product Description:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="productDescription" id="productDescription" placeholder={product.productDescription || "Product Description"} onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="productPrice" className="col-sm-2 col-form-label">Product Price:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="productPrice" id="productPrice" placeholder={product.productPrice || "Product Price"} onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="categories" className="col-sm-2 col-form-label">Category:</label>
            <div className="col-sm-10">
              <select id="categories" required className="form-control" name="categories" id="categoryId" onChange={this.onSelect} >
                <option defaultValue></option>
                {categories.map(category => (<option key={category.categoryId} data-key={category.categoryId} >{category.value}</option>))}
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="unit" className="col-sm-2 col-form-label">Unit:</label>
            <div className="col-sm-5">
              <input type="number" className="form-control" name="unit" id="unit" placeholder={product.unit || "Available Unit"} onChange={this.handleChange}/>
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
    // product: state.product
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategories()),
    updateAProduct: (cred) => dispatch(updateAProduct(cred))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)