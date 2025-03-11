import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  Grid,
  createTheme,
  ThemeProvider,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Typography,
  Collapse,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import { IconButton, Tooltip } from "@mui/material";
import CreateGroupModal from "./CreateGroupModal";
import App from "./QuickPortfolioView";
import api from "../../APIs/interceptor";
import CustomAlert from "../../Common/CustomComponents/CustomAlert";
import { useTranslation } from "react-i18next";

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: "12px",
        },
      },
    },
  },
});

function PortfolioConfigForm() {
  // const [apis, setApis] = useState([{ name: 'List Users' }]);
  const [editGroupDetails, SetEditGroupDetails] = useState({
    index: "",
    details: [],
  });
  const [selectedViewType, setselectedViewType] = useState("Detail view");
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [alertOpen, setAlertOpen] = useState({
    show: false,
    msg: "",
    type: "success",
  });
  const [rows, setRows] = useState([]);
  const [fieldsRow, setFieldsRow] = useState([]);
  const [selectedOption] = useState("");
  const [sortFields, setSortField] = useState(1);
  const { t } = useTranslation();

  const handleShowCreateModal = () => {
    setShowCreateGroupModal(true);
    SetEditGroupDetails({ index: "", details: [] });
  };

  const handleRemoveRow = (groupId) => {
    api
      .post("/portfolioviewconfigurator/groupDelete", [groupId])
      .then((data) => {
        setAlertOpen({ show: true, msg: data.data.message, type: "success" });
        getGroups();
        SaveCreatedFields(groupId);
      })
      .catch((error) => {
        setAlertOpen({ show: true, msg: error.join("", ","), type: "error" });
        console.error("Error fetching entities:", error);
      });
  };

  const SaveCreatedGroup = () => {
    let filteredRows = rows.filter((row) => row.pvGroupId !== "null");

    // Map the filtered rows to update groupSequenceNo
    let paylod = filteredRows.map((row, index) => {
      row.groupSequenceNo = index;
      return row;
    });
    api
      .post("/portfolioviewconfigurator/groupUpdate", paylod)
      .then(() => {
        setAlertOpen({
          show: true,
          msg: "Groups Sequence Updated Successfully",
          type: "success",
        });
        getGroups();
      })
      .catch((error) => {
        setAlertOpen({ show: true, msg: error.join("", ","), type: "error" });
        console.error("Error fetching entities:", error);
      });
  };

  const SaveCreatedFields = (id) => {
    const formdata = Array.from(fieldsRow);
    const payload = [];
    let data;
    for (let i in formdata) {
      const singleData = formdata[i];
      data = singleData;
      data.pageViewType = "DetailView";
      data.pvConfigDetailId = data.pvConfigDetailId
        ? data.pvConfigDetailId
        : "";
      data.displayName = data.displayName ? data.displayName?.trim() : "";
      data.fieldSequenceNo = i;
      if (id && data.pvGroupId === id) {
        data.pvGroupId = null;
      }
      if (singleData.data) {
        for (let j in singleData.data) {
          data = singleData.data[j];
          data.pvConfigDetailId = data.pvConfigDetailId
            ? data.pvConfigDetailId
            : "";
          data.displayName = data.displayName ? data.displayName.trim() : "";
          data.pageViewType = "DetailView";
          data.fieldSequenceNo = j;
          payload.push(data);
        }
      } else {
        payload.push(data);
      }
    }
    api
      .post("/portfolioviewconfigurator/configuratorSave", payload)
      .then(() => {
        if (!id) {
          setAlertOpen({
            show: true,
            msg: "Detail View Configuration Saved Successfully",
            type: "success",
          });
        }
        getFields();
      })
      .catch((error) => {
        setAlertOpen({ show: true, msg: error.join("", ","), type: "error" });
        console.error("Error fetching entities:", error);
      });
  };

  const handleDragEnd = (result, type, groupName = null) => {
    if (!result.destination) return; // Exit if dropped outside

    if (type === "field") {
      const newRows = Array.from(fieldsRow);
      const [movedRow] = newRows.splice(result.source.index, 1);
      newRows.splice(result.destination.index, 0, movedRow);

      setFieldsRow(newRows);
    }

    if (type === "group") {
      const newRows = Array.from(rows);
      const [movedRow] = newRows.splice(result.source.index, 1);
      newRows.splice(result.destination.index, 0, movedRow);
      setRows(newRows);
    }

    if (type === "nested-field" && groupName) {
      const group = fieldsRow.find((row) => {
        return row.groupName === groupName;
      });

      if (group) {
        const newGroupData = Array.from(group.data);
        const [movedRow] = newGroupData.splice(result.source.index, 1);
        newGroupData.splice(result.destination.index, 0, movedRow);

        // Update the specific group's data
        const updatedRows = fieldsRow.map((row) =>
          row.groupName === groupName ? { ...row, data: newGroupData } : row
        );

        setFieldsRow(updatedRows);
      }
    }
  };

  const onGroupSelection = (pvgroupId, fieldId) => {
    setFieldsRow((items) => {
      return items.map((item) => {
        if (item.pvConfiguratorId === fieldId) {
          item.pvGroupId = pvgroupId;
        }
        return item;
      });
    });
  };

  const getGroups = () => {
    api
      .post("/portfolioviewconfigurator/getGroupList")
      .then((result) => {
        const data = result.data.data.sort(
          (a, b) => a.groupSequenceNo - b.groupSequenceNo
        );
        const obj = {
          pvGroupId: "null",
          groupName: "Default group",
          groupHeader: "",
          isHide: true,
          dataGroup: "",
          groupSequenceNo: 0,
        };
        const updatedData = [obj, ...data]; // Combine obj with the data array
        setRows(updatedData);
        // setRows(data)
        // dataStucturing(result.data.getGroup, result.data.fields)
        getFields(data);
      })
      .catch((error) => console.error("Error fetching entities:", error));
  };

  const getFields = (groups) => {
    api
      .post("/portfolioviewconfigurator/getFieldList", {
        pageViewType: "DetailView",
      })
      .then((result) => {
        // setRows(result.data.data)
        dataStucturing(groups || rows, result.data.data);
      })
      .catch((error) => console.error("Error fetching entities:", error));
  };

  const dataStucturing = (apiGroupData, ApiFieldsData) => {
    const groupOfCollection = apiGroupData.filter((item) => {
      return item.dataGroup;
    });
    const fields = groupOfCollection.map((item) => {
      return {
        ...item,
        fixed: true,
        data: ApiFieldsData.filter((items) => {
          return item.pvGroupId == items.pvGroupId;
        }).sort((a, b) => a.fieldSequenceNo - b.fieldSequenceNo),
      };
    });

    const data = ApiFieldsData.filter((items) =>
      groupOfCollection.every((item) => item.pvGroupId != items.pvGroupId)
    ).sort((a, b) => a.fieldSequenceNo - b.fieldSequenceNo);
    setFieldsRow([...data, ...fields]);
  };

  const getSortFields = () => {
    const newSortGroup = rows.sort((a, b) => {
      if (a.groupName < b.groupName) {
        return -1 * sortFields;
      }
      if (a.groupName > b.groupName) {
        return 1 * sortFields;
      }
      return 0;
    });

    let newSortFields = [];
    for (let i in newSortGroup) {
      const data = newSortGroup[i];
      const fieldValues = fieldsRow.filter((items) => {
        return data.pvGroupId == items.pvGroupId;
      });
      newSortFields = [...newSortFields, ...fieldValues];
    }
    const fieldValuesWithoutGroupId = fieldsRow.filter((items) => {
      return !items.pvGroupId;
    });
    newSortFields = [...newSortFields, ...fieldValuesWithoutGroupId];
    const dataGroupsfields = newSortFields.filter((items) => {
      return items.dataGroup;
    });
    const withotdataGroupsfields = newSortFields.filter((items) => {
      return !items.dataGroup;
    });

    setFieldsRow([...withotdataGroupsfields, ...dataGroupsfields]);
  };

  const displayNameChangeHadler = (type, fieldId, value, groupName) => {
    // return
    if (groupName) {
      setFieldsRow((prevRows) => {
        return prevRows.map((row) => {
          if (groupName == row.dataGroup) {
            row.data = row.data.map((items) =>
              items.pvConfiguratorId == fieldId
                ? { ...items, displayName: value }
                : items
            );
          }
          return row;
        });
      });
      return;
    }
    setFieldsRow((prevRows) => {
      return prevRows.map((row) => {
        if (fieldId == row.pvConfiguratorId) {
          row.displayName = value;
        }

        return row;
      });
    });
  };

  const handleViewChange = (entityName) => {
    setselectedViewType(entityName);
  };

  const handleAddGroup = (data, reset) => {
    if (editGroupDetails.edit) {
      api
        .post("/portfolioviewconfigurator/groupUpdate", [data])
        .then((data) => {
          getGroups();
          reset({});
          setShowCreateGroupModal(false);
          SetEditGroupDetails({ index: "", details: [], edit: false });
          setAlertOpen({ show: true, msg: data.data.message, type: "success" });
        })
        .catch((error) => {
          setAlertOpen({ show: true, msg: error.join("", ","), type: "error" });
          console.error("Error fetching entities:", error);
        });
    } else {
      if (data.groupName.trim().toLowerCase().includes("default")) {
        setAlertOpen({
          show: true,
          msg: "Can't create group as Default group",
          type: "error",
        });
      } else {
        // let filteredRows = rows.filter(row => row.pvGroupId !== "null");

        // Map the filtered rows to update groupSequenceNo
        data.groupSequenceNo = rows.length;
        api
          .post("/portfolioviewconfigurator/groupAdd", [data])
          .then((data) => {
            getGroups();
            setShowCreateGroupModal(false);
            reset({});
            SetEditGroupDetails({ index: "", details: [], edit: false });
            setAlertOpen({
              show: true,
              msg: data.data.message,
              type: "success",
            });
          })
          .catch((error) => {
            setAlertOpen({
              show: true,
              msg: error.join("", ","),
              type: "error",
            });
            console.error("Error fetching entities:", error);
          });
      }
    }
  };

  const handleEditRow = (selectedRow, index) => {
    SetEditGroupDetails({ index, details: selectedRow, edit: true });
    setShowCreateGroupModal(true);
  };

  const hideAndShowHandler = (type, fieldId, value, groupName) => {
    if (groupName) {
      setFieldsRow((prevRows) => {
        return prevRows.map((row) => {
          if (groupName == row.dataGroup) {
            row.data = row.data.map((items) =>
              items.pvConfiguratorId == fieldId
                ? { ...items, isHide: value }
                : items
            );
          }
          return row;
        });
      });
      return;
    }
    setFieldsRow((prevRows) => {
      return prevRows.map((row) => {
        if (fieldId == row.pvConfiguratorId) {
          row.isHide = value;
        }
        return row;
      });
    });
  };

  const columns = useCallback(
    (selectedRow, index, type) => {
      try {
        let baseColumns = [];
        if (type === "group" && selectedRow?.pvGroupId !== "null") {
          baseColumns = [
            {
              Header: t("groupName"),
              accessor: "groupName",

              Cell: ({ row, value }) => (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Tooltip title="Swap field">
                    <SwapVertRoundedIcon
                      fontSize="small"
                      sx={{ color: "#86949D" }}
                    />
                  </Tooltip>
                  <p>{selectedRow.groupName}</p>
                </Box>
              ),
            },
            {
              Header: t("groupNameHeader"),
              accessor: "groupHeader",
              Cell: ({ row, value }) => <p>{selectedRow.groupHeader}</p>,
            },
          ];

          // if (selectionType === 'database') {
          baseColumns.push(
            {
              Header: t("groupHide"),
              accessor: "isHide",
              Cell: ({ row, value }) => (
                <p>{selectedRow.isHide ? "Yes" : "No"}</p>
              ),
            }
            // {
            //   Header: 'Group View Type',
            //   accessor: 'groupViewType',
            //   Cell: ({ row }) => (
            //     <p>
            //       {selectedRow.groupViewType}
            //     </p>
            //   )
            // }
          );
          // }

          baseColumns.push({
            Header: t("actions"),
            Cell: ({ row }) => (
              <>
                <Tooltip title="Edit Group">
                  <IconButton disabled={row.original.isFromAPI}>
                    <EditNoteRoundedIcon
                      fontSize="small"
                      sx={{ color: "Blue" }}
                      onClick={() => handleEditRow(selectedRow, index)}
                    />
                  </IconButton>
                </Tooltip>
                {!selectedRow.dataGroup && (
                  <Tooltip title="Delete Group">
                    <IconButton disabled={row.original.isFromAPI}>
                      <DeleteRounded
                        fontSize="small"
                        sx={{ color: "#dc3545" }}
                        onClick={() => handleRemoveRow(selectedRow.pvGroupId)}
                      />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            ),
          });
        }
        if (type === "field") {
          baseColumns = [
            {
              // Header: 'Hide/Show',
              Header: t("visible"),
              accessor: "isHide",
              Cell: ({ row, value }) => (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Tooltip title="Swap row">
                    <SwapVertRoundedIcon
                      fontSize="small"
                      sx={{ color: "#86949D" }}
                    />
                  </Tooltip>
                  <p>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!selectedRow.isHide}
                          onChange={(e) => {
                            hideAndShowHandler(
                              "field",
                              selectedRow.pvConfiguratorId,
                              !e.target.checked
                            );
                          }}
                        />
                      }
                      // label={selectedRow.isHide ? 'Hide' : 'Show'}
                      label={selectedRow.isHide}
                    />
                  </p>
                  {/* <TextField
                    fullWidth
                    variant="outlined"
                    size='small'
                    value={value || ''}
                    onChange={(e) => handleSelectChange(row.index, 'entityName', e.target.value,selectedRow?.entityName,targetTable)}
                    InputProps={{
                      readOnly: row?.original?.isFromAPI,
                    }}
                  /> */}
                </Box>
              ),
            },
            {
              Header: t("fieldName"),
              accessor: "fieldName",
              Cell: ({ row, value }) => <p>{selectedRow.fieldName}</p>,
            },
          ];

          // if (selectionType === 'database') {
          baseColumns.push(
            {
              Header: t("displayName"),
              accessor: "displayName",
              Cell: ({ row, value }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={selectedRow.displayName || ""}
                  inputProps={{ maxLength: 50 }}
                  onChange={(e) =>
                    displayNameChangeHadler(
                      "field",
                      selectedRow.pvConfiguratorId,
                      e.target.value
                    )
                  }
                />
              ),
            },
            {
              // Header: 'Grouping Under',
              Header: (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span>{t("groupingUnder")}</span>
                  <SwapVertRoundedIcon
                    fontSize="small"
                    sx={{ color: "#86949D", cursor: "pointer" }}
                    onClick={() => {
                      setSortField(sortFields * -1);
                    }}
                  />
                </div>
              ),
              accessor: "pvgroupId",
              Cell: ({ row }) => (
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel id={`select-entityDatatype-label-${row.index}`}>
                    Select Group{" "}
                  </InputLabel>
                  <Select
                    sx={{ width: "100%" }}
                    labelId={`select-entityDatatype-label-${row.index}`}
                    // value={selectedRow.pvGroupId || ''}
                    value={selectedRow.pvGroupId || "null"}
                    onChange={(e) =>
                      onGroupSelection(
                        e.target.value,
                        selectedRow.pvConfiguratorId
                      )
                    }
                    label="Select Datatype"
                  >
                    {rows.map((item) => {
                      return (
                        <MenuItem
                          key={item.pvGroupId}
                          disabled={item.dataGroup ? true : false}
                          value={item.pvGroupId}
                        >
                          {item.groupName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                // <p>
                //   {selectedRow.pvgroupId}
                // </p>
              ),
            }
          );
          // }
        }
        return baseColumns;
      } catch (e) {
        console.log(e);
      }
    },
    [selectedOption, fieldsRow, sortFields]
  );

  const ColleapsRowHandler = useCallback(
    ({ row }) => {
      return (
        <>
          {/* <TableRow > */}
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
            <Collapse in={true} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1, overflow: "visible" }}>
                <Typography
                  sx={{ fontWeight: "bold" }}
                  variant="h6"
                  gutterBottom
                  component="div"
                >
                  {row.groupName}
                </Typography>
                {/* <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Visible</TableCell>
                    <TableCell>Field Name</TableCell>
                    <TableCell >Display Name</TableCell>
                    <TableCell>Grouping Under</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.data?.map((historyRow) => (
                    <TableRow key={historyRow.fieldName}>
                      <TableCell component="th" scope="row">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={!historyRow.isHide}
                              onChange={(e) => { hideAndShowHandler('field', historyRow.pvConfiguratorId, !e.target.checked, row.dataGroup) }}
                            />
                          }
                        />
                      </TableCell>
                      <TableCell>{historyRow.fieldName}</TableCell>
                      <TableCell><TextField
                        fullWidth
                        variant="outlined"
                        size='small'
                        value={historyRow.displayName || ''}
                        onChange={(e) => displayNameChangeHadler('field', historyRow.pvConfiguratorId, e.target.value, row.dataGroup)}
                        inputProps={{ maxLength: 50 }}
                      /></TableCell>
                      <TableCell>{row.groupName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> */}
                <DragDropContext
                  onDragEnd={(result) =>
                    handleDragEnd(result, "nested-field", row.groupName)
                  }
                >
                  <Droppable
                    droppableId={`droppable-${row.groupName}`}
                    type="nested"
                  >
                    {(provided) => (
                      <Table
                        size="small"
                        aria-label="purchases"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell width={100}>{t("visible")}</TableCell>
                            <TableCell width={200}>{t("fieldName")}</TableCell>
                            <TableCell width={500}>
                              {t("displayName")}
                            </TableCell>
                            <TableCell>{t("groupingUnder")}</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {row.data?.map((historyRow, index) => (
                            <Draggable
                              key={index.toString()}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <TableRow
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <TableCell component="th" scope="row">
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Tooltip title="Swap row">
                                        <SwapVertRoundedIcon
                                          fontSize="small"
                                          sx={{ color: "#86949D" }}
                                        />
                                      </Tooltip>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={!historyRow.isHide}
                                            onChange={(e) =>
                                              hideAndShowHandler(
                                                "field",
                                                historyRow.pvConfiguratorId,
                                                !e.target.checked,
                                                row.dataGroup
                                              )
                                            }
                                          />
                                        }
                                      />
                                    </Box>
                                  </TableCell>
                                  <TableCell>{historyRow.fieldName}</TableCell>
                                  <TableCell>
                                    <TextField
                                      fullWidth
                                      variant="outlined"
                                      size="small"
                                      value={historyRow.displayName || ""}
                                      onChange={(e) =>
                                        displayNameChangeHadler(
                                          "field",
                                          historyRow.pvConfiguratorId,
                                          e.target.value,
                                          row.dataGroup
                                        )
                                      }
                                      inputProps={{ maxLength: 50 }}
                                    />
                                  </TableCell>
                                  <TableCell>{row.groupName}</TableCell>
                                </TableRow>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </TableBody>
                      </Table>
                    )}
                  </Droppable>
                </DragDropContext>
              </Box>
            </Collapse>
          </TableCell>
          {/* </TableRow> */}
        </>
      );
    },
    [handleDragEnd]
  );

  const handleCloseAlert = () => {
    setAlertOpen({ show: false, msg: "" });
  };

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    getSortFields();
  }, [sortFields]);

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ justifyContent: "center", display: "felx", padding: 1 }}>
        <h2>{t("portfolioConfigurator")}</h2>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} md={1} lg={2}>
            <FormControl
              size="small"
              variant="filled"
              fullWidth
              sx={{
                "& .MuiInputBase-input": { fontSize: "10px" },
                "& .MuiInputLabel-root": { fontSize: "12px" },
              }}
            >
              <InputLabel id="select-entity-label">
                {t("selectViewType")}
              </InputLabel>
              <Select
                sx={{
                  "& .MuiSelect-select": { marginTop: "8px", padding: "0px" },
                }}
                labelId="select-View-Type"
                value={selectedViewType}
                onChange={(e) => handleViewChange(e.target.value)}
                label="Select-View-Type"
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {[
                  { value: "Detail view", name: t("detailedView") },
                  { name: t("quickView"), value: "Quick view" },
                ].map((view, index) => (
                  <MenuItem key={index} value={view.value}>
                    {view.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {selectedViewType === "Detail view" ? (
          <>
            <Grid item xs={6} lg={2}>
              <Box
                sx={{ mt: 1, display: "flex", justifyContent: "left", mb: 2 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleShowCreateModal}
                >
                  {t("addGroup")}
                </Button>
              </Box>
            </Grid>
            <Box
              sx={{
                overflowX: "auto",
                minWidth: 750,
                display: "flex",
                flexDirection: "column",
                mb: 2,
              }}
            >
              <DragDropContext
                onDragEnd={(props) => handleDragEnd(props, "group")}
              >
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <TableContainer
                      component={Paper}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <Table
                        aria-label="simple table"
                        size={"small"}
                        sx={{ minWidth: 750 }}
                      >
                        <TableHead>
                          <TableRow>
                            {columns(null, null, "group").map(
                              (column, colIndex) => (
                                <TableCell key={colIndex}>
                                  {column.Header}
                                </TableCell>
                              )
                            )}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row, rowIndex) => (
                            <>
                              <Draggable
                                key={rowIndex.toString()}
                                draggableId={rowIndex.toString()}
                                index={rowIndex}
                              >
                                {(provided) => (
                                  <TableRow
                                    key={rowIndex}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {columns(row, rowIndex, "group").map(
                                      (column, colIndex) => (
                                        <TableCell key={colIndex}>
                                          {column.Cell({
                                            row: {
                                              index: rowIndex,
                                              original: row,
                                            },
                                            value: row[column.accessor],
                                          })}
                                        </TableCell>
                                      )
                                    )}
                                  </TableRow>
                                )}
                              </Draggable>
                            </>
                          ))}
                          {provided.placeholder}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Droppable>
              </DragDropContext>
            </Box>
            <Box sx={{ mb: 2 }}>
              {/* <Button
              variant="contained"
              color="primary"
              onClick={SaveCreatedGroup}
              sx={{ mt: 2, mr: 2 }}
            >
              Save Groups
            </Button> */}
              <Button
                variant="contained"
                color="primary"
                onClick={SaveCreatedGroup}
                sx={{ mt: 2 }}
              >
                {t("updateGroupsSequence")}
              </Button>
            </Box>
            <h2>{t("fieldMapped")}</h2>

            <Box
              sx={{
                overflowX: "auto",
                minWidth: 750,
                display: "flex",
                flexDirection: "row",
                mb: 2,
                overflow: "visible",
              }}
            >
              <DragDropContext
                onDragEnd={(props) => handleDragEnd(props, "field")}
              >
                <Droppable droppableId="droppable-left">
                  {(provided) => (
                    <TableContainer
                      component={Paper}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      sx={{ flex: 1, mr: 2 }}
                    >
                      <Table
                        aria-label="left table"
                        size={"small"}
                        sx={{ minWidth: 375 }}
                      >
                        <TableHead>
                          <TableRow>
                            {columns(null, null, "field").map(
                              (column, colIndex) => (
                                <TableCell key={colIndex}>
                                  {column.Header}
                                </TableCell>
                              )
                            )}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* {fieldsRow.map((row, rowIndex) => (
                          <Draggable key={rowIndex.toString()} draggableId={rowIndex.toString()} index={rowIndex}>
                            {(provided) => (
                              <TableRow
                                key={rowIndex}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {row.fixed ?
                                  // <TableCell colSpan={4} style={{ paddingBottom: 0, paddingTop: 0 }} >
                                  <ColleapsRowHandler row={row} />
                                  //  </TableCell>
                                  : columns(row, rowIndex, 'field').map((column, colIndex) => (
                                    <TableCell key={colIndex}>
                                      {column.Cell({ row: { index: rowIndex, original: row }, value: row[column.accessor] })}
                                    </TableCell>
                                  ))}
                              </TableRow>
                            )}
                          </Draggable>
                        ))} */}
                          {fieldsRow.map((row, rowIndex) => {
                            if (row.fixed) {
                              return (
                                <TableRow key={`fixed-${rowIndex}`}>
                                  <ColleapsRowHandler row={row} />
                                </TableRow>
                              );
                            }

                            return (
                              <Draggable
                                key={rowIndex.toString()}
                                draggableId={rowIndex.toString()}
                                index={rowIndex}
                              >
                                {(provided) => (
                                  <TableRow
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    key={rowIndex}
                                  >
                                    {columns(row, rowIndex, "field").map(
                                      (column, colIndex) => (
                                        <TableCell key={colIndex}>
                                          {column.Cell({
                                            row: {
                                              index: rowIndex,
                                              original: row,
                                            },
                                            value: row[column.accessor],
                                          })}
                                        </TableCell>
                                      )
                                    )}
                                  </TableRow>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Droppable>
              </DragDropContext>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => SaveCreatedFields()}
                sx={{ mt: 2, mr: 2 }}
              >
                {t("saveConfiguration")}
              </Button>
              {/* <Button
              variant="contained"
              color="primary"
              onClick={UpdateCreatedGroup}
              sx={{ mt: 2 }}
            >
              Update Groups
            </Button> */}
            </Box>
          </>
        ) : (
          <App setAlertOpen={setAlertOpen} />
        )}
        <CreateGroupModal
          setAlertOpen={setAlertOpen}
          data={editGroupDetails.details}
          edit={editGroupDetails.edit}
          handleSave={handleAddGroup}
          showCreateGroupModal={showCreateGroupModal}
          setShowCreateGroupModal={setShowCreateGroupModal}
        />

        <CustomAlert
          open={alertOpen.show}
          onClose={handleCloseAlert}
          text={alertOpen.msg}
          icon={alertOpen.type}
          confirmButtonText="OK"
          cancelButtonText="Cancel"
          allowOutsideClick={false}
          width="40vw"
        />
      </Container>
    </ThemeProvider>
  );
}

export default PortfolioConfigForm;
