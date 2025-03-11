import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import clientlogosmall from "../../../images/clientlogosmall.png";
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import PopupSWP from './PopupSWP';
import TransactAction from '../../../Common/CustomComponents/TransactAction';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

export default function SWPManagerSection({ swpManagerActionData, swpManagerConfigData, swpManagerTableData }) {
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState({});

    const handleOpen = (data) => {
        setModalData(data);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    // Filtering out 'SecurityName' and 'Status', and sorting based on 'fieldSequence'
    const filteredAndSortedData = swpManagerConfigData
        ?.filter(item => item.fieldName !== 'fund_Name' && item.fieldName !== 'status')
        ?.sort((a, b) => a.fieldSequence - b.fieldSequence) || [];

    //----------------- Slicing First 4 fields and remaining fields
    const firstFourFields = filteredAndSortedData.slice(0, 4);
    const remainingFields = filteredAndSortedData.slice(4);
    console.log(swpManagerTableData, "swpManagerTableData");

    const groupedData = swpManagerTableData?.reduce((acc, curr) => {
        const { fund_Name, amount } = curr;
        if (!acc[fund_Name]) {
            acc[fund_Name] = { rows: [], totalAmount: 0 };
        }
        acc[fund_Name].rows.push(curr);
        acc[fund_Name].totalAmount += parseFloat(amount) || 0; // Total Sum amounts, handle undefined or NaN
        return acc;
    }, {});

    // Sort the rows in each group by the Status column in ascending order
    //   Object.keys(groupedData).forEach((fundName) => {
    //     groupedData[fundName] = groupedData[fundName].sort((a, b) => {
    //       const statusA = a.Status?.toLowerCase() || ""; // Handle cases where Status might be undefined
    //       const statusB = b.Status?.toLowerCase() || "";
    //       return statusA.localeCompare(statusB);
    //     });
    //   });

    return (
        <Box sx={{ flexGrow: 1 }}>
            {swpManagerTableData?.length === 0 ? (
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "200px" }}>
                    <Typography variant="h6" color="textSecondary">
                        No Record Found
                    </Typography>
                </Grid>
            ) : (
                Object.entries(groupedData).map(([fund_Name, { rows, totalAmount }], index) => (
                    <Grid key={`${fund_Name}_${index}`} className="contentsintab1">
                        <Grid container spacing={2}>
                            <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 9 }} >
                                <div className='texleftimp onlyflol '><img src={clientlogosmall} className='clilogosmall' /></div>
                                <div className=' fon13bld texleftimp  extpadbot20'>
                                    {fund_Name}
                                    {/* <span className='darkblcbld'>₹ 5000</span> */}
                                    <span className="darkblcbld">₹ {totalAmount.toLocaleString("en-IN")}</span> {/* Display total AIP amount */}
                                </div>
                            </Grid>
                            {/* <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 3 }} >
                                <div className='rightfloats pointercusrs '>
                                    <div>
                                        <div className='center'>
                                           
                                            <span className='pullright'><TransactAction /></span>
                                        </div>
                                    </div>
                                </div>
                            </Grid> */}
                        </Grid>
                        <div className='bxshadodsswp '>
                            <Grid container spacing={2} className="extforuper">
                                <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                                    <Item>
                                        <Grid container spacing={2} className='showincell1 hideincell1 whitewithpadding '>
                                            {firstFourFields?.map(config => (
                                                <Grid minHeight={20} size={{ xs: 6, sm: 6, md: 6, lg: 2 }} className='colinsiptb' key={config.fieldName}>
                                                    <Item className='nobackcol fon13bld aligmeleftsnew'>{config.displayHeader || "N/A"}</Item>
                                                </Grid>
                                            ))}
                                            <Grid minHeight={20}
                                                size={{ xs: 6, sm: 6, md: 6, lg: 2 }}
                                                className="colinsiptb ">
                                                <Item className="nobackcol fon13bld aligmeleftsnew">
                                                    {/* View Details */}
                                                </Item>
                                            </Grid>
                                            {/* Status Column from Config */}
                                            {swpManagerConfigData.some((config) => config.fieldName === "status") && (
                                                <Grid minHeight={20} xs={6} sm={6} md={6} lg={2} className="colinsiptb">
                                                    <Item className="nobackcol fon13bld aligmeleftsnew paddforinnersip">
                                                        {swpManagerConfigData.find((config) => config.fieldName === "status")?.displayHeader || "Status"}
                                                    </Item>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Item>
                                </Grid>
                            </Grid>

                            {rows.map((row, rowIndex) => (
                                <Grid key={`row_${rowIndex}`} spacing={2}>
                                    <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                                        <Item>
                                            <Grid container spacing={2} className='whitewithpadding'>
                                                {firstFourFields.map((config) => (
                                                    <Grid
                                                        minHeight={20}
                                                        size={{ xs: 6, sm: 6, md: 6, lg: 2 }}
                                                        className="colinsiptb fonsizenweigh"
                                                        key={config.fieldName}
                                                    >
                                                        <Item className="nobackcol fon13bld blacktxt texleft">
                                                            {row[config.fieldName] || "N/A"}
                                                        </Item>
                                                    </Grid>
                                                ))}
                                                {/* -----------------view Details column------------- */}
                                                <Grid minHeight={20}
                                                    size={{ xs: 6, sm: 6, md: 6, lg: 2 }}
                                                    className="colinsiptb fonsizenweigh">
                                                    <Item>
                                                        <div className=' linktxtnewview' onClick={() => handleOpen({ ...row })}>
                                                            {/* <Button
                                                onClick={() => handleOpen({ Fund_Name, ...row })}
                                                sx={{ color: "blue", textTransform: "none", mt: 1 }}
                                                > */}
                                                            View Details +
                                                            {/* </Button> */}
                                                        </div>
                                                    </Item>
                                                </Grid>
                                                {/* ------------Status Column------------ */}
                                                {swpManagerConfigData.some((config) => config.fieldName === "status") && (
                                                    
                                                    <Grid item size={{ xs: 6, sm: 6, md: 6, lg: 2 }} className="colinsiptb fonsizenweigh">
                                                        <Item className="nobackcol fon13bld blacktxt texleft">
                                                            <div className="inlineDisplay">
                                                                <span className={`${row.status?.trim() === "Active" ? "activebtnssmall" : ""}`}>{row.status || "N/A"}</span>
                                                                <span className="SIPdd">
                                                                    <PopupSWP swpManagerActionData={swpManagerActionData} />
                                                                </span>
                                                            </div>
                                                        </Item>
                                                    </Grid>
                                                )}

                                            </Grid>
                                        </Item>
                                    </Grid>
                                </Grid>
                            ))}
                        </div>
                        <div className='gapsdiveall'></div>
                    </Grid>
                ))
            )}
            {/* Dialog for View Details */}
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="lg"
                PaperProps={{
                    style: {
                        width: "60%", // Custom width (adjust as needed)
                        maxHeight: "90vh", // Ensure it doesn’t overflow vertically
                    },
                }}
            >

                <h2 className="headingtop pl23">View Details</h2>
                <DialogContent>
                    <Grid container spacing={2}>
                        {remainingFields.map((config) => (
                            <Grid key={config.fieldName}>
                                <Grid
                                    className="minhegt50 fixheiflexwidth"
                                    size={{ xs: 6, sm: 6, md: 4, lg: 3 }}
                                >
                                    <p>{config.displayHeader || "N/A"}</p>
                                    <label className="lbltxt">
                                        {modalData[config.fieldName] || "N/A"}
                                    </label>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}