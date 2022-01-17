import './list.scss'

import { useState } from "react"

function List() {

  const [cardList, setCardList] = useState([
    {id: 1, order: 2, text: 'Card 2'},
    {id: 2, order: 3, text: 'Card 3'},
    {id: 3, order: 1, text: 'Card 1'},
    {id: 4, order: 4, text: 'Card 4'}
  ])

  const [currentCard, setCurrentCard] = useState(null)

  function handleDragStart(card) {
    setCurrentCard(card)
  }

  function handleDragLeave(evt) {
    evt.target.style.backgroundColor = ''
  }
  
  function handleDragOver(evt) {
    evt.preventDefault()
    evt.target.style.backgroundColor = 'lightgray'
  }
  
  function handleDragDrop(evt, card) {
    evt.preventDefault()
    evt.target.style.backgroundColor = ''
    setCardList(cardList.map(item => {

      if(card.id === item.id) {
        return {...item, order: currentCard.order}
      }

      if(currentCard.id === item.id) {
        return {...currentCard, order: card.order}
      }

      return item
    }))
  }

  function sortCards(a,b) {
    if(a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }
  
  return (

    <ul className="drop">
      {
        cardList.sort(sortCards).map(card => <li className="drop__item"
            key={card.id}
            onDragStart={(evt) => {handleDragStart(card)}}
            onDragLeave={(evt) => {handleDragLeave(evt)}}
            onDragOver={(evt) => {handleDragOver(evt)}}
            onDrop={(evt) => {handleDragDrop(evt, card)}}
            draggable={true}>

            {card.text}

          </li>
        )
      }
    </ul>
  )
}

export default List
