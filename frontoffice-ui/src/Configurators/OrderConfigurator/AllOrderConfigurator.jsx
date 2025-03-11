import React, { useEffect, useState } from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from "@mui/material";
import { actionCreators } from '../../redux/actions/actionCreators';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

function AllOrderConfigurator() {
  const dispatch = useDispatch();

  const [configData, setConfigData] = useState([]);
  const navigate = useNavigate();

  /**
   * Navigates to the edit order configurator page with the specified parameters.
   *
   * @param {number} productClassId - The ID of the product class.
   * @param {number[]} productSubClassId - An array of product sub-class IDs.
   * @param {number} orderTypeId - The ID of the order type.
   * @param {number[]} portfolioTypeId - An array of portfolio type IDs.
   */
  const handleEditClick = (productClassId, productSubClassId, orderTypeId, portfolioTypeId) => {
    const productSubClassIdStr = productSubClassId.join(',');
    const portfolioTypeIdStr = portfolioTypeId.join(',');

    navigate(`/edit-order-configurator?action=edit&productClassId=${productClassId}&productSubClassId=${productSubClassIdStr}&orderTypeId=${orderTypeId}&portfolioTypeId=${portfolioTypeIdStr}`);
  };


  /**
   * Fetches all configurator details and updates the component state with the response data.
   * This effect is triggered when the component is mounted or the `dispatch` function changes.
   */
  useEffect(() => {
    dispatch(actionCreators.GetAllConfiguratorDetails()).then((res) => {
      if (res.status === 200) {
        setConfigData(res.data.data)
      }
    })
      .catch((error) => {
        console.error("Error fetching config:", error);
      });

  }, [dispatch]);

  return (
    <>
      {/* <Typography variant="h4" mt={2} ml={2}>
        Order Configurations
      </Typography> */}
      <div className="containerspacing">
      <h2 className="mainheding">Order Configurations</h2>
      <Box display="flex" justifyContent="flex-end" mb={2} mt={2} mr={2}>
        <Button variant="contained" color="primary" onClick={() => navigate('/order-configurator')}>
          Add New Configurator
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Product Sub-Class</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Order Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Portfolio Type</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {configData.map((config, index) => (
              <TableRow key={index}>
                {/* Display product */}
                <TableCell><Typography>{config.productName}</Typography></TableCell>
                {/* Display product sub-classes in a stacked format */}
                <TableCell>
                  {config.productSubClass.map((subClass, idx) => (
                    <Typography key={idx}>{subClass}</Typography>
                  ))}
                </TableCell>
                {/* Display order type */}
                <TableCell><Typography>{config.orderType}</Typography></TableCell>

                {/* Display portfolio types in a stacked format */}
                <TableCell>
                  {config.portfolioType.map((type, idx) => (
                    <Typography key={idx}>{type}</Typography>
                  ))}
                </TableCell>

                {/* Edit button */}
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditClick(config.productClassId, config.productSubClassIds, config.orderTypeIds, config.portfolioTypeIds)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </>
  );
};
export default AllOrderConfigurator;