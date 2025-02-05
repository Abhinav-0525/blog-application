import './App.css';
import { Suspense, lazy } from 'react';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import RootLayout from './Components/RootLayout';
import AuthorProfile from './Components/AuthorProfile'
import UserProfile from './Components/UserProfile';
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
//import AddArticle from './Components/AddArticle';
//import ArticlesByAuthor from './Components/ArticlesByAuthor';
import Article from './Components/Article';
import ErrorPage from './Components/ErrorPage';
//import ArticlesForUser from './Components/ArticlesForUser';
let ArticlesForUser = lazy(()=>import('./Components/ArticlesForUser'))
let ArticlesByAuthor = lazy(()=>import('./Components/ArticlesByAuthor'))
let AddArticle = lazy(()=>import('./Components/AddArticle'))



function App() {
  
  let router = createBrowserRouter([
    {
      path:'',
      element:<RootLayout/>,
      errorElement: <ErrorPage/>, // to render the error page incase of routing error.
      children:[
        {
          path:'',
          element:<Home/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/register',
          element:<Register/>
        },
        {
          path:'/user-profile',
          element:<UserProfile/>,
          children:[
            {
              path:'',
              element:<Suspense fallback="Loading..."><ArticlesForUser/></Suspense>
            },
            {
              path:'article/:id',
              element:<Article/>
            }
          ]
        },
        {
          path:'/author-profile',
          element:<AuthorProfile/>,
          children:[
              {
                path:'',
                element:<Suspense fallback="Loading..."> <ArticlesByAuthor/> </Suspense>
              },
              {
                path:'add-article',
                element:<Suspense fallback="Loading..."> <AddArticle/> </Suspense>
              },
              {
                path:'article/:id',
                element:<Article/>
              }
          ]
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;


/*
Things to work on:
1. Home page design -- done
2. More UI work - colour theme  --done
3. Form validation -- done
4. Comments bug should be rectified -- done
5. search about material ui notifications --done

test author: abinay 1234
test user: jas 12345
 */