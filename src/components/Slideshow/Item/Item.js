import React from 'react'
import {Paper} from '@material-ui/core'

import './Item.css'
const Item = (props) => {

  return (
    <Paper className='Item' >
      <div className='Box' >
        <h2 className='Title' >{props.item.name}</h2>
        <p className='Desc' >{props.item.desc}</p>
      </div>
      <img src={props.item.image} className='Image' alt="dhasjhdkas" />
  

    </Paper>

  )
}

export default Item
