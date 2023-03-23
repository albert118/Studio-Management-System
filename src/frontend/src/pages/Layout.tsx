import React from "react";
import AppHeader from "../components/AppHeader/AppHeader";
import { Content } from "carbon-components-react";
import carbon__themes from "@carbon/themes";

interface Props {
  children: React.ReactNode;
}
function Layouts({ children }: Props) {
  return (
    <>
      <AppHeader />
      <Content>{children}</Content>
    </>
  );
}

export default Layouts;
