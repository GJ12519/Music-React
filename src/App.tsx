import React, { memo, Suspense, useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom'
import routes from '@/router'

import AppHeader from './components/app-header';
import AppFooter from './components/app-footer';
import AppPlayerBar from './views/player/app-player-bar';

const App = memo(() => {
  const [show, setShow] = useState(false);

  function handleScroll() {
    const currentScrollY = window.scrollY
    if (currentScrollY > 0) {
      setShow(true)
    }
    else {
      setShow(false)
    }
  }

  /* 监听，一除监听 */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='App'>
      <div className='nav'>
        <AppHeader />
      </div>
      <Suspense fallback="loading...">
        {useRoutes(routes)}
      </Suspense>
      <AppFooter />
      {show && (<a href="#" title='回到顶部' className='footer-v1'></a>)}
      <AppPlayerBar />
    </div>
  )
})

export default App