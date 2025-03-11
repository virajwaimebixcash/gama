import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import Sorting from './Sorting';
import excla from "../../images/excla.png";
import Delete1 from "../../images/delete.png";
import FilterComponent from '../../Common/CustomComponents/FilterComponent';
import SelectModelType from './SelectModelType';
import api from '../../APIs/interceptor';
import { useDispatch } from "react-redux";
import { actionCreators } from "../../redux/actions/actionCreators";
import { useNavigate } from "react-router-dom";
import { useModal } from '../../Common/AlertModal/ModalContext';
import "../../styles/ModelPortfolio.css"

const ModelPortfolio = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showModal } = useModal()
  const [config, setConfig] = useState([]);
  const [listingData, setListingData] = useState([]);
  const [filterValues, setFilterValues] = useState({});
  // ---------------------------use effect for Model Portfolio Config------------
  useEffect(() => {
    // Simulating API fetch
    const fetchConfig = () => {
      api.post('/modelPortfolioConfigurator/getModelPortfolioListingConfiguredField').then((response) => {
        setConfig(response.data.data);
      });
    }

    fetchConfig();
    fetchListingData();
  }, []);

  const fetchListingData = () => {
    api.post('/ModelPortfolio/getAllModelPortfolioList', {
      "modelType": 0,
      ...filterValues
    }).then((response) => {
      setListingData(response.data.data.records);
    });
  }    

  const handleEdit = (rowId, modelType) => {
    const body = {
      "modelPortfolioId": rowId
    }


    if (modelType === 'Parent') {
      dispatch(actionCreators.GetParentModelPortfolioDetail(body)).then(() => {
        navigate("/parent-model-portfolio?edit=true");
      })
    }
    else if (modelType === 'Child') {
      dispatch(actionCreators.GetChildModelPortfolioDetail(body)).then(() => {
        navigate("/child-model-portfolio?edit=true");
      })
    }

  }

  const handleDelete = (rowId) => {
    showModal({
      show: true,
      icon: "error",
      text: "Are you sure you want to delete this Model Portfolio?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      onConfirmButton: () => {
        api.post('/ModelPortfolio/deleteModelPortfolio', { modelPortfolioId: rowId })
          .then((res) => {
            if (res.status === 200) {
              showModal({ show: true, text: res.data.message, icon: "success" });
              setListingData((prevData) => prevData.filter(item => item.modelPortfolioId !== rowId));
            }
          })
          .catch((error) => showModal({ show: true, text: error, icon: "error" }));
      }
    });
  };

  return (
    <div>
      <div className="newspacesinblock1">
        <div className='uppersearport'>
          <div className='herar'>
          </div>
          <div className='width50'>Model Portfolio</div>
          <div className="rightfloats">
            <div className="rightfloats">
              <FilterComponent
                tableConfig={config}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
                getData={fetchListingData}
                requireFilter={true}
              />
            </div>
            <div className="rightfloats">
              <SelectModelType />
            </div>
          </div>
        </div>
        <TableContainer component={Paper} className="" >
          <Table sx={{ padding: 2 }} className="basefortabels">
            {/* --------------Table Headers--------------------- */}
            <TableHead >
              <TableRow className="tabheadsinall">
                {config.map((col, index) => (
                  <TableCell key={`${col.mpListingConfigId}_${index}`}>
                    <div className='fon13nrl lefttxt'>
                      <span className='pullleft'>
                        {col.displayHeader}
                      </span>
                      {col.isSortingEnable === "Y" && (
                        <span className='pullleft sorticon newposicon'>
                          <Sorting />
                        </span>
                      )}
                    </div>
                  </TableCell>
                ))}
                <TableCell>Modify</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            {/* ----------------------Row Data------------------------- */}
            <TableBody>
              {listingData.map((row, index) => (
                <TableRow key={`${row.modelPortfolioId}_${index}`}>
                  {config.map((col) => (
                    <TableCell key={`${col.mpListingConfigId}_${index}`}>
                      {col.fieldName === "modelType" ? (
                        <>
                          <div className={row[col.fieldName] === "Child" ? "childcss" : "parentcss"}>
                            {row[col.fieldName]}
                          </div>
                          {row[col.fieldName] === "Child" && <img className="exclaimgcss" src={excla} alt="Warning" />}
                        </>
                      ) : (
                        row[col.fieldName] ?? "N/A" /* Default to "N/A" if value is missing */
                      )}
                    </TableCell>
                  ))}
                  <TableCell><Button className="clitoedit" onClick={() => handleEdit(row.modelPortfolioId, row.modelType)}>Edit</Button></TableCell>
                  <TableCell><img className="curspoint" src={Delete1} alt="Delete" onClick={() => handleDelete(row.modelPortfolioId)} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      </div>
  );
};

export default ModelPortfolio;
