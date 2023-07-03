// Write your code here
import './index.css' 

const  SimilarProductItem =(props)=>{
    const{details}=props 
    const {brand,title,imageUrl,price,rating}=details

    return(
        <li className="list-container">
            <img className="similar-images" src={imageUrl} alt=`product ${title}`/>
            <h1 className="similar-title">{title}</h1>
            <p className="similar-brand">{brand}</p>
            <div className="list-sub-container">
                <p>Rs {price}/- </p>
                <div className="reviews-container">
                    <p>{rating}</p>
                    <img className="stars-img" src="https://assets.ccbp.in/frontend/react-js/star-img.png" alt="star"/>
                </div>
            </div>
        </li>

    )

}
export default SimilarProductItem 