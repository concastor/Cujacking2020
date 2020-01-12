import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
// import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
// import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionForm from "./Sections/SectionForm.js";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  // const { ...rest } = props;
  return (
    <div>
      {/*<Header*/}
      {/*  brand="Material Kit React"*/}
      {/*  rightLinks={<HeaderLinks />}*/}
      {/*  fixed*/}
      {/*  color="transparent"*/}
      {/*  changeColorOnScroll={{*/}
      {/*    height: 400,*/}
      {/*    color: "white"*/}
      {/*  }}*/}
      {/*  {...rest}*/}
      {/*/>*/}
      <Parallax image={require("assets/img/bg2.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Schedule Generator</h1>
                <h3 className={classes.subtitle}>
                  We <strike>will</strike> might make a better schedule than you.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionForm />
      </div>
      <Footer />
    </div>
  );
}