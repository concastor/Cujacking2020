import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "daypilot-pro-react";

const useStyles = makeStyles(styles);

function submit() {
    var textBoxes = ["course1","course2","course3","course4","course5","course6"];
    var courses = []
    var i;

    for (i = 0; i < textBoxes.length; i++) {
        if (!document.getElementById(textBoxes[i]).value === false){
            courses.push(document.getElementById(textBoxes[i]).value);
        }
    }
}

export default function SectionBasics() {
    const classes = useStyles();
    var {...config} = {
        viewType: "Week",
        startDate: "2019-09-15",
        events: [
            {
                id: 1,
                text: "Event 1",
                start: "2019-09-16T10:30:00",
                end: "2019-09-16T13:00:00"
            },
            {
                id: 2,
                text: "Event 2",
                start: "2019-09-17T12:00:00",
                end: "2019-09-17T14:00:00",
            }
        ]
    }
    return (
        <div className={classes.sections} id = "bens-working-area">
            <div className={classes.container}>
                <div className={classes.title}>
                    <h2>Course Input</h2>
                </div>
                <div id="inputs">
                    <GridContainer>
                        <GridItem xs={12} sm={4} md={2} lg={2}>
                            <CustomInput
                                id="course1"
                                inputProps={{
                                    placeholder: "Course"
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4} md={2} lg={2}>
                            <CustomInput
                                id="course2"
                                inputProps={{
                                    placeholder: "Course"
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4} md={2} lg={2}>
                            <CustomInput
                                id="course3"
                                inputProps={{
                                    placeholder: "Course"
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4} md={2} lg={2}>
                            <CustomInput
                                id="course4"
                                inputProps={{
                                    placeholder: "Course"
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4} md={2} lg={2}>
                            <CustomInput
                                id="course5"
                                inputProps={{
                                    placeholder: "Course"
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4} md={2} lg={2}>
                            <CustomInput
                                id="course6"
                                inputProps={{
                                    placeholder: "Course"
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    <Button
                        type="button"
                        color="primary"
                        id = "submit_button"
                        onClick={submit}>Submit
                    </Button>
                    <div style={{paddingTop: 30}}>
                        <DayPilotCalendar
                            {...config}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
