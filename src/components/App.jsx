import { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer} from 'react-toastify';
import Searchbar from 'components/Searchbar';
import ImageGallery from "components/ImageGallery";
import Button from "components/Button";
import Modal from "components/Modal";
import api from '../services/api';
import s from './App.module.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  

   useEffect(() => { 

    if (!searchQuery) {
      return
     }

const getImages = async () => {
    
    try {
      const images = await api.getPictures(searchQuery, page);

      if (images.hits.length === 0) {
        setStatus('idle')
        return toast.error(`${searchQuery} not found`)
      }
      setPictures(prevPictures => [...prevPictures, ...images.hits]);
      setStatus('resolved');
      setTotal(images.totalHits);
 
    } catch (error) {
      setError(error);
      setStatus('rejected')
    }
  };
     
    setStatus('pending');
     getImages();
     
  }, [searchQuery, page]);

  const handleFormSubmit = newSearchQuery => {
    if (searchQuery !== newSearchQuery) {
    setSearchQuery(newSearchQuery);
    setPictures([])
    setPage(1)
    }
  };
 const  scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  const handleButtonClick = () => {
    setPage(prevPage => prevPage + 1)
    scrollToBottom();
  }
  
  const toggleModal = () => {
    setShowModal(!showModal);
  }

   const onClickImage = (image) => {
  toggleModal();
    setModalImage(image);
 }
  
    return (
      <div className={s.App}>
        <Searchbar onSubmit={handleFormSubmit} />
        {status === 'resolved' && <ImageGallery onClick={onClickImage} pictures={pictures} />}
        {status === 'idle' && <p className={s.text}>Type in your search query</p>}
        {pictures.length > 0 && pictures.length < total && <Button onClick={handleButtonClick} /> }
        {status === 'pending' && <div className={s.loading}>
               <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>}
        {status === 'rejected' && <h2>{error.message}</h2>}
        {showModal && <Modal onClose={toggleModal}>
          <img className={s.modalImage} src={ modalImage.largeImageURL } alt={ modalImage.tags } />
        </Modal>}
        <ToastContainer autoClose={3000} />
        </div>
    )
}

export default App;
