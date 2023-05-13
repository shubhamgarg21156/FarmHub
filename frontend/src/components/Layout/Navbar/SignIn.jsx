import { useState } from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/material';


export default function FormDialog({ open, setOpen, setTrigger }) {

    const [status, setStatus] = useState('signIn');

    const [loginInfo, setLoginInfo] = useState({
        phoneNumber: "",
        password: "",
    });

    const handleChange = (event) => {
        setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
    };


    async function submitUser(e) {
        e.preventDefault();

        const loginDetails = {
            phoneNumber: loginInfo.phoneNumber,
            password: loginInfo.password,
        };

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, loginDetails, { withCredentials: true })
            .then(() => {
                setTrigger(prevValue => !prevValue);
                setOpen(false);
            })
            .catch((error) => console.log(error));
    }

    const [forgotPass, setForgotPass] = useState({
        phoneNumber: "",
        otp: "",
        password: '',
        confirmPassword: ''
    });

    const changeForgotPass = (event) => {
        setForgotPass({ ...forgotPass, [event.target.name]: event.target.value });
    };

    const [validOtp, setValidOtp] = useState(true);

    async function getOtp(e) {
        e.preventDefault();

        const PassDetails = {
            phoneNumber: forgotPass.phoneNumber
        };

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/password/forgot`, PassDetails, { withCredentials: true })
            .then(() => {
                setStatus('otp');
            })
            .catch((error) => console.log(error));
    }

    async function checkOtp(e) {
        e.preventDefault();

        const PassDetails = {
            phoneNumber: forgotPass.phoneNumber,
            otp: forgotPass.otp
        };

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/password/otpCheck`, PassDetails, { withCredentials: true })
            .then((response) => {
                if(response.data.message === 'Invalid OTP') {
                    setValidOtp(false);
                    return;
                }
                setStatus('change');
            })
            .catch((error) => console.log(error));
    }

    async function submitPass(e) {
        e.preventDefault();

        const PassDetails = {
            phoneNumber: forgotPass.phoneNumber,
            password: forgotPass.password,
        };

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/password/changePassword`, PassDetails, { withCredentials: true })
            .then(() => {
                setStatus('signIn')
            })
            .catch((error) => console.log(error));
    }

    return (
        <Dialog open={open} onClose={() => { setOpen(false); setStatus('signIn'); }} disableScrollLock={true}>
            {status === 'signIn' &&
                <Box component='form' onSubmit={submitUser}>
                    <DialogTitle>SIGN IN</DialogTitle>
                    <DialogContent>
                        <TextField
                            value={loginInfo.phoneNumber}
                            onChange={handleChange}
                            color='tertiary'
                            autoFocus
                            margin="dense"
                            name="phoneNumber"
                            label="Phone No."
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            value={loginInfo.password}
                            onChange={handleChange}
                            color='tertiary'
                            autoFocus
                            margin="dense"
                            name="password"
                            label="Password"
                            type='password'
                            fullWidth
                            variant="standard"
                        />
                    <Link variant="subtitle2" color="tertiary.main" onClick={() => setStatus('forgot')}>
                        Forgot Password?
                    </Link>
                        <Typography mt={3} variant="subtitle2">
                            {'New User? '}
                            <Link component={RouterLink} to='/signup' onClick={() => setOpen(false)} color='tertiary.main'>
                                Create an Account
                            </Link>
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button color='tertiary' type='submit'>
                            Sign In
                        </Button>
                        <Button color='tertiary' onClick={() => setOpen(false)}>Cancel</Button>
                    </DialogActions>
                </Box>
            }
            {status === 'forgot' &&
                <Box component='form' onSubmit={getOtp}>
                    <DialogTitle>Forgot Password</DialogTitle>
                    <DialogContent component='form' > 
                    {/* add onsubmit here */}
                    <TextField
                        value={forgotPass.phoneNumber}
                        onChange={changeForgotPass}
                        color='tertiary'
                        autoFocus
                        margin="dense"
                        name="phoneNumber"
                        label="Phone No."
                        sx={{
                            width: '25rem'
                        }}
                        variant="standard"
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button color='tertiary' type='submit'>
                            Send OTP
                        </Button>
                        <Button color='tertiary' onClick={() => setOpen(false)}>Cancel</Button>
                    </DialogActions>
                </Box>
            }
            {status === 'otp' &&
                <Box component='form' onSubmit={checkOtp}>
                    <DialogTitle>Enter OTP</DialogTitle>
                    <DialogContent component='form' > 
                    {/* add onsubmit here */}
                    <TextField
                        value={forgotPass.otp}
                        onChange={changeForgotPass}
                        color='tertiary'
                        autoFocus
                        margin="dense"
                        name="otp"
                        label="OTP"
                        sx={{
                            width: '25rem'
                        }}
                        variant="standard"
                        error={!validOtp}
                        helperText={!validOtp ? 'Invalid OTP' : ' '}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button color='tertiary' type='submit'>
                            Submit
                        </Button>
                        <Button color='tertiary' onClick={() => setOpen(false)}>Cancel</Button>
                    </DialogActions>
                </Box>
            }
            {status === 'change' &&
                <Box component='form' onSubmit={submitPass}>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogContent component='form' > 
                    {/* add onsubmit here */}
                    <TextField
                        value={forgotPass.password}
                        onChange={changeForgotPass}
                        color='tertiary'
                        autoFocus
                        margin="dense"
                        name="password"
                        type='password'
                        label="New Password"
                        sx={{
                            width: '25rem'
                        }}
                        variant="standard"
                    />
                    <TextField
                        value={forgotPass.confirmPassword}
                        onChange={changeForgotPass}
                        color='tertiary'
                        autoFocus
                        margin="dense"
                        name="confirmPassword"
                        type='password'
                        label="Confirm Password"
                        sx={{
                            width: '25rem'
                        }}
                        variant="standard"
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button color='tertiary' type='submit'>
                            Submit
                        </Button>
                        <Button color='tertiary' onClick={() => setOpen(false)}>Cancel</Button>
                    </DialogActions>
                </Box>
            }
        </Dialog>
    );
}
