/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import {
    blackColor,
    dangerBoxShadow,
    dangerColor,
    defaultFont,
    grayColor,
    hexToRgb,
    infoBoxShadow,
    infoColor,
    primaryBoxShadow,
    primaryColor,
    roseBoxShadow,
    roseColor,
    successBoxShadow,
    successColor,
    warningBoxShadow,
    warningColor,
    whiteColor
} from "assets/jss/material-dashboard-react.jsx";

const snackbarContentStyle = {
    root: {
        ...defaultFont,
        flexWrap: "unset",
        position: "relative",
        padding: "20px 15px",
        lineHeight: "20px",
        marginBottom: "20px",
        fontSize: "14px",
        backgroundColor: whiteColor,
        color: grayColor[7],
        borderRadius: "3px",
        minWidth: "unset",
        maxWidth: "unset",
        boxShadow:
            "0 12px 20px -10px rgba(" +
            hexToRgb(whiteColor) +
            ", 0.28), 0 4px 20px 0px rgba(" +
            hexToRgb(blackColor) +
            ", 0.12), 0 7px 8px -5px rgba(" +
            hexToRgb(whiteColor) +
            ", 0.2)"
    },
    top20: {
        top: "20px"
    },
    top40: {
        top: "40px"
    },
    info: {
        backgroundColor: infoColor[3],
        color: whiteColor,
        ...infoBoxShadow
    },
    success: {
        backgroundColor: successColor[3],
        color: whiteColor,
        ...successBoxShadow
    },
    warning: {
        backgroundColor: warningColor[3],
        color: whiteColor,
        ...warningBoxShadow
    },
    danger: {
        backgroundColor: dangerColor[3],
        color: whiteColor,
        ...dangerBoxShadow
    },
    primary: {
        backgroundColor: primaryColor[3],
        color: whiteColor,
        ...primaryBoxShadow
    },
    rose: {
        backgroundColor: roseColor[3],
        color: whiteColor,
        ...roseBoxShadow
    },
    message: {
        padding: "0",
        display: "block",
        maxWidth: "89%"
    },
    close: {
        width: "11px",
        height: "11px"
    },
    iconButton: {
        width: "24px",
        height: "24px",
        padding: "0px"
    },
    icon: {
        display: "block",
        left: "15px",
        position: "absolute",
        top: "50%",
        marginTop: "-15px",
        width: "30px",
        height: "30px"
    },
    infoIcon: {
        color: infoColor[3]
    },
    successIcon: {
        color: successColor[3]
    },
    warningIcon: {
        color: warningColor[3]
    },
    dangerIcon: {
        color: dangerColor[3]
    },
    primaryIcon: {
        color: primaryColor[3]
    },
    roseIcon: {
        color: roseColor[3]
    },
    iconMessage: {
        paddingLeft: "50px",
        display: "block"
    },
    actionRTL: {
        marginLeft: "-8px",
        marginRight: "auto"
    }
};

export default snackbarContentStyle;
