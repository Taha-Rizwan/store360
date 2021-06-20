import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles.css' 
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Navbar, Products, Cart, Checkout, Slideshow, CategoryPage, ProductPage } from './components';
import { commerce } from './lib/commerce';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#006400'
    },
    secondary: {
      main: '#004953'
    }
  }
});
const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');


  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  const fetchCategories = async() => {
    const response = await commerce.categories.list()
    setCategories(response.data)
  }
 
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
    fetchCategories();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    
    <Router>
    <ThemeProvider theme={theme}>
        <div style={{ display: 'flex' }}>
          <CssBaseline />
    
          <Navbar totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle} categories={categories}/>

          <Switch>
          
            <Route exact path="/" >
              <div className="yuh">
              <Slideshow />
              <Products products={products} onAddToCart={handleAddToCart} handleUpdateCartQty />
              </div>
            </Route>
            <Route exact path="/cart">
              <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
            </Route>
            <Route path="/checkout" exact>
              <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} refreshCart={refreshCart}/>
            </Route>
            <Route exact path='/category/accessories' >
      
              <CategoryPage slug="accessories" title="Accessories" onAddToCart={handleAddToCart}/>
            </Route>
          <Route exact path='/category/gaming-accessories' >
   
            <CategoryPage slug="gaming-accessories" title="Gaming Accessories" onAddToCart={handleAddToCart}/>
          </Route>
          <Route exact path='/category/football-kits'>
      
          <CategoryPage slug="football-kits" title="Football Kits" onAddToCart={handleAddToCart}/>
        </Route>
        <Route exact path='/category/sports-items'>
   
        <CategoryPage slug="sports-items" title="Sports Items" onAddToCart={handleAddToCart}/>
      </Route>
      <Route exact path='/category/shoes'>
    
      <CategoryPage slug="shoes" title='Shoes' onAddToCart={handleAddToCart}/>
    </Route>
    {products.map((product) => (
      <Route exact path={`/product/${product.id}`}>
        <ProductPage product={product} onAddToCart={handleAddToCart}/>
      </Route>
 
    ))}
          </Switch>
        </div>
        </ThemeProvider>
      </Router>
    
      
  
  );
};

export default App;
