import React, { useState, useEffect, Link }  from 'react'
import {Typography, Grid, CircularProgress} from '@material-ui/core/';
import Product from './Product/Product';
import useStyles from './styles';
import {commerce} from '../../lib/commerce'

const CategoryPage = ({ slug, title, onAddToCart}) => {
  const classes = useStyles();
  const [cats, setCats] = useState([])
  const fetchProductsByCategories = async(slug) =>{
    const response = await commerce.products.list({ category_slug: slug });
    setCats(response.data)
  }
  useEffect(() => {
    fetchProductsByCategories(slug)
  }, [slug]);
  if (!cats.length) return <CircularProgress color="secondary" />;
  return (
    <main className={classes.content}>
    <div className={classes.toolbar} />
    <Typography variant="h4" className={classes.title}>{title}</Typography>
    <Grid container justify="center" spacing={4}>
      {cats.map((cat) => (
        <Grid key={cat.id} item xs={12} sm={6} md={4} lg={3}>
          <Product cat={cat} onAddToCart={onAddToCart} />
        </Grid>
      ))}
    </Grid>
  </main>
  )
}

export default CategoryPage
