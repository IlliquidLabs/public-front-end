import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink
        target="_blank"
        href="https://arbiscan.io/address/0xf85CD66461088284480a455D2B2933E69B789BAF#code"
      >
        QueenBee Contract
      </StyledLink>
      <StyledLink
        target="_blank"
        href="https://app.sushi.com/swap?inputCurrency=0xdE31e75182276738B0c025daa8F80020A4F2fbFE&outputCurrency=ETH"
      >
        Sushiswap HONEY-ETH
      </StyledLink>
      {/* <StyledLink target="_blank" href="https://discord.gg/">
        Discord
      </StyledLink> */}
      <StyledLink target="_blank" href="https://github.com/thehoneypotfinance">
        Github
      </StyledLink>
      <StyledLink target="_blank" href="https://twitter.com/honeymoneyyield">
        Twitter
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default Nav
