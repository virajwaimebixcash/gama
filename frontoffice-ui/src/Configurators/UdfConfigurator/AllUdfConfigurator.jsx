import { useEffect, useState } from "react";
import { Container, Chip, Typography, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { actionCreators } from '../../redux/actions/actionCreators';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

function AllUdfConfigurator() {
  const dispatch = useDispatch();

  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState('');

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
  const handleEditClick = (entityId, dtlConfigId) => {
    navigate(`/edit-udf-configurator?action=edit&entityId=${entityId}&dtlConfigId=${dtlConfigId}`);
  };

  // const handleDeleteClick = (entityId, dtlConfigId) => {
  //   console.log(entityId,dtlConfigId)
  //   showModal({
  //     show: true,
  //     icon: "error",
  //     text: "Are you sure you want to delete this Model Portfolio?",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes",
  //     cancelButtonText: "No",
  //     onConfirmButton: () => {
  //       api.post('/udfConfigurator/delete', { entityId: entityId, dtlConfigId: dtlConfigId})
  //         .then((res) => {
  //           if (res.status === 200) {
  //             showModal({ show: true, text: res.data.message, icon: "success" });
  //             setListingData((prevData) => prevData.filter(item => item.entityId !== rowId));
  //           }
  //         })
  //         .catch((error) => showModal({ show: true, text: error, icon: "error" }));
  //     }
  //   });
  // };

  const handleEntityChange = (entityName) => {
    setSelectedEntity(entityName);
  }

  /**
   * Fetches all configurator details and updates the component state with the response data.
   * This effect is triggered when the component is mounted or the `dispatch` function changes.
   */
  useEffect(() => {
    dispatch(actionCreators.GetEntityMasterDetails()).then((res) => {
      if (res.status === 200) {
        setEntities(res.data.data)
      }
    })

  }, [dispatch]);

  useEffect(() => {
    if (selectedEntity) {
      dispatch(actionCreators.GetAllUDFConfiguratorDetails(selectedEntity)).then((res) => {
        if (res.status === 200) {
          setConfigData(res.data.data)
        }
      }).catch((err) => {
        console.error("Error fetching UDF configurator details:", err);
        setConfigData([]);
      })
    }
  }, [selectedEntity, dispatch]);  

  return (
    <>
      <h2 className="mainheding">UDF Configurations</h2>
      {/* <Container className='maincontainer' > */}
       <div className="containerspacing">
        <Grid container spacing={2} sx={{ mb: 3 }} alignItems="center" justifyContent="space-between">
          <Grid size={{ xs: 6, md: 2, lg: 2 }}>
            <FormControl size="small" variant="filled" fullWidth
              sx={{
                '& .MuiInputBase-input': { fontSize: '10px' },
                '& .MuiInputLabel-root': { fontSize: '12px' }
              }}
            >
              <InputLabel id="select-entity-label">Select Entity</InputLabel>
              <Select
                sx={{ pt: 2 }}
                labelId="select-entity-label"
                value={selectedEntity}
                onChange={(e) => handleEntityChange(e.target.value)}
                label="Select Entity"
                renderValue={(selected) => {
                  const selectedItem = entities.find((item) => item.entityId === Number(selected));
                  return selectedItem ? (
                    <Chip label={selectedItem.tableName} />
                  ) : (
                    <em>Select</em>
                  );
                }}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {entities.map((entity) => (
                  <MenuItem key={entity.entityId} value={entity.entityId}>
                    {entity.tableName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid display="flex" justifyContent="flex-end" mb={2} mt={2} mr={2}>
            <Button variant="contained" color="primary" onClick={() => navigate('/udf-configurator')}>
              Add New Configurator
            </Button>
          </Grid>
        </Grid>

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
                  <TableCell><Typography>{config.productClassName}</Typography></TableCell>
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
                      onClick={() => handleEditClick(config.entityId, config.dtlConfigId)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleDeleteClick(config.entityId, config.dtlConfigId)}
                      sx={{ marginLeft: 1 }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      {/* </Container> */}
    </>
  );
};
export default AllUdfConfigurator;