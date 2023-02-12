import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../../controllers/store';

function PublicOnlyRoute({ children  } : any) {
  const accessToken = useSelector((state : RootState) => state.session.accessToken); 
  const loading = useSelector((state : RootState) => state.session.loading);
  const location = useLocation();
  const fromLocation = (location.state as any)?.from;
  const previousLocation = fromLocation ? fromLocation : { pathname: '/'};


  if (!accessToken && !loading) {
      return children;
  } else if (!accessToken && loading) {
    return <Navigate to="/" state={{from: location}} replace/>;
  } else if (loading) {
      return <p>Loading...</p>;
  } else if (accessToken && !loading) {
    return <Navigate to={previousLocation} state={{from: location}} replace/>;
  } else {
      return <p>Something went wrong</p>;
  }
}

export default PublicOnlyRoute
