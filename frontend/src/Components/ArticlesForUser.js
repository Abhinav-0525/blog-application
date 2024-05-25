import React from 'react'
import {axiosWithToken} from './axiosWithToken';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ArticlesForUser() {

    const [articlesList, setArticlesList] = useState([]);
    let navigate = useNavigate();
    let {currentUser} = useSelector(
      (state)=> state.userAuthorLoginReducer
    );

    let res;
    const getArticlesByAuthor = async () => {
      res = await axiosWithToken.get('http://localhost:4000/user-api/articles')
      //console.log(res)
      if (Array.isArray(res.data.payload)) {
        setArticlesList(res.data.payload);
      } else {
        console.log("Expected an array from the API but received:", res.data.payload);
      }
    }

    useEffect(() => {
     getArticlesByAuthor() 
    },[])

    function readArticles(article){
        navigate(`../user-profile/article/${article.articleId}`,{state:article})
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
      </div>
    </div>
  )
}

export default ArticlesForUser