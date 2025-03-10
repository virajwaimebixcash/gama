
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';

export const DatePickerComponent = ({ value, onChange, minDate, disabled }) => {  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className='maindatecontroller'
        value={dayjs(value)}  // Use the value prop passed from Controller
        minDate={minDate ? dayjs(minDate) : null}
        onChange={onChange}  // Use the onChange prop passed from Controller
        renderInput={(params) => <TextField {...params} size="small" />}
        disabled={disabled}
        format='DD/MM/YYYY'
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
