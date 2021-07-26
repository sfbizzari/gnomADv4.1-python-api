import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '@gnomad/ui'

import Searchbox from './Searchbox'

const NavBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 30px;
  background-color: black;

  a {
    color: white;
    text-decoration: none;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 10px;
  }
`

const LogoWrapper = styled.div`
  @media (max-width: 900px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 5px;
  }
`

const Logo = styled.div`
  color: white;
  font-size: 1.5em;
  font-weight: bold;
`

const ToggleMenuButton = styled(Button)`
  border: 1px solid #fafafa;
  background: black;
  color: white;

  @media (min-width: 901px) {
    display: none;
  }
`

const Menu = styled.ul`
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
  list-style-type: none;

  a {
    padding: 0.5em;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    width: 100%;
    height: ${props => (props.isExpanded ? 'auto' : 0)};

    a {
      display: inline-block;
      width: 100%;
      padding: 1em 0;
    }
  }
`

const OuterWrapper = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.23);

  @media print {
    display: none;
  }
`

// const Notice = styled.div`
//   padding: 0.75em 0.5em;
//   background: rgb(17, 115, 187);
//   color: white;
//   text-align: center;
//
//   a {
//     color: white;
//   }
// `

class NavBar extends Component {
  state = {
    isExpanded: false,
  }

  toggleMenu = () => {
    this.setState(state => ({ ...state, isExpanded: !state.isExpanded }))
  }

  closeMenu = () => {
    this.setState({ isExpanded: false })
  }

  render() {
    const { isExpanded } = this.state
    return (
      <OuterWrapper>
        <NavBarWrapper>
          <LogoWrapper>
            <Link to="/" onClick={this.closeMenu}>
              <Logo>gnomAD browser</Logo>
            </Link>
            <ToggleMenuButton onClick={this.toggleMenu}>☰</ToggleMenuButton>
          </LogoWrapper>
          <Searchbox id="navbar-search" placeholder="Search" width="360px" />
          <Menu isExpanded={isExpanded}>
            <li>
              <Link to="/about" onClick={this.closeMenu}>
                About
              </Link>
            </li>
            <li>
              {/* a instead of Link because the blog is a separate application */}
              <a href="/news/">News</a>
            </li>
            <li>
              <Link to="/downloads" onClick={this.closeMenu}>
                Downloads
              </Link>
            </li>
            <li>
              <Link to="/terms" onClick={this.closeMenu}>
                Terms
              </Link>
            </li>
            <li>
              <Link to="/publications" onClick={this.closeMenu}>
                Publications
              </Link>
            </li>
            <li>
              <Link to="/feedback" onClick={this.closeMenu}>
                Feedback
              </Link>
            </li>
            <li>
              {/* a instead of Link because the blog is a separate application */}
              <a href="/news/changelog/">Changelog</a>
            </li>
            <li>
              <Link to="/help" onClick={this.closeMenu}>
                Help
              </Link>
            </li>
          </Menu>
        </NavBarWrapper>
        {/* <Notice></Notice> */}
      </OuterWrapper>
    )
  }
}

export default NavBar
