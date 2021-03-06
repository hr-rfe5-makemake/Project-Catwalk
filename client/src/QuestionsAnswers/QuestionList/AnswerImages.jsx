import React from 'react'
import ImageModal from './ImageModal.jsx'
import ReactDOM from 'react-dom'

const AnswerImages = (props) => {
  const handleImageClick = (e) => {
    let modalLocation = document.getElementById('image-modal')
    ReactDOM.render(<ImageModal url={e.target.src} closeModal={closeModal}/>, modalLocation)
  }

  const closeModal = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('image-modal'));
  }

  return(
    <span>
      <img src={props.photo.url}  style={{maxWidth: '150px', maxHeight: '150px'}}  key={props.photo.id} onClick={handleImageClick.bind(this)}></img>
      <div id='image-modal'></div>
    </span>
  )
}


export default AnswerImages