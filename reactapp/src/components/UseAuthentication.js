import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom hook for authentication check and navigation
export function useAuthenticationUser() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(localStorage);
    const l=localStorage.length;
    if (l>0) {
    const isAuthenticated = localStorage.getItem('authenticatedUser');
    if(isAuthenticated === "false"){
      navigate('/');
    }
    }
    else
        navigate('/');
  }, []);
}


export function useAuthenticationAdmin() {
    const navigate = useNavigate();

    useEffect(() => {
    console.log(localStorage);
    const l=localStorage.length;
    if (l>0) {
        console.log("inserted");
      const isAuthenticated = localStorage.getItem('authenticatedAdmin');
      if(isAuthenticated === "false"){
        navigate('/');
      }
    }
    else
        navigate('/');
    }, []);
}