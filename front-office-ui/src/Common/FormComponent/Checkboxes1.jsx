import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// export default function Checkboxes1() {
//   return (
//     <div>
//       <Checkbox {...label} defaultChecked />
    
//     </div>
//   );
// }

export default function Checkboxes1({ checked, onChange ,disabled}) {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      disabled={disabled}
    />
  );
}