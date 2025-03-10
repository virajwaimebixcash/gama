import { useState } from 'react';
import { Box, Button, Modal } from '@mui/material';
import TextComponent from './ModalInputTypes/TextComponent';
import RadioComponent from './ModalInputTypes/RadioComponent';
import DropdownComponent from './ModalInputTypes/DropdownComponent';
import DateComponent from './ModalInputTypes/DateComponent';
import MultiSelectComponent from './ModalInputTypes/MultiSelectComponent';
import CheckboxComponent from './ModalInputTypes/CheckboxComponent';
import DynamicTableComponent from './ModalInputTypes/DynamicTableComponent';
import FeaturedComponent from './ModalInputTypes/FeaturedComponent';
import AutoSuggestionDropdown from './ModalInputTypes/AutoSuggestionDropdown';
import HiddenFieldComponent from './ModalInputTypes/HiddenFieldComponent';
import UploadImageComponent from './ModalInputTypes/UploadImageComponent';
import StaticDropdownComponent from './ModalInputTypes/StaticDropdownComponent';

const ModalComponent = ({ modalOpen, handleClose, selectedOption, formValues, handleChange, handleSave, dependonList }) => {
  const [isFormValid, setIsFormValid] = useState(true);

  // Determine modal width based on the selected option
  const modalWidth =
    selectedOption &&
      (selectedOption.value === 'dropdown' || selectedOption.value === 'autoSuggestion')
      ? 800
      : 400;

  const renderModalContent = () => {
    if (!selectedOption) return null;


    switch (selectedOption.value) {
      case 'text':
        return <TextComponent
          fields={selectedOption.fields}
          entityName={selectedOption.entityName}
          formValues={formValues}
          handleChange={handleChange}
          setFormValid={setIsFormValid}
          componentValue={'text'}
          dependonList={dependonList}

        />;
      case 'featuredtext':
        return <FeaturedComponent
          fields={selectedOption.fields}
          entityName={selectedOption.entityName}
          formValues={formValues}
          handleChange={handleChange}
          setFormValid={setIsFormValid}
          componentValue={'featuredtext'}
          dependonList={dependonList}
        />;
      case 'radio':
        return <RadioComponent dependonList={dependonList} entityName={selectedOption.entityName} fields={selectedOption.fields} formValues={formValues} handleChange={handleChange} />;
      case 'dropdown':
        return <DropdownComponent dependonList={dependonList} entityName={selectedOption.entityName} fields={selectedOption.fields} formValues={formValues} handleChange={handleChange} />;
      case 'date':
        return <DateComponent dependonList={dependonList} entityName={selectedOption.entityName} fields={selectedOption.fields} formValues={formValues} handleChange={handleChange} />;
      case 'multiselect':
        return <MultiSelectComponent dependonList={dependonList} entityName={selectedOption.entityName} fields={selectedOption.fields} formValues={formValues} handleChange={handleChange} />;
      case 'checkbox':
        return <CheckboxComponent dependonList={dependonList} entityName={selectedOption.entityName} fields={selectedOption.fields} formValues={formValues} handleChange={handleChange} />;
      case 'dynamicTable':
        return <DynamicTableComponent dependonList={dependonList} entityName={selectedOption.entityName} fields={selectedOption.fields} formValues={formValues} handleChange={handleChange} />;
      case 'autoSuggestion':
        return <AutoSuggestionDropdown dependonList={dependonList} entityName={selectedOption.entityName} fields={selectedOption.fields} formValues={formValues} handleChange={handleChange} />;
      case 'hidden':
        return <HiddenFieldComponent
          fields={selectedOption.fields}
          entityName={selectedOption.entityName}
          formValues={formValues}
          handleChange={handleChange}
          dependonList={dependonList}
          // setFormValid={setIsFormValid}
          componentValue={'hidden'}
        />;
      case 'fileUpload':
        return <UploadImageComponent
          fields={selectedOption.fields}
          entityName={selectedOption.entityName}
          formValues={formValues}
          handleChange={handleChange}
          dependonList={dependonList}
          // setFormValid={setIsFormValid}
          componentValue={'fileUpload'}
        />;
      case 'staticDropdown':
        return <StaticDropdownComponent dependonList={dependonList} entityName={selectedOption.entityName} fields={selectedOption.fields} formValues={formValues} handleChange={handleChange} />;
      default:
        return null;
    }
  };



  return (
    <Modal
      open={modalOpen}
      // onClose={handleClose}
      onClose={(event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
        handleClose(); // Close only when triggered from buttons
      }}
      disableEscapeKeyDown // Prevent closing on escape key
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          // width: 400,
          width: modalWidth, // Set width
          maxHeight: '80vh', // Set max height
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          overflowY: 'auto', // Enable vertical scrolling
        }}
      >
        {renderModalContent()}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" disabled={!isFormValid} onClick={handleSave}>Save</Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
