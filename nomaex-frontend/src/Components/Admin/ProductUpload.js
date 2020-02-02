import React, { Component } from 'react'
import './ProductUpload.scss'

export default class ProductUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      productPrice: '',
      productDescription: '',
      category: '',
      unit: '',
    };
  }

  render() {
    return (
      <div className="main">
        <form className="text-center border rounded border-light p-5 bg-light">
          <div class="form-group row">
            <label for="inputPassword" class="col-sm-2 col-form-label">Product Description:</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="input" placeholder="Password" />
            </div>
          </div>

          <div class="form-group row">
            <label for="inputPassword" class="col-sm-2 col-form-label">Product Description:</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="inputPassword" placeholder="Password" />
            </div>
          </div>

          <div class="form-group row">
            <label for="inputPassword" class="col-sm-2 col-form-label">Product Price:</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="inputPassword" placeholder="Password" />
            </div>
          </div>

          <div class="form-group row">
            <label for="inputState" class="col-sm-2 col-form-label">Category:</label>
            <div class="col-sm-10">
              <select id="inputState" class="form-control">
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
          </div>

          <div class="form-group row">
            <label for="inputState" class="col-sm-2 col-form-label">Quantity</label>
            <div class="col-xs-6">
              <input type="number" class="form-control" placeholder="Available Quantity" />
            </div>
          </div>

          <button className="btn btn-success btn-lg my-4" type="submit" id="upload">Upload</button>

        </form>

      </div>
    )
  }
}
