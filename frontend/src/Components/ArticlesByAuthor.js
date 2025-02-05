import React, { useContext } from 'react'
import {axiosWithToken} from './axiosWithToken';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import { RegisterContext } from '../Contexts/RegisterContext';

function ArticlesByAuthor() {
    
  const [articlesList, setArticlesList] = useState([]);
  let {articleCreateNotify} = useContext(RegisterContext); // state for maintaining notifications after article created
  let [artiSnack, setArtiSnack] = articleCreateNotify;
  let navigate = useNavigate();
  let {currentUser} = useSelector(
    (state)=> state.userAuthorLoginReducer
  );
  
  
  let res;
  const getArticlesByAuthor = async () => {
    res = await axiosWithToken.get(`${process.env.REACT_APP_API_URL}/author-api/articles/${currentUser.username}`)
    console.log(res)
    if (Array.isArray(res.data.payload)) {
      setArticlesList(res.data.payload);
    } else {
      console.log("Expected an array from the API but received:", res.data.payload);
    }
  }

  useEffect(() => {
   getArticlesByAuthor() 
  },[])

  useEffect(() => {
    console.log(articlesList); // This will log the updated articlesList
  }, [articlesList]);

  function readArticles(article){
    navigate(`article/${article.articleId}`,{state:article})
  }

  function handleClose(event){
     setArtiSnack(false);
  }

  return (
    <div className='container'>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5'>
        {articlesList.map((article) => (
          <div className='col' key={article._id}>
            <div className='card h-100 shadow-md'>
              <div className='card-header'>
                <p className='card-text'>{article.category}</p>
              </div>
              <div className='card-body'>
                <h5 className='card-title'>{article.title}</h5>
                <p className='card-text'>{article.content.substring(0, 80) + "...."}</p>
                    <div className='m-2 d-flex justify-content-center align-items-end'>
                        <button onClick={() => readArticles(article)} className='btn btn-primary'>Read More</button>  
                </div>
              </div>
            </div>
          </div>
        ))}
        <Snackbar 
                anchorOrigin={{ vertical:"bottom", horizontal:"left" }}
                open={artiSnack}
                autoHideDuration={4000}
                severity="success"
                onClose={handleClose}
                message="Article created Successfully!"
                ContentProps={{
                  sx:{
                    border: "1px solid black",
                    borderRadius: "40px",
                    color: "black",
                    bgcolor: "lightseagreen",
                    fontWeight: "bold",
                  }
               }} >
        </Snackbar>
      </div>
    </div>
  )
}

export default ArticlesByAuthor


