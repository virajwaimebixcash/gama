import React, { useState, useEffect } from "react";
// import Filter from './Filter';
import PaginationComponent from '../../Common/CustomComponents/Pagination';
import ExcelTooltip from '../../Common/ExcelTooltip';
import UpperboxinRebalanceDetail from './UpperboxinRebalanceDetail';
import "../../styles/PortfolioRebalance.css"
import { useModal } from "../../Common/AlertModal/ModalContext";
import api from "../../APIs/interceptor";
import FilterComponent from "../../Common/CustomComponents/FilterComponent"
import { useLocation } from 'react-router-dom';
import { set } from "lodash";

const RebalancingDetail = () => {
  const location = useLocation();
  const [config, setConfig] = useState([]);
  const { showModal } = useModal()
  const [filterValues, setFilterValues] = useState({});
  const [detailPageData , setDetailPageData] =useState();

  // const { selectedRow, rebalancingUpperData } = location.state || {};
  const selectedSummaryPageRowData = location.state?.selectedRow;
  const selectedModelData = location.state?.rebalancingUpperData?.displayedValues;
  console.log(">>>>>>>>>:", selectedSummaryPageRowData);
  console.log("selectedModelData:", selectedModelData);
 
 
  const fetchDetailPageConfig = () => {
    const payload = {
      "viewType": 0
    }
    api.post('/PortfolioRebalancingConfigurator/getDetailPageHeaderAndGridConfiguredField', payload).then((response) => {
      setConfig(response.data.data);
    });
  }

  
  const getDetailPageData = () => {
    api.post('PortfolioRebalancingConfigurator/getGeneratedDeviationByModelStub', {
      "userId": 2,
      "clientCode": 35,
      "modelPortfolioID": 1,
      "productClassId": 1,
      "viewType": 1,
      "Sorting": {},
      "pageNum": 1,
      "pageSize": 10

    }).then((response) => {
      // console.log(response.data.data,"response");
      
      setDetailPageData(response.data.data)
    })
  }
  
  
  useEffect(() => {
    fetchDetailPageConfig();
    getDetailPageData();
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
                <td className="fundnamecss">{selectedSummaryPageRowData?.securityName} </td>
                <td className="valigbottom"><span class="fon13nrllatest spacebetw ">
                  {config.headerField?.find((items) => items.dispatcherName === "deviationGenerationDate")?.displayName}
                </span></td>
                <td className="valigbottom"><span class="fullblcspan spacebetw font500">
                {new Date(selectedModelData?.effectiveDate).toISOString().split('T')[0]}
                  </span></td>
                <td className="valigbottom"><span class="fon13nrllatest spacebetw ">
                  {config.headerField?.find((items) => items.dispatcherName === "modelName")?.displayName}
                </span></td>
                <td className="valigbottom"><span class="fullblcspan spacebetw font500">{selectedModelData?.modelName}</span>
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
                    // getData={getData}
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <UpperboxinRebalanceDetail config={config} gridData={detailPageData} selectedModelData={selectedModelData} />
        <div className="pagin">
          <PaginationComponent></PaginationComponent>
        </div>
      </div></>
  );
};

export default RebalancingDetail;
