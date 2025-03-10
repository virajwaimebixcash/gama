import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import ModelPortfolioParentTab from './ModelPortfolioParentTab';
import { Button } from "@mui/material";
import api from '../../APIs/interceptor';
import { FormProvider, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useModal } from '../../Common/AlertModal/ModalContext';
import ParentChildBasicInfo from './ParentChildBasicInfo';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Function to transform the object
const transformData = (data) => {
  const { udfFieldValues = {}, ...rest } = data;

  return Object.fromEntries(
    Object.entries({ ...rest, ...udfFieldValues })
  );
};

const ParentModelPortfolio = () => {
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get("edit");

  const getParentModelPortfolioDetail = useSelector((state) => state.getParentModelPortfolioDetails.data.data)

  const methods = useForm({
    defaultValues: {
      childMapping: [{ modelPortfolioDetailId: 0, childModelPortfolioId: "0", allocationPer: "", tolerancePer: "" }],
      totalAllocation: "100%",
      weightType: "Custom",
    }
  });
  const { handleSubmit, reset } = methods;
  const [parentData, setParentData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const { showModal } = useModal();

  useEffect(() => {
    const body = {
      entityId: 4,
    };

    api.post(`/modelPortfolioConfigurator/getModelPortfolioCreationFieldConfig`, body).then((res) => {
      setParentData(res.data.data);
    }).catch((error) => {
      console.error("Error fetching config:", error);
    });
  }, [])

  const handleSaveSubmit = (data) => {
    let payload;

    payload = {
      "modelPortfolioId": data.modelPortfolioId,
      "modelName": data?.modelName,
      "modelType": 1, //1 for parent 2 for child
      "effectiveDate": dayjs(data?.effectiveDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      "weightageType": data?.weightageType === "Custom" ? 2 : 1, // 2 for custom 1 for equal
      "childMapping": data?.childMapping,
      "udfFieldValues": { dynamicTables: {} }
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

    for (const key in parentData?.udfConfig?.formElementsConfig) {
      const field = parentData?.udfConfig.formElementsConfig[key]
      if (field.component !== 'dynamicTable') {
        if (field.component == 'multipleSelect') {
          payload.udfFieldValues[field.dispatchername] = data[field.dispatchername]?.join(',')
        } else {
          payload.udfFieldValues[field.dispatchername] = data[field.dispatchername]
        }
      }
    }

    if(isEdit){
      api.post('/ModelPortfolio/updateParentModelPortfolioDetail', payload).then(res => {
        showModal({ show: true, text: res.data.message, type: "success" });
      }).catch(err => {
        showModal({ show: true, text: err, type: "error", icon: "error" });
      })
    }
    else{
      api.post('/ModelPortfolio/saveParentModelPortfolioDetail', payload).then(res => {
        showModal({ show: true, text: res.data.message, type: "success" });
      }).catch(err => {
        showModal({ show: true, text: err, type: "error", icon: "error" });
      })
    }
  }

  useEffect(() => {
    if (isEdit) {
      reset(transformData(getParentModelPortfolioDetail));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <FormProvider {...methods}>
      <div className="newspacesinblock1">
        <div className='uppersearport '>
          <div className='herar'>
          </div>
          <div className='width50'>Parent Model</div>
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <ParentChildBasicInfo config={parentData} tableData={tableData} setTableData={setTableData} />
          <Grid container spacing={2} className="">
            <ModelPortfolioParentTab />
          </Grid>
          <div className="fullw texcenter smallspaces">
            <Button variant="contained" className="Generatebtn nexprebutton" onClick={handleSubmit(handleSaveSubmit)}>
              {isEdit ? 'Update' : 'Save'}
            </Button>
          </div>
        </Box>
      </div>
    </FormProvider>
  );
};

export default ParentModelPortfolio;
