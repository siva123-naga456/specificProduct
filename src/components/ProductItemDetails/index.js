// Write your code here
import {Component} from 'react'
import {Link} from "react-router-dom"
import Cookies from 'js-cookie'
import Loader from "react-loader-spinner"
import  {BsDashSquare,BsPlusSquare}from "react-icons/bs"

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const ApiStatusList = {
  initial: 'INITIAl',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class ProductItemDetails extends Component {
    state = {ItemsDetailsList:[],
        similarProductsList:[],
        apiStatus: ApiStatusList.initial,
        quantity: 1,
    }

    componentDidMount() {
        this.itemDetails()
    }

    itemDetails = async () => {
        const {match} = this.props
        const {params} = match
        const {id} = params
        this.setState({apiStatus: ApiStatusList.inprogress})
        const jwtToken = Cookies.get('jwt_token')
        const productDetailsApiUrl = `https://apis.ccbp.in/products/${id}`
         const options = {
             Method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
            }
        const request = await fetch(productDetailsApiUrl, options)
        if (request.ok) {
            const Data = await request.json()
            console.log(Data)
            const updateData = {
                availability: Data.availability,
                brand: Data.brand,
                title: Data.title,
                description: Data.description,
                id: Data.id,
                imageUrl: Data.image_url,
                price: Data.price,
                rating: Data.rating,
                totalReviews:Data.total_reviews,
            }
            console.log(updateData)
            const updateSimilarProducts = Data.similar_products.map(each => ({
                availability: each.availability,
                brand: each.brand,
                description: each.description,
                id: each.id,
                imageUrl: each.image_url,
                price: each.price,
                rating: each.rating,
                title: each.title,
            }))
            console.log(updateSimilarProducts)
             this.setState({ItemsDetailsList:updateData,
                                similarProductsList:updateSimilarProducts,
                                 apiStatus: ApiStatusList.success, })
        }
        else{
        this.setState({apiStatus: ApiStatusList.failure,})

        }

    }
    }


    renderLoader=()=>(
    <div data-testid="loader">
           <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
    )
  

    renderFailure=()=>(
      <div className="failure-Container"> 
            <img className="failure-image" src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png" alt="error view"/>
            <h1 className="failure-heading">Products Not Found</h1>
            <Link to="/products">
            <button className="Shopping-btn" type="button">Continue Shopping</button>
            </Link>
 
      </div>
  )


    renderSelectedItemDetails=()=>{
        const {ItemsDetailsList,quantity, similarProductsList}=this.state
        const{ availability,brand,title,description,id,imageUrl,price,rating,totalReviews}=ItemsDetailsList

        return(
        <div className="main-container">
          <div className="main-sub-container">
          <img className="image" src={imageUrl} alt="product"/>
          <div className="main-sub1-container">
              <h1 className="item-heading">{title}</h1>
              <p className="item-price">Rs {price}</p>
              <div className="review-rating-container">
                  <div className="review-container">
                      <p>{rating}</p>
                      <img className="star-img" src="https://assets.ccbp.in/frontend/react-js/star-img.png" alt="star"/>
                  </div>
                  <p className="item-review">{totalReviews} Reviews</p>
              </div>
              <p className="item-description">{description}</p>
              <p className="item-description"><span className="available-text">Available: </span>{availability}</p>
              <p className="item-description"><span className="available-text">Brand: </span>{brand}</p>
              <hr/>
              <div className="btn-container">
              <button className="minus-btn" type="button" data-testid="minus" ><BsDashSquare/></button>
              <p className="count">{quantity}</p>
              <button className="minus-btn" type="button" data-testid="plus"><BsPlusSquare/></button>
              </div>
                <button className="cart-btn">ADD TO CART</button>
            </div>
          </div>
         <h1 className="product-heading">Similar Products</h1>
         <ul className="order-container">{similarProductsList.map(each=>(
          <SimilarProductItem details={each} key={each.id}/>))}
          </ul>
         </div>
        )
    }



    renderProductItemDetails=()=>{
      const {apiStatus}=this.state

      switch(apiStatus){
          case ApiStatusList.failure:
              return this.renderFailure()
          case ApiStatusList.inprogress:
              return this.renderLoader() 
          case ApiStatusList.success:
              return this.renderSelectedItemDetails() 
          default:
              return null
      }
    }

    render() {
        return (
             <>
             <Header/>
             <div>
             {this.renderProductItemDetails()}
             </div>
            </>
         )

    }

   
}
export default ProductItemDetails
