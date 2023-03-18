import { useLocation } from "react-router-dom";
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  SkipToContent,
  HeaderMenu,
  HeaderGlobalAction,
  HeaderGlobalBar,
} from "carbon-components-react";
import { Notification, UserAvatar } from "@carbon/icons-react";
import "./AppHeader.scss";

function AppHeader() {
  const location = useLocation();
  return (
    <HeaderContainer
      render={() => (
        <Header aria-label="UTS Software Mangement System">
          <SkipToContent />
          <HeaderName href="/" prefix="UTS">
            Software Mangement System
          </HeaderName>
          <HeaderNavigation aria-label="UTS Software Mangement System">
            <HeaderMenuItem isCurrentPage={location.pathname == "/"} href="/">
              Home
            </HeaderMenuItem>
            <HeaderMenuItem
              isCurrentPage={location.pathname == "/project"}
              href="/project"
            >
              Projects
            </HeaderMenuItem>
            <HeaderMenuItem
              isCurrentPage={location.pathname == "/group"}
              href="/group"
            >
              Groups
            </HeaderMenuItem>
            <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
              <HeaderMenuItem href="/">Sub-link 1</HeaderMenuItem>
              <HeaderMenuItem href="/">Sub-link 2</HeaderMenuItem>
              <HeaderMenuItem href="/">Sub-link 3</HeaderMenuItem>
            </HeaderMenu>
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Notifications">
              <Notification />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="User Avatar">
              <UserAvatar />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
      )}
    />
  );
}

export default AppHeader;
