import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import ChildLevelTabs from './ChildLevelTabs';
import {
  Button,
} from "@mui/material";
import ParentChildBasicInfo from './ParentChildBasicInfo';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useModal } from '../../Common/AlertModal/ModalContext';
import api from '../../APIs/interceptor';
import "../../styles/ModelPortfolio.css"
import L3Allocation from './L3Allocation';
import AttributefilterationSection from './AttributefilterationSection';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { get } from 'lodash';

const ChildModelPortfolio = () => {
  const methods = useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get("edit");
  const getChildModelPortfolioDetails = useSelector((state) => state.getChildModelPortfolioDetails.data.data)
  const { handleSubmit, watch, getValues, reset } = methods;
  const [childConfig, setChildConfig] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [cashAllocation, setCashAllocation] = useState(100);

  const formData = watch();
  const l1Allocation = formData?.Fund?.l1AllocationChecked ? formData?.Fund?.l1Allocation : null;
  const l2Allocation = formData?.Fund?.l2AllocationChecked ? formData?.Fund?.l2Allocation : null;
  const l2AllocationChecked = formData?.Fund?.l2AllocationChecked;
  const l1AllocationChecked = formData?.Fund?.l1AllocationChecked;
  const selectedSecurities = formData?.selectedSecurities || [];

  const { showModal } = useModal();

  useEffect(() => {
    const body = {
      entityId: 4,
    };

    api.post(`/modelPortfolioConfigurator/getModelPortfolioCreationFieldConfig`, body).then((res) => {
      setChildConfig(res.data.data);
    }).catch((error) => {
      console.error("Error fetching config:", error);
    });
  }, [])


  const handleSaveSubmit = () => {
    const data = getValues()
    let payload = {
      "modelPortfolioId": data?.modelPortfolioId || 0,
      "modelName": data?.modelName,
      "modelType": 2,
      "effectiveDate": data.effectiveDate,
      "allocation": [],
      "udfFieldValues": {
      }
    };
    if (data.Fund.l1AllocationChecked) {
      const l1Data = data.Fund.l1Allocation
      payload.allocation.push({
        "modelPortfolioDetailId": l1Data.modelPortfolioDetailId || 0,
        "modelPortfolioId": l1Data.modelPortfolioId || 0,
        "modelPortfolioProductClassId": l1Data.modelPortfolioProductClassId,
        "allocationLevel": 1,
        "modelPortfolioGroupId": 0,
        "mpGroupAttributeDetailId": 0,
        "dropdownOptionId": 0,
        "attributeRangeFrom": 0,
        "attributeRangeTo": 0,
        "weightageType": l1Data.weightageType,
        "allocationPer": l1Data.allocationPer,
        "tolerancePer": l1Data.tolerancePer,
        "securityLevelAllocation":
          data.Fund.l2AllocationChecked ? [] : data.fundData[0].securities.map((items) => ({
            "modelPortfoliosSecurityId": items.modelPortfoliosSecurityId || 0,
            "modelPortfolioDetailId": items.modelPortfolioDetailId || 0,
            "weightageType": 0,
            "securityCode": items.SchemeCode,
            "securityName": items.SchemeName,
            "allocationPer": items.L3Allocation,
            "tolerancePer": items.Tolerance
          }))
        ,
        // ...l1Data,
        "allocatiooLevel": 1
      })
    }
    if (data.Fund.l2AllocationChecked) {
      const l1Data = data.Fund.l2Allocation

      const l2Data = l1Data.rows.map((items) => ({
        "modelPortfolioDetailId": items.modelPortfolioDetailId || 0,
        "modelPortfolioId": items.modelPortfolioId || 0,
        "modelPortfolioProductClassId": l1Data.productClassId,
        "allocationLevel": 2,
        "modelPortfolioGroupId": l1Data.groupId,
        "mpGroupAttributeDetailId": l1Data.mpGroupAttributeDetailId,
        "dropdownOptionId": 0,
        "attributeRangeFrom": items.firstValue,
        "attributeRangeTo": items.secondValue,
        "weightageType": l1Data.weightageType,
        "allocationPer": items.l2Allocation,
        "tolerancePer": items.tolerance,
        "securityLevelAllocation":
          data.fundData[0].attributes.find((row) => row.id === items.id).securities.map((item) => ({
            "modelPortfoliosSecurityId": item.modelPortfoliosSecurityId || 0,
            "modelPortfolioDetailId": item.modelPortfolioDetailId || 0,
            "weightageType": 0,
            "securityCode": item.SchemeCode,
            "securityName": item.SchemeName,
            "allocationPer": item.L3Allocation,
            "tolerancePer": item.Tolerance
          }))
        ,
        "allocatiooLevel": 2
      }))
      payload.allocation = [...payload.allocation, ...l2Data]
    }

    if (!data.Fund.l2AllocationChecked && !data.Fund.l1AllocationChecked) {
      payload.allocation.push({
        "modelPortfolioDetailId": 0,
        "modelPortfolioId": 0,
        "allocationLevel": 0,
        "modelPortfolioProductClassId": 2,         //modelPortfolioProductClassId:fund is 2
        "modelPortfolioGroupId": 0,
        "mpGroupAttributeDetailId": 0,
        "dropdownOptionId": 0,
        "attributeRangeFrom": 0,
        "attributeRangeTo": 0,
        "weightageType": 0,
        "allocationPer": 0,
        "tolerancePer": 0,
        "securityLevelAllocation":
          data.fundData[0].securities.map((items) => ({
            "modelPortfoliosSecurityId": items.modelPortfoliosSecurityId || 0,
            "modelPortfolioDetailId": items.modelPortfolioDetailId || 0,
            "weightageType": 0,                       //weightageType is not coming--- items.weightageType
            "securityCode": items.SchemeCode,
            "securityName": items.SchemeName,
            "allocationPer": items.L3Allocation,
            "tolerancePer": items.Tolerance
          })),
      })
    }

    const copyObject = { ...data }
    for (const key in tableData) {
      const rows = tableData[key];
      if (rows) {
        const tableDetailsValue = rows.map((row) => {
          const tableDetails = {}
          for (const dataKey in data) {
            if (dataKey.includes(row.rowId)) {
              delete copyObject[dataKey]
              const newKey = dataKey.replace(`_${row.rowId}`, '')
              tableDetails[newKey] = data?.[dataKey]
            }
          }
          return tableDetails
        })
        payload.udfFieldValues.dynamicTables[key] = tableDetailsValue
      }
    }

    for (const key in childConfig?.udfConfig?.formElementsConfig) {
      const field = childConfig?.udfConfig.formElementsConfig[key]
      if (field.component !== 'dynamicTable') {
        if (field.component == 'multipleSelect') {
          payload.udfFieldValues[field.dispatchername] = data[field.dispatchername]?.join(',')
        } else {
          payload.udfFieldValues[field.dispatchername] = data[field.dispatchername]
        }
      }
    }
    api.post(`/ModelPortfolio/${isEdit ? 'updateChildModelPortfolioDetail' : 'saveChildModelPortfolioDetail'}`, payload).then(res => {
      showModal({
        show: true, text: res.data.message, type: "success", onConfirmButton: () => {
          showModal({ show: false })
          navigate("/modelPortfolio")
        }
      });
    }).catch(err => {
      showModal({ show: true, text: err, type: "error", icon: "error" });
    })
  }


  const checkFinalValidation = () => {
    let errors = [];

    const checkSecurities = (securities, fund, attr) => {
      return securities.every((sec) => {
        if (!sec.L3Allocation && sec.L3Allocation !== 0) {
          let errorMsg = `L3Allocation is missing for Security ${sec.SchemeName} at Product Class ${fund?.fundName}`;
          if (attr !== undefined) {
            errorMsg += `, Attribute ${attr?.description}`;
          }
          errors.push(errorMsg);
          return false;
        }
        return true;
      });
    };

    let totalSecurityAllocation = 0;

    if (!l1AllocationChecked && !l2AllocationChecked) {
      if (!formData.fundData.every((fund) => checkSecurities(fund.securities, fund))) {
        return errors; // Return errors array
      }

      totalSecurityAllocation = formData.fundData.reduce(
        (sum, fund) => sum + fund.securities.reduce((secSum, sec) => secSum + (Number(sec.L3Allocation) || 0), 0),
        0
      );

      let total = totalSecurityAllocation + cashAllocation;
      if (Math.round(total) !== 100) {
        errors.push(`Total securities + cash allocation must be 100%, but got ${total}%`);
      }
    }

    else if (l1AllocationChecked && !l2AllocationChecked) {

      if (!formData.fundData.every((fund) => {
        if (fund.securities.length > 0) {
          let totalFundAllocation = fund.securities.reduce((sum, sec) => sum + (Number(sec.L3Allocation) || 0), 0);
          if (Math.round(totalFundAllocation) !== Math.round(fund.allocationPer)) {
            errors.push(`Total securities allocation in Product Class ${fund?.fundName} should be ${fund.allocationPer}%, but got ${totalFundAllocation}%`);
            return false;
          }
          return checkSecurities(fund.securities, fund);
        }
        return true;
      })) {
        return errors;
      }

      totalSecurityAllocation = formData.fundData.reduce(
        (sum, fund) => sum + fund.securities.reduce((secSum, sec) => secSum + (Number(sec.L3Allocation) || 0), 0),
        0
      );

      let total = totalSecurityAllocation + cashAllocation;
      if (Math.round(total) !== 100) {
        errors.push(`Total securities + cash allocation must be 100%, but got ${total}%`);
      }
    }
    else if (l2AllocationChecked) {
      if (!formData.fundData.every((fund) =>
        fund.attributes?.every((attr) => {
          let totalAttrAllocation = attr.securities.reduce((sum, sec) => sum + (Number(sec.L3Allocation) || 0), 0);
          if (Math.round(totalAttrAllocation) !== Math.round(attr.allocationPer)) {
            errors.push(`Total securities allocation in Product Class ${fund?.fundName}, Attribute ${attr?.description} should be ${attr.allocationPer}%, but got ${totalAttrAllocation}%`);
            return false;
          }
          return checkSecurities(attr.securities, fund, attr);
        })
      )) {
        return errors;
      }

      totalSecurityAllocation = formData.fundData.reduce(
        (sum, fund) => sum + fund.attributes?.reduce(
          (attrSum, attr) => attrSum + attr.securities.reduce((secSum, sec) => secSum + (Number(sec.L3Allocation) || 0), 0),
          0
        ) || 0,
        0
      );

      let total = totalSecurityAllocation + cashAllocation;
      if (Math.round(total) !== 100) {
        errors.push(`Total securities + cash allocation must be 100%, but got ${total}%`);
      }
    }

    return errors.length > 0 ? errors : []; // Return errors if any, otherwise an empty array
  };

  const handleSaveClick = () => {
    const errors = checkFinalValidation();
    if (errors.length > 0) {
      // alert(errors.join("\n")); // Display errors to the user
      showModal({ show: true, text: errors.join("\n"), type: "error", icon: "error" });
      return;
    }

    handleSaveSubmit(); // No errors, proceed with save
  };

  const getFundData = (securities) => {
    return childConfig?.childModelConfig?.productClassConfig
      ?.filter((fund) => fund.productClass !== "Cash")
      .map((fund) => {
        const fundName = fund.productClass;

        if (!l2Allocation) {
          // If l2Allocation is not available, bind selectedSecurities directly to the fund
          return {
            fundName,
            ...l1Allocation,
            securities: selectedSecurities.map((security) => security),
          };
        }

        return {
          fundName,
          ...l1Allocation,
          attributes: l2Allocation.rows.map((row, index) => {
            const firstValue = row.firstValue;
            const secondValue = row.secondValue;
            const percentage = row.l2Allocation || 0;

            return {
              name: l2Allocation.selectedAttribute?.displayName,
              description: `From ${firstValue} Cr to ${secondValue} Cr (${percentage}%)`,
              allocationPer: percentage,
              id: index,
              securities: isEdit ? securities : securities
                .filter(
                  (security) =>
                    Number(security?.fundInfo?.[l2Allocation.dispatcherName]) <= Number(firstValue) &&
                    Number(security?.fundInfo?.[l2Allocation.dispatcherName]) >= Number(secondValue)
                )
                .map((security) => security),
            };
          }),
        };
      });
  }

  function reversePayload(payload) {
    let data = {
      modelPortfolioId: payload.modelPortfolioID,
      modelName: payload.modelName,
      effectiveDate: payload.effectiveDate,
      ...payload.udfFieldValues,
      Fund: {
        l1AllocationChecked: false,
        l2AllocationChecked: false,
        l1Allocation: {},
        l2Allocation: { rows: [] }
      },
      fundData: [{ fundName: 'fund', securities: [], attributes: [] }],
      selectedSecurities: []
    };

    if (payload.allocation.length > 0) {
      payload.allocation.forEach((alloc) => {
        if (alloc.allocationLevel === 1) {
          data.Fund.l1AllocationChecked = true;
          data.Fund.l1Allocation = {
            modelPortfolioProductClassId: alloc.modelPortfolioProductClassId,
            weightageType: alloc.weightageType,
            allocationPer: alloc.allocationPer,
            tolerancePer: alloc.tolerancePer,
            "modelPortfolioDetailId": alloc.modelPortfolioDetailId,
            "modelPortfolioId": alloc.modelPortfolioID,
          };
          if (alloc.securityLevelAllocation) {
            data.fundData[0].securities = alloc.securityLevelAllocation.map(sec => ({
              SchemeCode: sec.securityCode,
              SchemeName: sec.securityName,
              L3Allocation: sec.allocationPer,
              Tolerance: sec.tolerancePer
            }))
            data.selectedSecurities = data.fundData[0].securities
          }
        } else if (alloc.allocationLevel === 2) {
          data.Fund.l2AllocationChecked = true;
          data.Fund.l2Allocation.productClassId = alloc.modelPortfolioProductClassId;
          data.Fund.l2Allocation.mpGroupAttributeDetailId = alloc.mpGroupAttributeDetailId;
          data.Fund.l2Allocation.weightageType = alloc.weightageType;
          data.Fund.l2Allocation.groupId = alloc.modelPortfolioGroupId;

          let attribute = {
            "modelPortfolioDetailId": alloc.modelPortfolioDetailId,
            "modelPortfolioId": alloc.modelPortfolioID,
            id: alloc.mpGroupAttributeDetailId,
            productClassId: alloc.modelPortfolioGroupId,
            mpGroupAttributeDetailId: alloc.mpGroupAttributeDetailId,
            weightageType: alloc.weightageType,
            firstValue: alloc.attributeRangeFrom,
            secondValue: alloc.attributeRangeTo,
            l2Allocation: alloc.allocationPer,
            tolerance: alloc.tolerancePer,
            description: `From ${alloc.attributeRangeFrom} Cr to ${alloc.attributeRangeTo} Cr (${alloc.allocationPer}%)`,
            allocationPer: alloc.allocationPer,
            securities: alloc.securityLevelAllocation ? alloc.securityLevelAllocation.map(sec => ({
              SchemeCode: sec.securityCode,
              SchemeName: sec.securityName,
              L3Allocation: sec.allocationPer,
              Tolerance: sec.tolerancePer,
              "modelPortfolioDetailId": sec.modelPortfolioDetailId,
              "modelPortfoliosSecurityId": sec.modelPortfoliosSecurityId,
            })) : []
          };
          data.selectedSecurities = [...data.selectedSecurities, ...alloc.securityLevelAllocation.map(sec => ({
            SchemeCode: sec.securityCode,
            SchemeName: sec.securityName,
            L3Allocation: sec.allocationPer,
            Tolerance: sec.tolerancePer,
            "modelPortfolioDetailId": sec.modelPortfolioDetailId,
            "modelPortfoliosSecurityId": sec.modelPortfoliosSecurityId,
          }))]

          data.Fund.l2Allocation.rows.push(attribute);
          data.fundData[0].attributes.push(attribute);
        } else if (alloc.allocationLevel === 0) {
          data.fundData[0].securities = alloc.securityLevelAllocation.map(sec => ({
            SchemeCode: sec.securityCode,
            SchemeName: sec.securityName,
            L3Allocation: sec.allocationPer,
            Tolerance: sec.tolerancePer,
            "modelPortfolioDetailId": sec.modelPortfolioDetailId,
            "modelPortfoliosSecurityId": sec.modelPortfoliosSecurityId,
          }));
          data.selectedSecurities = [...data.selectedSecurities, ...alloc.securityLevelAllocation.map(sec => ({
            SchemeCode: sec.securityCode,
            SchemeName: sec.securityName,
            L3Allocation: sec.allocationPer,
            Tolerance: sec.tolerancePer,
            "modelPortfolioDetailId": sec.modelPortfolioDetailId,
            "modelPortfoliosSecurityId": sec.modelPortfoliosSecurityId,
          }))]
        }
      });
    }

    return data;
  }

  useEffect(() => {
    if (getChildModelPortfolioDetails?.allocation?.length > 0 && isEdit) {
      const data = reversePayload(getChildModelPortfolioDetails)
      reset(data)
    }
  }, [getChildModelPortfolioDetails, isEdit])

  return (
    <>
      <div className="newspacesinblock1">
        <div className='uppersearport '>
          <div className='herar'>
          </div>
          <div className='width50'>Create New Child Model</div>
        </div>
        <FormProvider {...methods}>
          <Box sx={{ flexGrow: 1 }}>
            <ParentChildBasicInfo config={childConfig} tableData={tableData} setTableData={setTableData} isChild />
            <Grid container spacing={2} className="pergapstpnabove">
              <ChildLevelTabs config={childConfig} />
            </Grid>
            <Grid container spacing={2} className="pergapstpnabove">
              <AttributefilterationSection getFundData={getFundData} tab={childConfig?.childModelConfig?.productClassConfig} />
            </Grid>
            {
              formData?.selectedSecurities?.length > 0 && (
                <>
                  <Grid container spacing={2} className="pergapstpnabove">
                    <L3Allocation tab={childConfig?.childModelConfig?.productClassConfig} cashAllocation={cashAllocation} setCashAllocation={setCashAllocation} />
                  </Grid>
                  <div className="fullw texcenter smallspaces ">
                    <Button variant="contained" className="Generatebtn" onClick={handleSaveClick}>
                      {isEdit ? "Update" : "Save"}
                    </Button>
                  </div>
                </>
              )
            }
          </Box>
        </FormProvider>
      </div>
    </>
  );
};

export default ChildModelPortfolio;