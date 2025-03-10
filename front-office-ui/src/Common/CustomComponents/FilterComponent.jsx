import { useEffect, useRef, useState } from 'react';
import { Button, Drawer } from '@mui/material';
import Grid from '@mui/material/Grid2';
import MultiSelectDropdown from './FilterComponentInputs/MultiSelectDropdown';
import DateFilter from "./FilterComponentInputs/DateFilter"
import ArithmaticOperatorDiv from './FilterComponentInputs/ArithmaticOperatorDiv';
import PDFTooltip from '../PDFTooltip';
import ExcelTooltip from '../ExcelTooltip';
import FilterTooltip from '../FilterTooltip';
import FreeTextSearchFilter from './FilterComponentInputs/FreeTextSearchFilter';
import FetchDataWithDebounce from '../UdfRenderer/FetchDataWithDebounce';
import AutocompleteFilter from './FilterComponentInputs/AutocompleteFilter';
import FetchDataComponent from '../UdfRenderer/FetchDataComponent';
import DropdownFilter from './FilterComponentInputs/DropdownFilter';
import { defaultFromDate, defaultToDate } from '../../utils/commonFunction';

const FilterComponent = ({
  tableConfig,
  filterValues,
  setFilterValues,
  getData,
  onlyCustom,
  minFromDate,
  minToDate,
  requirePdf,
  requireExcel,
  requireFilter,
  setDefaultDate = false
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [clearClicked, setClearClicked] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [filterErrors, setFilterErrors] = useState({}); // Store validation errors
  const [tempFilterValues, setTempFilterValues] = useState({ ...filterValues });
  const [isFiterApplied, setIsFiterApplied] = useState(false);

  const initialRender = useRef(true);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
    setTempFilterValues({ ...filterValues });
    setIsFiterApplied(false);
  };

  const isValidDate = (date) => {
    // Check if date is in a valid format (YYYY-MM-DD or any format you expect)
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  };

  const handleApplyFilter = () => {
    let errors = {};

    tableConfig?.forEach((filter) => {
      // Only apply the filter logic if the filter is set to be applied ('Y')
      if (filter.isFilterApply === 'Y') {
        // const fieldValue = filterValues[filter.fieldName];
        const fieldValue = tempFilterValues[filter.fieldName];

        // Special case for Date Filters
        if (filter.filterType === 'DateFilter') {

          const fromDate = tempFilterValues[`${filter.fieldName}From`];
          const toDate = tempFilterValues[`${filter.fieldName}To`];

          // Ensure date validation only happens when the custom filter is selected or required
          if (filter.isFilterApply === 'Y') {
            if (!fromDate) {
              errors[`${filter.fieldName}From`] = `Select valid From Date`;
            }

            if (!toDate) {
              errors[`${filter.fieldName}To`] = `Select valid To Date`;
            }
          }
          // Add validation to check if dates are in correct format
          if (fromDate && !isValidDate(fromDate)) {
            errors[`${filter.fieldName}From`] = `Enter valid From Date`;
          }
          if (toDate && !isValidDate(toDate)) {
            errors[`${filter.fieldName}To`] = `Enter valid To Date`;
          }

        }
      }
    });

    if (Object.keys(errors).length > 0) {
      setFilterErrors(errors);
      return;
    }

    setFilterErrors({});
    setFilterValues(tempFilterValues);
    setIsFiterApplied(true);
  };

  const handleClearFilter = () => {
    setTempFilterValues({});
    setFilterErrors({}); // Reset errors
  
    if (setDefaultDate) {
      setFilterValues({ orderDateFrom: defaultFromDate, orderDateTo: defaultToDate });
    } else {
      setFilterValues({});
    }
  
    setIsPanelOpen(false);
    setIsFiterApplied(false);
    setClearClicked(true);
  };
  

  useEffect(() => {    
    if (isFiterApplied) {
      getData();
      setIsPanelOpen(false);
    }
  }, [filterValues, isFiterApplied])


  useEffect(() => {
    // If it's the first render, we skip the API call
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (setDefaultDate) {
      if (clearClicked) {
        getData();
        setClearClicked(false)
      }
    }
    else {
      if (clearClicked && Object.keys(filterValues).length === 0) {
        getData();
        setClearClicked(false)
      }
    }

  }, [filterValues, clearClicked, getData]);

  const renderFilterComponent = (filter) => {
    switch (filter.filterType) {
      case 'Autosearch':
        return <FetchDataWithDebounce
          url={'/common/getThirdPartyMasterData'}
          minCharsToSearch={3}
          config={filter}
          render={({ data, inputValue, setInputValue, value }) => (
            <AutocompleteFilter
              {...filter}
              data={data}
              inputValue={inputValue}
              setInputValue={setInputValue}
              value={value}
              key={filter.fieldName}
              filter={filter}
              filterValues={tempFilterValues}
              setFilterValues={setTempFilterValues}
            />
          )}
        />
      case 'FreeTextSearch':
        return <FreeTextSearchFilter key={filter.fieldName} filter={filter} filterValues={tempFilterValues} setFilterValues={setTempFilterValues} />;
      case 'DateFilter':
        return <DateFilter key={filter.fieldName} filter={filter} filterValues={tempFilterValues} setFilterValues={setTempFilterValues} onlyCustom={onlyCustom} minFromDate={minFromDate} minToDate={minToDate}
          error={{
            from: filterErrors[`${filter.fieldName}From`],
            to: filterErrors[`${filter.fieldName}To`],
          }}
        />;
      case 'Dropdown':
        return <FetchDataComponent
          url={'/common/getThirdPartyMasterData'}
          config={filter}
          render={(data) =>
            <DropdownFilter
              {...filter}
              data={data || []}
              filter={filter}
              filterValues={tempFilterValues}
              setFilterValues={setTempFilterValues}
            />}
        />
      case 'ArithmeticOperatorSearch':
        return <ArithmaticOperatorDiv key={filter.fieldName} filter={filter} filterValues={tempFilterValues} setFilterValues={setTempFilterValues} />;
      case 'MultiSelectDropdown':
        return <MultiSelectDropdown key={filter.fieldName} filter={filter} filterValues={tempFilterValues} setFilterValues={setTempFilterValues} />;
      default:
        return <FreeTextSearchFilter key={filter?.fieldName} filter={filter} filterValues={tempFilterValues} setFilterValues={setTempFilterValues} />;
    }
  };

  return (
    <>
      <div className="tpsspacegp " style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {
          requirePdf &&
          <span className="dwloption stdpadding">
            {/* <img src={pdf} alt="Download PDF" /> */}
            <PDFTooltip></PDFTooltip>
          </span>
        }
        {
          requireExcel &&
          <span className="dwloption stdpadding">
            {/* <img src={excel} alt="Download Excel" /> */}
            <ExcelTooltip></ExcelTooltip>
          </span>
        }
        {
          requireFilter &&
          <span className="dwloption stdpadding">
            {/* <img src={threedot} alt="Toggle Filter" onClick={togglePanel} /> */}
            <span onClick={togglePanel} ><FilterTooltip></FilterTooltip></span>
          </span>
        }
      </div>
      <Drawer anchor="right" open={isPanelOpen} onClose={togglePanel}>
        <div className="filterpanl">
          <h2>Filter Options</h2>
          {tableConfig
            ?.filter((filter) => filter.isFilterApply === 'Y')
            ?.map((filter) => (
              <Grid key={filter.fieldName} size={{ xs: 12, sm: 6, md: 4, lg: 2 }} >
                <p>{filter.displayHeader}</p>
                {renderFilterComponent(filter)}
              </Grid>
            ))}
          <div className="filterbtn">

            <Button
              variant="contained"
              color="primary  cancelfilters allwhitecolor  "
              className='othercssdetails'
              onClick={() => {
                togglePanel();
                // setFilterValues({});
              }}
              style={{ marginTop: '20px' }}
            >
              Cancel
            </Button>
            <Button className='Darkbtn othercssdetails'
              variant="contained"
              color="secondary"
              onClick={handleApplyFilter}
              style={{ marginTop: '20px' }}
            >
              Apply Filter
            </Button>
            <Button
              variant="contained"
              color="error"
              className='othercssdetails'
              onClick={handleClearFilter}
              style={{ marginTop: '20px' }}
            >
              Clear Filter
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default FilterComponent;
