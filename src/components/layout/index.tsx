import React  from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from "components/layout/Header";

interface Props {
    children: React.ReactNode;
}


const Layout : React.FC<Props> = ({children}) => {
 return (
     <>
         <Header/>
         <CssBaseline />
         <Container maxWidth="lg">
             <main>{children}</main>
         </Container>

     </>
 )
};

export default Layout;