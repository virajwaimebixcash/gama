import React, { useState, useEffect } from "react";
import PaginationComponent from '../../Common/CustomComponents/Pagination';
import UpperboxinRebalanceDetail from './UpperboxinRebalanceDetail';
import "../../styles/PortfolioRebalance.css"
import { useModal } from "../../Common/AlertModal/ModalContext";
import api from "../../APIs/interceptor";
import FilterComponent from "../../Common/CustomComponents/FilterComponent"
import { useLocation } from 'react-router-dom';
import { defaultPageSize } from "../../utils/commonFunction";

const RebalancingDetail = () => {
  const location = useLocation();
  const [config, setConfig] = useState([]);
  const { showModal } = useModal()
  const [filterValues, setFilterValues] = useState({});
  const [detailPageData, setDetailPageData] = useState();
  const [sortingState, setSortingState] = useState();
  const [paginationState, setPaginationState] = useState({ pageNum: 1, pageSize: defaultPageSize });
  const [totalRecords, setTotalRecords] = useState();


  // const { selectedRow, rebalancingUpperData } = location.state || {};
  const selectedSummaryPageRowData = location.state?.selectedRow;
  const selectedModelData = location.state?.rebalancingUpperData?.displayedValues;




const displayValue =
selectedModelData?.viewType === "1"
    ? selectedSummaryPageRowData?.securityName
    : selectedModelData?.viewType === "2"
    ? selectedSummaryPageRowData?.portfolioAccName
    : "No data available";

  const fetchDetailPageConfig = () => {
    const payload = {
      "viewType": 0
    }
    api.post('/PortfolioRebalancingConfigurator/getDetailPageHeaderAndGridConfiguredField', payload).then((response) => {
      setConfig(response.data.data);
    });
  }


  const getDetailPageData = () => {
    api.post('PortfolioRebalancing/getGeneratedDetailDeviationByModel', {
      "userId": 2,
      "clientCode": 35,
      "modelPortfolioID": selectedModelData.modelPortfolioId || 1,
      "productClassId": 1,
      // "viewType": 2,
      "viewType": selectedModelData?.viewType,
      "Sorting": {
        ...sortingState
      },
      ...paginationState,
      ...filterValues

    }).then((response) => {
      setTotalRecords(response.data.data.totalRecords);
      setDetailPageData(response.data.data.records)
    })
  }


  const handlePagination = (pageNum, pageSize) => {
    setPaginationState({ pageNum, pageSize });
  }

  useEffect(() => {
    getDetailPageData()
  }, [sortingState, paginationState]);


  useEffect(() => {
    fetchDetailPageConfig();
    // getDetailPageData();
  }, []);

  return (
    <>
      <div className="newspacesinblock1">
        <div className='uppersearport '>
          <div className='herar'>
          </div>
          <div className='leftfloats'>
            <table>
              <tr>
                <td className="fundnamecss">{displayValue} </td>
                <td className="valigbottom">
                  <span className="fon13nrllatest spacebetw ">
                    {config.headerField?.find((items) => items.dispatcherName === "deviationGenerationDate")?.displayName}
                  </span>
                </td>
                <td className="valigbottom">
                  <span className="fullblcspan spacebetw font500">
                    {new Date(selectedModelData?.effectiveDate).toISOString().split('T')[0]}
                  </span>
                </td>
                <td className="valigbottom">
                  <span className="fon13nrllatest spacebetw ">
                    {config.headerField?.find((items) => items.dispatcherName === "modelName")?.displayName}
                  </span>
                </td>
                <td className="valigbottom">
                  <span className="fullblcspan spacebetw font500">{selectedModelData?.modelName}</span>
                  <span className="rebalorange">{selectedModelData?.modelType}</span>
                </td>

              </tr>
            </table>
          </div>
          <div className="rightfloats">
            <div className="rightfloats">
              <table className="excelfiltertab">
                <tr >
                  <td>
                    <FilterComponent
                      requireExcel={true}
                      requireFilter={true}
                      tableConfig={config?.gridColumnFields}
                      filterValues={filterValues}
                      setFilterValues={setFilterValues}
                      getData={getDetailPageData}
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <UpperboxinRebalanceDetail
          config={config}
          gridData={detailPageData}
          selectedModelData={selectedModelData}
          sortingState={sortingState}
          setSortingState={setSortingState}
        />
        <div className="pagin">
          <PaginationComponent
            totalData={totalRecords}
            handlePagination={handlePagination}
            defaultPageSize={defaultPageSize}
          />
        </div>
      </div>
    </>
  );
};

export default RebalancingDetail;
