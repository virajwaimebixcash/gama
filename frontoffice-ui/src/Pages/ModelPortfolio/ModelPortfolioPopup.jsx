import React, { useEffect, useState } from "react";
import { Modal, Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from "@mui/material";
import Sorting from "./Sorting";
import Filter from "../../Common/CustomComponents/FilterComponent";
import singlestar from "../../images/singlestar.png";
import closewhite from "../../images/closewhite.png";
import { useFormContext } from "react-hook-form";

const ModelPortfolioPopup = ({ open, modalWidth, handleOpen, setOpen, data, getFundData }) => {
  const [selectedItems, setSelectedItems] = useState({});
  const [generatedSelectData, setGeneratedSelectData] = useState([]);
  const { setValue, watch, getValues, reset } = useFormContext();

  const handleCheckboxChange = (schemeCode, item) => {
    setSelectedItems((prev) => {
      const updatedSelectedItems = { ...prev, [schemeCode]: !prev[schemeCode] };

      setGeneratedSelectData((prevData) => {
        if (updatedSelectedItems[schemeCode]) {
          // Add item if selected
          return [...prevData, item];
        } else {
          // Remove item if unselected
          return prevData.filter((selectedItem) => selectedItem.SchemeCode !== schemeCode);
        }
      });

      return updatedSelectedItems;
    });
  };

  // Function to save selected data to the form and close the modal
  const handleAddToModel = () => {
    setValue("selectedSecurities", generatedSelectData)
    const fundData = getFundData(data);
    setValue("fundData", fundData)
    // const data = { ...getValues(), fundData: fundData }
    // reset({ ...data })
    setOpen(false); // Close modal
  };
  // useEffect(() => {
  //   const fundData = getFundData();
  //   const data = { ...getValues(), fundData: fundData }
  //   reset({ ...data })

  // }, [watch('selectedSecurities')])


  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: modalWidth,
          maxWidth: "1200px",
          height: "70vh",
          bgcolor: "white",
          boxShadow: 24,
          borderRadius: 2,
          p: 2,
        }}
      >
        <Typography>
          <div className='herarpop'>
            <span onClick={() => setOpen(false)}>
              <img src={closewhite} alt="close" />
            </span>
          </div>
          <div className='width50 newblaccol'>Select Securities</div>
          <div className="rightfloats">
            <Filter />
          </div>
        </Typography>

        <TableContainer component={Paper} elevation={0} className="maxtabel500">
          <Table sx={{ padding: 2 }} className="basefortabels1 forallspacecss">
            <TableHead>
              <TableRow className="tabheadsinall">
                <TableCell>Select</TableCell>
                <TableCell>
                  <div className='fon13nrl lefttxt'>
                    <span className='pullleft'>Security Name</span>
                    <span className='pullleft sorticon newposicon'><Sorting /></span>
                  </div>
                </TableCell>
                <TableCell>Returns (1M)</TableCell>
                <TableCell>Returns Since Inception</TableCell>
                <TableCell>Asset Class</TableCell>
                <TableCell>Vr Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.SchemeCode}>
                  <TableCell>
                    <Checkbox
                      checked={!!selectedItems[item.SchemeCode]}
                      onChange={() => handleCheckboxChange(item.SchemeCode, item)}
                    />
                  </TableCell>
                  <TableCell>{item.SchemeName}</TableCell>
                  <TableCell>{item.Returns1Month}%</TableCell>
                  <TableCell>{item.Returnssinceinception}%</TableCell>
                  <TableCell>{item.AssetClassName}</TableCell>
                  <TableCell>
                    {item.ValueResearchRating ? (
                      <table>
                        <tbody>
                          <tr>
                            <td className="starpos">{item.ValueResearchRating}</td>
                            <td className="starpos"><img src={singlestar} alt="star" /></td>
                          </tr>
                        </tbody>
                      </table>
                    ) : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="fullw texcenter smallspaces">
          <Button variant="contained" onClick={handleAddToModel} className="Generatebtn">
            Add to Model
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModelPortfolioPopup;
