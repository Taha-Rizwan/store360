import React from 'react'
import Carousel from 'react-material-ui-carousel'
import Item from './Item/Item'

import './Slideshow.css'
const Slideshow = () => {
  
  var items = [
    {
        name: "Nike Sneakers",
        desc: "Wanna look fresh? Buy them",
        image: 'https://i.pinimg.com/originals/24/35/f4/2435f449e7ea690f7c94fcc92e284f18.png'
    },
    {
        name: "Football",
        desc: "Need some quality football kits to support you team even more? Look no further.",
        image: 'https://i.ebayimg.com/images/g/BawAAOSwt6heD9Qb/s-l300.jpg'
    },
    {
      name: "Razer Keyboards",
        desc: "Need an upgrade for you gaming setup? Than buy the new Razer Huntsman",
        image: 'https://www.canstarblue.com.au/wp-content/uploads/2019/04/Cooler-Master-SK621.png'
    },
    {
      name: 'Rolex Flex',
      desc: 'Looking for a luxurious watch? Have this than',
      image: 'https://www.watches-news.com/wp-content/uploads/2017/09/rolex-sky-dweller-2017-1-watches-news-300x180.jpg'
    }
]
  return (
    <Carousel className='Slider' >
    {
        items.map( (item, i) => <Item key={i} item={item} /> )
    }
</Carousel>
  )
}

export default Slideshow
