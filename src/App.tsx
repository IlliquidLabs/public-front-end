import React, { useCallback, useEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'
import DisclaimerModal from './components/DisclaimerModal'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
import SushiProvider from './contexts/HoneyProvider'
import useModal from './hooks/useModal'
import theme from './theme'
import Farms from './views/Farms'
import Home from './views/Home'
//import Stake from './views/Stake'

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  const video = useRef<HTMLVideoElement>(null);

  return (
  <>
	
    <Providers>
		
      <Router>
		  
	  
        <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
        <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
		
        <Switch>
			
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/farms">
            <Farms />
          </Route>
          {/* <Route path="/staking">
            <Stake /> 
          </Route> */}
		  
		  
        </Switch>
		
		
		
      </Router>
      <Disclaimer />
	  
	  
    </Providers>
	
	</>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
	  <>
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={42161}
        connectors={{
          walletconnect: { rpcUrl: 'https://arbitrum-mainnet.infura.io/v3/bb290e0ac4594e74ad670ca0a23d3732' },
        }}
      >
        <SushiProvider>
          <TransactionProvider>
            <FarmsProvider>
              <ModalsProvider>{children}</ModalsProvider>
            </FarmsProvider>
          </TransactionProvider>
        </SushiProvider>
      </UseWalletProvider>
	  
	
  </ThemeProvider>
  <video autoPlay loop  id="background-video" muted height="100%" width="100%">
	<source src={require('./assets/mp4/Honeydrip2.mp4')}  />
</video>
</>

  )
}

const Disclaimer: React.FC = () => {
  const markSeen = useCallback(() => {
    localStorage.setItem('disclaimer', 'seen')
  }, [])

  const [onPresentDisclaimerModal] = useModal(
    <DisclaimerModal onConfirm={markSeen} />,
  )

  useEffect(() => {
    const seenDisclaimer = true // localStorage.getItem('disclaimer')
    if (!seenDisclaimer) {
      onPresentDisclaimerModal()
    }
  }, [])
  

  return <div />
  
}



export default App
