import React from "react"
import PropTypes from "prop-types"

import CompleteHeader from "./header";
import Footer from "./footer";
import {FontLoader} from 'design-react-kit';

import "../components/style.css";

import "bootstrap-italia/dist/css/bootstrap-italia.min.css";
import "typeface-titillium-web";
import "typeface-roboto-mono";
import "typeface-lora";

const ChildrenLayout = ({ children, location }) => {


    return (
        <>
        <FontLoader />
        <CompleteHeader location={location} sticky type="default"/>
        <main>{children}</main>
        <Footer />
        </>
    );
};


ChildrenLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  export default ChildrenLayout;