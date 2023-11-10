import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getProductList()
  }

  getProductList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/products'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedList = fetchedData.products.map(product => ({
        id: product.id,
        title: product.title,
        brand: product.brand,
        price: product.price,
        rating: product.rating,
        imageUrl: product.image_url,
      }))
      this.setState({productsList: updatedList, isLoading: false})
    }
  }

  renderProductsList = () => {
    const {productsList, isLoading} = this.state

    if (isLoading) {
      return (
        <div className="spinner-container">
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        </div>
      )
    }
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
