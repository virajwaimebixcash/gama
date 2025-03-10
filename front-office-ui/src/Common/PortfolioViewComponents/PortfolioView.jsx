import React, { useState, useEffect } from "react";
import { Button, Collapse } from "@mui/material";
import { styled } from "@mui/material/styles";
import speedometer from "../../images/speedometer.png";
import Paper from "@mui/material/Paper";
import VerifiedIcon from "@mui/icons-material/Verified";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { Box, Typography, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import { actionCreators } from "../../redux/actions/actionCreators";
import { useDispatch } from "react-redux";
import PortFolioDesktopMobileView from "./PortFolioDesktopMobileView";
import { useTranslation } from "react-i18next";

const PortfolioView = () => {
  const dispatch = useDispatch();
  const [openDiv, setOpenDiv] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // Controls detailed view visibility
  const [showQuickView, setShowQuickView] = useState(true); // Controls quick view visibility
  const [quickViewFields, setQuickViewFields] = useState([]); // Quick View fields configuration
  const [quickViewValues, setQuickViewValues] = useState({}); // Quick View field values
  const [detailViewData, setDetailViewData] = useState([]); // Detail View data with grouped fields
  const [detailViewValues, setDetailViewValues] = useState({}); // Detail View field values
  const { t } = useTranslation();

  // Function to handle toggle (open/close one div)
  const handleToggle = (divId) => {
    // If the clicked div is already open, close it by setting `openDiv` to null.
    // Otherwise, open the clicked div by setting `openDiv` to its ID.
    setOpenDiv((prevDivId) => (prevDivId === divId ? null : divId));
  };

  const handleClick = () => {
    setIsVisible(true); // Show detailed view
    setShowQuickView(false); // Hide quick view
  };

  const handleBackToQuickView = () => {
    setIsVisible(false); // Hide detailed view
    setShowQuickView(true); // Show quick view
  };

  useEffect(() => {
    if (showQuickView) {
      // Fetch Quick View fields configuration
      dispatch(actionCreators.GetPortFolioViewTypes("QuickView")).then(
        (res) => {
          if (res.status === 200 && res.data?.data?.length > 0) {
            const visibleFields = res.data.data[0].groupFields.filter(
              (field) => !field.isHide
            );
            setQuickViewFields([...visibleFields]); // Ensure new array
            // setQuickViewFields(visibleFields);
          }
        }
      );

      // Fetch Quick View field values
      dispatch(
        actionCreators.GetPortFolioViewTypeFieldValue("QuickView", "2222")
      ).then((res) => {
        if (res.status === 200) {
          setQuickViewValues({ ...res.data.data }); // Create a new object
          // setQuickViewValues(res.data.data);
        }
      });
    } else if (isVisible) {
      // Fetch Detail View fields configuration
      dispatch(actionCreators.GetPortFolioViewTypes("DetailView")).then(
        (res) => {
          if (res.status === 200) {
            // const sortedData = res.data.data.sort((a, b) => a.groupSequenceNo - b.groupSequenceNo);

            // Viraj Code Starts
            let sortedData = res.data.data.sort(
              (a, b) => a.groupSequenceNo - b.groupSequenceNo
            );

            sortedData = sortedData.map((gp) => {
              return {
                ...gp,
                groupName: t(gp.groupName),
                groupHeader: t(gp.groupHeader),
              };
            });
            // Viraj Code Ends

            setDetailViewData(sortedData);
          }
        }
      );

      // Fetch Detail View field values
      dispatch(
        actionCreators.GetPortFolioViewTypeFieldValue("DetailView", "2222")
      ).then((res) => {
        if (res.status === 200) {
          setDetailViewValues({ ...res.data.data }); // Create a new object
        }
      });
    }
  }, [dispatch, showQuickView, isVisible]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
  }));

  // Sort the quickViewFields based on fieldSequenceNo
  const sortedQuickViewFields = [...quickViewFields].sort(
    (a, b) => a.fieldSequenceNo - b.fieldSequenceNo
  );

  const getStatusIcon = (value) => {
    switch (value) {
      case "Not Applicable ":
        return (
          <DoNotDisturbIcon
            style={{ color: "red" }}
            className="successicon notappicon"
          />
        );
      case "UnVerified ":
        return (
          <DoNotDisturbIcon
            style={{ color: "red" }}
            className="successicon notappicon"
          />
        );
      case "Verified":
        return <VerifiedIcon color="success" className="successicon" />;
      case "Moderate":
        return (
          <img src={speedometer} alt="Speedometer" className="spedometor" />
        );
      case "Conservative":
        return (
          <img src={speedometer} alt="Speedometer" className="spedometor" />
        );
      default:
        return null; // Return nothing if the value doesn't match any specific conditions
    }
  };
  return (
    <>
      <Box className="maincontent">
        <Grid container spacing={2} className="whitecolorbg">
          <Grid
            container
            minHeight={20}
            size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <h2 className="headingtop">{t("PortfolioView")}</h2>
            </Grid>
            {/* Conditionally show "Back to Quick View" on the top left only when detailed view is visible */}
            {isVisible && (
              <Grid item>
                <Link
                  className=""
                  onClick={handleBackToQuickView}
                  style={{ cursor: "pointer" }}
                >
                  {t("BackToQuickView")}
                </Link>
              </Grid>
            )}
          </Grid>
          {/* ------------Quick View---------------------------------------- */}
          {showQuickView && (
            <>
              <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <h2 className="headingtsec">{t("QuickView")}</h2>
              </Grid>
              {sortedQuickViewFields.map((field, index) => {
                const fieldLabel = field.displayName
                  ? field.displayName
                  : field.fieldName; // Use displayName if available, otherwise fieldName
                const value =
                  quickViewValues[field.fieldName] !== null
                    ? quickViewValues[field.fieldName]
                    : "-";
                return (
                  <Grid
                    key={index}
                    className="minhegt50"
                    size={{ xs: 6, sm: 6, md: 4, lg: 3 }}
                  >
                    <p>{t(fieldLabel)}</p>
                    <label className="lbltxt">
                      {value || "-"} {/* Display the value or '-' */}
                      {getStatusIcon(value)}{" "}
                      {/* Display the appropriate icon or image */}
                    </label>
                  </Grid>
                );
              })}
              <Grid
                className="minhegt50"
                size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
              >
                <span className="linktxt" onClick={handleClick}>
                  {t("DetailedView")} +
                </span>
              </Grid>
            </>
          )}

          {/*------------- Detailed View ----------------------------------*/}
          {isVisible && (
            // <div className='parentclass'>
            <>
              <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <h2 className="headingtsec">{t("DetailedView")}</h2>
              </Grid>

              {/* Render fields with an empty groupName first */}
              {/* <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 12 }}> */}
              {detailViewData.map((group, groupIndex) =>
                group.groupName === ""
                  ? group.groupFields
                      .filter((field) => !field.isHide)
                      .sort((a, b) => a.fieldSequenceNo - b.fieldSequenceNo) // Filter out hidden fields
                      .map((field, fieldIndex) => {
                        const fieldLabel = field.displayName
                          ? field.displayName
                          : field.fieldName; // Use displayName if available, otherwise fieldName
                        const value =
                          detailViewValues[field.fieldName] !== null
                            ? detailViewValues[field.fieldName]
                            : "-";
                        return (
                          <Grid
                            key={fieldIndex}
                            size={{ xs: 6, sm: 6, md: 4, lg: 3 }}
                            className="minhegt50"
                          >
                            <p>{t(fieldLabel)}</p>
                            <label className="lbltxt">
                              {value || "-"} {/* Display the value or '-' */}
                              {getStatusIcon(value)}{" "}
                              {/* Display the appropriate icon or image */}
                            </label>
                          </Grid>
                        );
                      })
                  : null
              )}
              {/* </Grid> */}
              {/* Render groups with a groupName */}
            </>
            // </div>
          )}
        </Grid>
        {isVisible && (
          <Grid container className="whitecolorbg" sx={{ marginTop: "10px" }}>
            <Grid minHeight={20} sx={{ width: "100%" }}>
              {detailViewData.map((group, groupIndex) =>
                group.groupName ? (
                  <div key={groupIndex} width="100%">
                    <Grid
                      minHeight={20}
                      size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                    >
                      <span
                        className="pdb20 pdb201"
                        onClick={() => handleToggle(groupIndex)}
                      >
                        <span className="subtitle">
                          {group.groupHeader || group?.groupName}
                        </span>
                        <span className="buttonplus">
                          {openDiv === groupIndex ? "-" : "+"}
                        </span>
                      </span>
                      {openDiv === groupIndex && (
                        <div>
                          <PortFolioDesktopMobileView
                            groupFields={group.groupFields
                              .filter((field) => !field.isHide)
                              .sort(
                                (a, b) => a.fieldSequenceNo - b.fieldSequenceNo
                              )} // Filter out hidden fields
                            groupName={group.groupName}
                            groupIndex={groupIndex}
                            detailViewValues={detailViewValues}
                            dataGroup={group.dataGroup} // Pass the dataGroup
                          />
                        </div>
                      )}
                    </Grid>
                  </div>
                ) : null
              )}
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default PortfolioView;
