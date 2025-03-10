import FixedFieldParentModel from './FixedFieldParentModel';
import CreateDynamic from '../../Common/UdfRenderer/CreateDynamic';
import Grid from '@mui/material/Grid2';
import FixedFieldChildModel from './FixedFieldChildModel';

const ParentChildBasicInfo = ({ config, tableData, setTableData, isChild = false }) => {
    return (
        <Grid container spacing={2} className="backfff fortxtboxes">
            {
                isChild ? <FixedFieldChildModel fixedFieldConfig={config?.fixedFieldConfig} /> : <FixedFieldParentModel fixedFieldConfig={config?.fixedFieldConfig} />
            }
            <CreateDynamic udfConfig={config?.udfConfig} tableData={tableData} setTableData={setTableData} isRowLayout={false} />
        </Grid>
    )
}

export default ParentChildBasicInfo