import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles';

const Product = ({ cat, onAddToCart }) => {
  const classes = useStyles();

  const handleAddToCart = () => onAddToCart(cat.id, 1);

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={cat.media.source} title={cat.name} component={Link} to={`/product/${cat.id}`}/>
      <CardContent>
        <div className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {cat.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {cat.price.formatted_with_symbol}
          </Typography>
        </div>
        <Typography dangerouslySetInnerHTML={{ __html: cat.description }} variant="body2" color="textSecondary" component="p" />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;

