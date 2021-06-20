import React from 'react'
import { CircularProgress} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import './styles.css'

const ProductPage = ({product, onAddToCart}) => {
  const width = window.innerWidth
  const handleAddToCart = () => onAddToCart(product.id, 1);
  if (!product.media.source) return <CircularProgress color="secondary" className="progress"/>
  return (
    <div className='product'>
     {(width > 767) && (
      <> 
      <img src={product.media.source} alt={product.name} className="img"/>
      <div className="textShit">
        <Typography variant="h6">{product.categories[0].name}</Typography>
        <Typography variant="h6" className="price">{product.price.formatted_with_symbol}</Typography>
        <Typography variant="h4">{product.name}</Typography>
        <Typography variant="body1" dangerouslySetInnerHTML={{ __html: product.description }} ></Typography>
        <Button variant="contained" onClick={handleAddToCart}>Add to Cart</Button>
      </div>
      </>
      )
}
      <div className="textShit">
        <Typography variant="h6">{product.categories[0].name}</Typography>
        <Typography variant="h6" className="price">{product.price.formatted_with_symbol}</Typography>
        <Typography variant="h4">{product.name}</Typography>
        </div>
      <img src={product.media.source} alt={product.name} className="img"/>
      <div className="button">
      <Button variant="contained" onClick={handleAddToCart}>Add to Cart</Button>
      </div>
        <Typography variant="body1" dangerouslySetInnerHTML={{ __html: product.description }} className="description"></Typography>
        
    </div>
   
  ) 
}

export default ProductPage
