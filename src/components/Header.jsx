import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components 정의
const HeaderContainer = styled.div`
  position: relative;
`;

const HeaderWrap = styled.div`
  height: 64px;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeftWrap = styled.div`
  display: flex;
`;

const Navbar = styled.ul`
  display: flex;
  margin-left: 16px;
  list-style: none;
  padding: 0;
  margin: 0;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(Link)`
  margin-right: 14px;
  padding: 8px;
  color: white;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    color: #007BFF;
  }
`;

const MenuIcon = styled.button`
  display: none;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const SidebarContainer = styled.div`
  height: 100%;
  width: 250px;
  position: fixed;
  top: 0;
  left: -250px;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.3s;
  padding-top: 60px;
  z-index: 1000;

  &.open {
    left: 0;
  }

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 25px;
  font-size: 36px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;

const SidebarLink = styled(Link)`
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;

  &:hover {
    color: #f1f1f1;
  }
`;

// Header 컴포넌트
const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <HeaderContainer>
      <HeaderWrap>
        <HeaderLeftWrap>
          <NavItem as={Link} to='/'>UMC MOVIE</NavItem>
          <Navbar>
            <li><NavItem to='/signup'>회원가입</NavItem></li>
            <li><NavItem to='/popular'>Popular</NavItem></li>
            <li><NavItem to='/nowplaying'>Now Playing</NavItem></li>
            <li><NavItem to='/toprated'>Top Rated</NavItem></li>
            <li><NavItem to='/upcoming'>UpComing</NavItem></li>
          </Navbar>
        </HeaderLeftWrap>
        <MenuIcon onClick={toggleSidebar}>☰</MenuIcon>
      </HeaderWrap>
      <SidebarContainer className={sidebarOpen ? 'open' : ''}>
        <CloseButton onClick={closeSidebar}>X</CloseButton>
        <ul>
          <li><SidebarLink to='/signup' onClick={closeSidebar}>회원가입</SidebarLink></li>
          <li><SidebarLink to='/popular' onClick={closeSidebar}>Popular</SidebarLink></li>
          <li><SidebarLink to='/nowplaying' onClick={closeSidebar}>Now Playing</SidebarLink></li>
          <li><SidebarLink to='/toprated' onClick={closeSidebar}>Top Rated</SidebarLink></li>
          <li><SidebarLink to='/upcoming' onClick={closeSidebar}>UpComing</SidebarLink></li>
        </ul>
      </SidebarContainer>
    </HeaderContainer>
  );
};

export default Header;
