import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from ".//Settings.module.css"

const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: '#000',
    borderWidth: 1,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 1,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 2,
    padding: '4px !important', // override inline-style
  },
});

export default function Settings() {
  return (
      <div className={styles.settingsCon}>
           <Box
                component="form"
                noValidate
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { sm: '1fr 1fr' },
                    gap: 2,
                }}
                >
                <ValidationTextField
                    label="First Name"
                    required
                    variant="outlined"
                    defaultValue="John"
                    id="validation-outlined-input"
                />

                <ValidationTextField
                    label="Last Name"
                    required
                    variant="outlined"
                    defaultValue="Doe"
                    id="validation-outlined-input"
                />
            </Box>

            <div className={styles.paddingTop}>
                <Box
                    component="form"
                    noValidate
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { sm: '1fr 1fr' },
                        gap: 2,
                        width: 1725,
                    }}
                >
                    <ValidationTextField
                        label="Email Address"
                        required
                        variant="outlined"
                        defaultValue="johndoe@example.com"
                        id="validation-outlined-input"
                    />
                </Box>
            </div>

            <div className={styles.paddingTop}>
                <Box
                    component="form"
                    noValidate
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { sm: '1fr 1fr' },
                        gap: 2,
                        width: 1725,
                    }}
                >
                    <ValidationTextField
                        label="Old Password"
                        required
                        variant="outlined"
                        defaultValue="**********"
                        id="validation-outlined-input"
                    />
                </Box>
            </div>

            <div className={styles.paddingTop}>
                <Box
                    component="form"
                    noValidate
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { sm: '1fr 1fr' },
                        gap: 2,
                        width: 1725,
                    }}
                >
                    <ValidationTextField
                        label="New Password"
                        required
                        variant="outlined"
                        defaultValue="**********"
                        id="validation-outlined-input"
                    />
                </Box>
            </div>

            <div className={styles.paddingTop}>
                <Box
                    component="form"
                    noValidate
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { sm: '1fr 1fr' },
                        gap: 2,
                        width: 1725,
                    }}
                >
                    <ValidationTextField
                        label="Phone Number"
                        required
                        variant="outlined"
                        defaultValue="0801 234 5678"
                        id="validation-outlined-input"
                    />
                </Box>
            </div>

            <button className={styles.submitButton}>
                done
            </button>
            
      </div>
   
  );
}
