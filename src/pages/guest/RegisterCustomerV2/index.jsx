import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import logo from '../../../assets/images/DeliveryPNG.png';
import { grey } from '@mui/material/colors';
import { Google } from '@mui/icons-material';
import AuthRegister from './components/AuthRegister';
import Auth from '../../../utils/Auth';
import { useNavigate } from 'react-router-dom';
import useNotification from '../../../utils/useNotification';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import loginGoogle from '../../../services/loginGoogle';
import jwt_decode from 'jwt-decode';
import { FcGoogle } from 'react-icons/fc';

const index = () => {
  const theme = useTheme();
  const auth = Auth();
  const navigate = useNavigate();
  const [msg, sendNotification] = useNotification();
  const provider = new GoogleAuthProvider();
  function loginG() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const payload = {
          idToken: user.accessToken,
        };
        loginGoogle(payload)
          .then((res) => {
            if (res.status == 200) {
              const decoded = jwt_decode(res.data);
              localStorage.setItem('loginUser', JSON.stringify(decoded));
              localStorage.setItem('token', res.data);
              switch (decoded.Role) {
                case '1':
                  localStorage.setItem('selected', 'Dashboard');
                  localStorage.setItem('subConfig', false);
                  localStorage.setItem('sidebarToggle', 'true');
                  return navigate('/admin/dashboard', { replace: true });
                case '2':
                  localStorage.setItem('selected', 'Dashboard');
                  return navigate('/store-owner/dashboard', {
                    replace: true,
                  });
                case '3':
                  return navigate('/staff/home', { replace: true });
                case '4':
                  return navigate('/customer/home', { replace: true });
                default:
                  return null;
              }
            } else if (res.code == 404) {
              setIsinvalid(true);
            } else {
              sendNotification({
                msg: 'Không thể đăng nhập',
                variant: 'error',
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Box sx={{ backgroundColor: '#eef2f6', minHeight: '100vh' }}>
      <Grid
        container
        direction='column'
        // justifyContent='flex-end'
        // sx={{ minHeight: '100vh' }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            sx={{ minHeight: 'calc(100vh - 68px)' }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <Paper
                sx={{
                  maxWidth: { xs: 400, lg: 475 },
                  margin: { xs: 2.5, md: 3 },
                  '& > *': {
                    flexGrow: 1,
                    flexBasis: '50%',
                  },
                  borderRadius: '8px',
                }}
              >
                <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>
                  <Grid
                    container
                    spacing={2}
                    alignItems='center'
                    justifyContent='center'
                  >
                    <Grid item sx={{ mb: 3 }}>
                      {/* <Link to='#'><Logo />Logo</Link> */}
                      <img
                        src={logo}
                        style={{
                          // marginBottom: '20px',
                          height: '40px',
                          width: 'auto',
                          cursor: 'pointer',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/home', { replace: true });
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid
                        container
                        // direction={matchDownSM ? 'column-reverse' : 'row'}
                        direction={'column-reverse'}
                        alignItems='center'
                        justifyContent='center'
                      >
                        <Grid item>
                          <Stack
                            alignItems='center'
                            justifyContent='center'
                            spacing={1}
                          >
                            <Typography
                              color={theme.palette.primary.main}
                              gutterBottom
                              // variant={matchDownSM ? 'h3' : 'h2'}
                              variant={'h6'}
                              sx={{ fontWeight: '700' }}
                            >
                              Đăng ký
                            </Typography>
                            <Typography
                              variant='caption'
                              fontSize='16px'
                              // textAlign={matchDownSM ? 'center' : 'inherit'}
                              textAlign={'center'}
                              sx={{
                                // fontSize: '0.75rem',
                                color: grey[500],
                                fontWeight: 400,
                              }}
                            >
                              Nhập thông tin của bạn để tiếp tục
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <AuthRegister />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid
                        item
                        container
                        direction='column'
                        alignItems='center'
                        xs={12}
                      >
                        <Link
                          //   component={Link}
                          // to="/pages/register/register3"
                          href='/login'
                          variant='subtitle1'
                          sx={{ textDecoration: 'none' }}
                        >
                          Đã có tài khoản? Đăng nhập ngay
                        </Link>
                        <Typography
                          //   component={Link}
                          // to="/pages/register/register3"
                          variant='body2'
                          sx={{
                            textDecoration: 'none',
                            fontWeight: '700',
                            margin: '0.5rem 0',
                          }}
                        >
                          Hoặc đăng nhập với
                        </Typography>
                        {/* <Button
                          variant='contained'
                          color='error'
                          startIcon={<Google />}
                          fullWidth
                          sx={{ backgroundColor: '#dd4b39' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            loginG();
                          }}
                        >
                          Đăng nhập với google
                        </Button> */}
                        <Button
                          // variant='contained'
                          variant='outlined'
                          // color='error'
                          startIcon={<FcGoogle />}
                          fullWidth
                          // sx={{ backgroundColor: '#dd4b39' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            loginG();
                          }}
                          sx={{
                            color: 'black',
                            '&.MuiButton-outlined': {
                              borderColor: 'lightgrey',
                            },
                          }}
                        >
                          Đăng nhập với google
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                      <AuthFooter />
                  </Grid> */}
      </Grid>
    </Box>
  );
};

export default index;
