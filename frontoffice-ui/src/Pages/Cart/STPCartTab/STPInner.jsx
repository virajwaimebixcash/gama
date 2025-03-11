import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle,Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import TransactAction from '../../../Common/CustomComponents/TransactAction';
import PopupSTP from './PopupSTP';

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

export default function STPInner({ stpManagerActionData, stpManagerConfigData, stpManagerTableData }) {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleOpen = (data) => {
    setModalData(data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const filteredAndSortedData = stpManagerConfigData
    ?.filter(item => item.fieldName !== 'fund_Name' && item.fieldName !== 'target_Fund_Name' && item.fieldName !== 'status')
    ?.sort((a, b) => a.fieldSequence - b.fieldSequence) || [];

  const firstFourFields = filteredAndSortedData.slice(0, 4);
  const remainingFields = filteredAndSortedData.slice(4);

  // const groupedData = stpManagerTableData.reduce((acc, curr) => {
  //   const { Fund_Name } = curr;
  //   if (!acc[Fund_Name]) acc[Fund_Name] = [];
  //   acc[Fund_Name].push(curr);
  //   return acc;
  // }, {});

  const groupedData = stpManagerTableData.reduce((acc, curr) => {
    const { fund_Name, target_Fund_Name } = curr;
    const key = `${fund_Name}$${target_Fund_Name}`; // Combine the two fields to form a compound key

    if (!acc[key]) acc[key] = [];
    acc[key].push(curr);

    return acc;
  }, {});

  return (
    <Box sx={{ flexGrow: 1 }}>

      {stpManagerTableData?.length === 0 ? (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "200px" }}>
          <Typography variant="h6" color="textSecondary">
            No Record Found
          </Typography>
        </Grid>
      ) : (

        Object.entries(groupedData).map(([fund_Name, rows], index) => (
          <Grid key={`${fund_Name}_${index}`} className="contentsintab">
            {/* -------------------- Security Fund name and amount --------------------- */}
            <Grid container spacing={2}>
              <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 5 }} >
                <div className='texleftimp onlyflol  mr10' >
                  Source Security Name
                </div>
                <div className=' fon13bld texleftimp  extpadbot20'>
                  {fund_Name?.split("$")[0]}
                </div>
              </Grid>
              <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 5 }} >
                <div className='texleftimp onlyflol  mr10'>
                  Target Security Name
                </div>
                <div className=' fon13bld texleftimp  extpadbot20'>
                  {fund_Name?.split("$")[1]}
                </div>
              </Grid>
              {/* <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 2 }} >
                <div className='rightfloats pointercusrs '>
                  <div>
                    <div className='center'>
                      <span className='pullright'>
                        <TransactAction />
                      </span>
                    </div>
                  </div>
                </div>
              </Grid> */}
            </Grid>
            {/* -------------------- Security name and amount --------------------- */}

            {/* Table Header */}
            <div className='bxshadods '>
              <Grid container spacing={2} className="showincell1 hideincell1 whitewithpadding">
                {firstFourFields.map((config) => (
                  <Grid
                    minHeight={20}
                    size={{ xs: 6, sm: 6, md: 6, lg: 2 }}
                    className="colinsiptb"
                    key={config.dispatcherName}
                  >
                    <Item className="nobackcol fon13bld aligmeleftsnew">
                      {config.displayHeader || "N/A"}
                    </Item>
                  </Grid>
                ))}
                <Grid minHeight={20}
                  size={{ xs: 6, sm: 6, md: 6, lg: 2 }}
                  className="colinsiptb">
                  <Item className="nobackcol fon13bld aligmeleftsnew">
                    {/* View Details */}
                    </Item>
                </Grid>
                 {/* Status Column from Config */}
                 {stpManagerConfigData.some((config) => config.fieldName === "status") && (
                    <Grid minHeight={20} xs={6} sm={6} md={6} lg={2} className="colinsiptb">
                      <Item className="nobackcol fon13bld aligmeleftsnew paddforinnersip">
                        {stpManagerConfigData.find((config) => config.fieldName === "status")?.displayHeader || "Status"}
                      </Item>
                    </Grid>
                  )}

              </Grid>

              {/* Table Rows */}
              {rows.map((row, rowIndex) => (
                <Grid key={`row_${rowIndex}`} spacing={2} className="whitewithpadding ">
                  <Grid minHeight={20} size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                    <Item>
                      <Grid container spacing={2}>
                        {firstFourFields.map((config) => (
                          <Grid
                            minHeight={20}
                            size={{ xs: 6, sm: 6, md: 6, lg: 2 }}
                            className="colinsiptb fonsizenweigh"
                            key={config.fieldName}
                          >
                            <Item className="nobackcol fon13bld blacktxtstabs texleft">
                              {row[config.fieldName] || "N/A"}
                            </Item>
                          </Grid>
                        ))}
                        {/* -----------------view Details column------------- */}
                        <Grid minHeight={20}
                          size={{ xs: 6, sm: 6, md: 6, lg: 2 }}
                          className="colinsiptb fonsizenweigh">
                          <Item>
                            <div className='texleftimp linktxtnewview' onClick={() => handleOpen({ ...row })}>
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
                        {stpManagerConfigData.some((config) => config.fieldName === "status") && (
                          
                          <Grid item size={{ xs: 6, sm: 6, md: 6, lg: 2 }} className="colinsiptb fonsizenweigh">
                            <Item className="nobackcol fon13bld blacktxt texleft">
                              <div className="inlineDisplay">
                                <span className={`${row.status?.trim() === "Active" ? "activebtnssmall" : ""}`}>{row.status || "N/A"}</span>
                                <span className="SIPdd">
                                <PopupSTP stpManagerActionData={stpManagerActionData} />
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
