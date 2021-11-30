import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useDispatch, connect } from 'react-redux';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { styled } from '@mui/material/styles';
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Card,
  Link,
  Container,
  Typography,
  Button
} from '@mui/material';
import COUNTRIES from '../constants/countries';
// layouts
import AuthLayout from '../layouts/AuthLayout';
import { register } from '../actions/auth';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// --------------------------------------------------------------------
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fieldValues, setFieldValues] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    gender: null,
    occupation: null,
    location: null
  });
  const [showPassword, setShowPassword] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      password: e.target.password.value,
      email: e.target.email.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      dob: e.target.dob.value,
      location: e.target.location.value,
      gender: e.target.gender.value,
      occupation: e.target.occupation.value
    };
    setFieldValues(data);
    dispatch(register({ ...data }))
      .then(() => setSuccessful(true))
      .catch(() => setSuccessful(false));
    navigate('/dashboard');
  };
  return (
    <RootStyle title="Register | ProdOpt">
      <AuthLayout>
        Already have an account? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
          Login
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Take your Career to the next Level!
          </Typography>
          <img alt="register" src="/static/illustrations/woman.png" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Stack spacing={3}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                autoComplete="username"
                name="email"
                value={fieldValues.email}
                type="email"
                label="Email address"
              />

              <TextField
                fullWidth
                autoComplete="current-password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                name="password"
                value={fieldValues.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  value={fieldValues.firstName}
                  name="firstName"
                  label="First name"
                />

                <TextField
                  fullWidth
                  value={fieldValues.lastName}
                  name="lastName"
                  label="Last name"
                />
              </Stack>
              <TextField
                fullWidth
                value={fieldValues.dob}
                name="dob"
                label="Date of birth"
                type="date"
              />

              <TextField
                fullWidth
                label="Location"
                select
                name="location"
                SelectProps={{
                  native: true
                }}
                value={fieldValues.location}
                helperText="Please select your country"
              >
                {COUNTRIES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="Gender"
                  select
                  name="gender"
                  value={fieldValues.gender}
                  SelectProps={{
                    native: true
                  }}
                  helperText="Please select your gender"
                >
                  {['MALE', 'FEMALE', 'RATHER NOT SAY'].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label="Occupation"
                  select
                  name="occupation"
                  value={fieldValues.occupation}
                  SelectProps={{
                    native: true
                  }}
                  helperText="Please select your occupation"
                >
                  {['Student', 'Professional', 'Unemployed'].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
              </Stack>
              <Button color="primary" fullWidth type="submit">
                Sign Up
              </Button>
            </form>
          </Stack>

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            By registering, I agree to ProdOpt&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Privacy Policy
            </Link>
            .
          </Typography>

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              Already have an account?&nbsp;
              <Link to="/login" component={RouterLink}>
                Login
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message
  };
}

export default connect(mapStateToProps)(Register);
