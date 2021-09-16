import React from 'react'
import styled from 'styled-components'
import beekeeper from '../../assets/img/beeKeeper.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import PageFooter from '../../components/PageFooter'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'

const Home: React.FC = () => {
  return (
	  
    <Page>
		
      <PageHeader
        icon={<img src={beekeeper} height={120} />}
        title="The Hive is Ready"
        subtitle="Stake Sushiswap LP tokens to claim your sweet HONEY!"
      />

      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      <StyledInfo>
        🏆<b>Pro Tip</b>: HONEY-ETH SLP token pool yields <strong>TEN</strong> times more tokens
        rewards per block.
      </StyledInfo>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Button text="🌳 See where the Bees are..." to="/farms" variant="secondary" />
		

		<PageFooter
        icon="🐝"
        title="Brand new to Arbitrum!"
        subtitle="Nostalgic yield farming with great APY"
      />
	  
      </div>
	  
    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.black};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
  border-radius: 90%;
  background: #e2761e68;

  > b {
    color: ${(props) => props.theme.color.black};
  }
`

export default Home
