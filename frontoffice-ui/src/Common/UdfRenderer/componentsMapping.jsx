import FetchDataComponent from './FetchDataComponent';
import FetchDataWithDebounce from './FetchDataWithDebounce';
import MyHiddenInput from './MyHiddenInput';
import InputTypeFileUpload from './InputTypeFileUpload';
import DynamicInputTextWrapper from './FeatureTextInput';
import MyInputTypeTable from './MyInputTypeTable';
import MyInputTypeDropDown from './MyInputTypeDropDown';
import MyInputTypeText from './MyInputTypeText';
import MyInputTypeMultiSelectDropDown from './MyInputTypeMultiSelectDropDown'
import MyAutocomplete from './MyAutocompleteTextInput'
import MyInputTypeRadioGroup from './MyInputTypeRadioGroup';
import MyInputTypeCheckBox from './MyInputTypeCheckBox';
import MyInputTypeDate from './MyInputTypeDate'

const Components = {
  text: MyInputTypeText,
  conditionalfield: MyInputTypeText,
  checkbox: MyInputTypeCheckBox,
  radio: MyInputTypeRadioGroup,
  multiselect: (props) => <FetchDataComponent url={props.url} render={(data) => <MyInputTypeMultiSelectDropDown {...props} data={data} />} />,
  dropdown: (props) => <FetchDataComponent url={props.url} allValues={props.allValues} config={props.config} render={(data) => <MyInputTypeDropDown {...props} data={data || []} />} />,
  staticDropdown: (props) => <FetchDataComponent allValues={props.allValues} config={props.config} render={(data) => <MyInputTypeDropDown {...props} data={data || []} />} />,
  DependentDropdown: (props) => <FetchDataComponent url={props.url} render={(data) => <MyInputTypeDropDown {...props} data={data || []} />} />,
  dynamicTable: MyInputTypeTable,
  fileUpload: InputTypeFileUpload,
  date: MyInputTypeDate,
  featuredtext: DynamicInputTextWrapper,
  autoSuggestion: (props) => (
    <FetchDataWithDebounce
      url={props.url}
      minCharsToSearch={props.minCharsToSearch}
      paramName={props.paramName}
      allValues={props.allValues}
      config={props.config}
      defaultValue={props.defaultValue}
      render={({ data, inputValue, setInputValue, value }) => (
        <MyAutocomplete
          {...props}
          data={data}
          inputValue={inputValue}
          setInputValue={setInputValue}
          value={value}
        />
      )}
    />
  ),
  hidden: MyHiddenInput,
};

export default Components;
