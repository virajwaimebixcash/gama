import Renderer from "./Render";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { memo, useMemo, useState } from "react";
import { Button, Box } from '@mui/material';
import Grid from "@mui/material/Grid2";
import { useFormContext } from 'react-hook-form';
import ConfirmationDialog from "./ConfirmationDialog";
import DataGridComponent from "./DataGridComponent";

const customItemStyle = {
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
  border: '1px solid #ddd'
};

const customTitleStyle = {
  color: '#1976d2',
};

const customValueStyle = {
  color: '#f50057',
};
const CreateDynamic = ({ udfConfig, setTableData, tableData, isRowLayout = true }) => {
  const [userData, setUserData] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState('');

  const { id: paramEntityName, type: userId } = useParams();

  const { pathname } = useLocation()

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const udfParam = searchParams.get('udf');

  const entityName = useMemo(() => {
    if (udfParam) return udfParam;
    return paramEntityName; // Fallback to paramEntityName if no match
  }, [udfParam, paramEntityName]);

  const methods = useFormContext();
  const { watch } = methods;  

  const renderedComponents = () => udfConfig?.formElementsConfig?.map((config, index) => {
    if (config.component === 'dynamicTable') {
      return (
        <Grid key={index} size={{ xs: 12 }} sx={{ mt: 2, mb: 2 }}>
          <Renderer
            config={config}
            index={index}
            entityName={entityName}
            tableData={tableData}
            setTableData={setTableData}
            // dropdownData={dropdownData}
            // setDropdownData={setDropdownData}
            disabledform={config.isReadOnly ? true : false}
            userData={userData}
            isTable={true}
            watch={watch}
          />
        </Grid>
      )
    }
    else if (config.component === 'hidden') {
      // If the component is of type "hidden", don't render anything
      return (
        <Grid
          // item
          key={index}
        >
          <Renderer
            config={config}
            index={index}
            entityName={entityName}
            // dropdownData={dropdownData}
            // setDropdownData={setDropdownData}
            disabledform={config.isReadOnly ? true : false}
            userData={userData}
            isTable={false}
            watch={watch}
          />
        </Grid>
      )
    }
    else {
      return (
        <Grid
          key={index}
          size={{
            xs: 12,
            sm: 6,
            // md: 12 / udfConfig.columnConfig,
            // lg: 12 / udfConfig.columnConfig,
            md: isRowLayout ? 12 / udfConfig.columnConfig : 12,
            lg: isRowLayout ? 12 / udfConfig.columnConfig : 12,
            // mt: 2
          }}
        >
          <Renderer
            config={config}
            index={index}
            entityName={entityName}
            // dropdownData={dropdownData}
            // setDropdownData={setDropdownData}
            disabledform={config.isReadOnly ? true : false}
            userData={userData}
            isTable={false}
            watch={watch}
          />
        </Grid>
      )
    }
  });

  function combineData(userData) {
    let combinedObjectData = {};
    let arraydata = {}

    function traverse(obj) {

      for (const key in obj) {
        if (Array.isArray(obj[key])) {
          arraydata[key] = obj[key];
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          traverse(obj[key]);
        } else {

          if (obj[key] !== null && !key.includes('id')) combinedObjectData[key] = obj[key];
        }
      }
    }
    traverse(userData);
    return { ...combinedObjectData, ...arraydata };
  }

  const dataformatting = useMemo(() => {
    if (userData && udfConfig) {
      const user = combineData(userData)
      return Object.keys(user).map((config) => {
        return ({
          title: config,
          value: user?.[config]
        })

      })

    }
    return []
  }, [userData, udfConfig])

  return (
    <Box sx={{ justifyContent: 'center', position: 'relative' }}>

      {pathname.includes('view') ?
        <>
          <DataGridComponent
            columns={3}
            itemStyle={customItemStyle}
            titleStyle={customTitleStyle}
            valueStyle={customValueStyle}
            // multilanguage={t}
            userData={dataformatting}
          />
          <Button variant="contained" sx={{ marginLeft: 2 }} color="primary" onClick={() => navigate(-1)}> Back</Button></>
        :
        <>
          {udfConfig ?
            <Box onSubmit={e => e.preventDefault()} noValidate>
              <Grid container spacing={2}>
                {renderedComponents()}
              </Grid>
            </Box> : null}
        </>
      }
      <ConfirmationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        actionType={actionType}
      />
    </Box>
  );
};


export default memo(CreateDynamic);