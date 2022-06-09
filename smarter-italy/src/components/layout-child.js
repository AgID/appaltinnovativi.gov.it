import React from "react"
import PropTypes from "prop-types"

import CompleteHeader from "./header";
import ChildFooter from "./footer";
import {FontLoader} from 'design-react-kit';

import "../components/style.css";

import "bootstrap-italia/dist/css/bootstrap-italia.min.css";
import "typeface-titillium-web";
import "typeface-roboto-mono";
import "typeface-lora";

const ChildrenLayout = ({ children, location }) => {

    const org = {
        name: 'SMARTER ITALY',
        tagLine: 'Appaltinnovativi.GOV',
        navMenu:[{path:'Cosa è', inPagina:"true"},{path:'Come', inPagina:"true"},{path:'Perchè', inPagina:"true"}]
    };

    return (
        <>
        <FontLoader />
        <CompleteHeader location={location} sticky type="default"/>
        <main>{children}</main>
        <ChildFooter />
        </>
    );
};


ChildrenLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  export default ChildrenLayout;