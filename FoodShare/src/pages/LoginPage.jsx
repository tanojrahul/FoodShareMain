import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid, 
  Link,
  CircularProgress,
  Alert,
  Slide,
  Fade,
  useMediaQuery,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Close as CloseIcon, Error as ErrorIcon } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Styled components
const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  maxWidth: 500,
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4),
    width: '100%',
    borderRadius: theme.shape.borderRadius,
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    transition: 'all 0.3s',
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.shape.borderRadius * 5,
  fontSize: '1.1rem',
  fontWeight: 600,
  transition: 'all 0.3s',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '&:hover': {
    transform: 'scale(1.05)',
  }
}));

const RegisterLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  transition: 'all 0.3s',
  '&:hover': {
    textDecoration: 'underline',
  }
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: 700,
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

const LoginPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  
  // Check if user is already logged in
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      
      // Redirect based on user role
      if (user.role === 'donor') {
        navigate('/donor');
      } else if (user.role === 'beneficiary') {
        navigate('/beneficiary');
      } else if (user.role === 'admin') {
        navigate('/admin');
      }
    }
  }, [navigate]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
    // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    const validationErrors = {};
    if (!formData.email?.trim()) validationErrors.email = 'Email is required';
    if (!formData.password?.trim()) validationErrors.password = 'Password is required';
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    setServerError('');
      try {
      // Import auth service and call login method
      const { authService } = await import('../utils/authUtils');
      const result = await authService.login({
        email: formData.email,
        password_hash: formData.password
      });
      
      if (result.success) {
        const userData = result.data;
        
        // Navigate to the appropriate dashboard based on user role
        if (userData.role === 'donor') {
          navigate('/donor');
        } else if (userData.role === 'beneficiary') {
          navigate('/beneficiary');
        } else if (userData.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setServerError(result.error);
        setLoading(false);
      }
      
    } catch (error) {
      let errorMessage = 'Login failed. Please check your credentials.';
      
      // Handle different error responses
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'Server not responding. Please try again later.';
      }
      
      setServerError(errorMessage);
      setLoading(false);
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 0.3, 
        duration: 0.5 
      }
    }
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      
      <Box component="main" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          pt: { xs: 12, sm: 14 },
          pb: 6
        }}
      >
        <Container maxWidth="lg">
          {/* Error Alert */}
          {serverError && (
            <Slide direction="down" in={Boolean(serverError)} mountOnEnter unmountOnExit>
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 4, 
                  width: { xs: '100%', sm: '500px' }, 
                  mx: 'auto',
                  animation: 'shake 0.5s',
                  '@keyframes shake': {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
                    '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' }
                  }
                }}
                onClose={() => setServerError('')}
              >
                {serverError}
              </Alert>
            </Slide>
          )}
          
          <Box component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <FormContainer>
              <FormTitle variant="h4" component="h1">
                Log In to FoodShare
              </FormTitle>
              
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  {/* Email */}
                  <Grid item xs={12}>
                    <StyledTextField
                      name="email"
                      label="Email"
                      type="email"
                      fullWidth
                      value={formData.email}
                      onChange={handleChange}
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                      required
                    />
                  </Grid>
                  
                  {/* Password */}
                  <Grid item xs={12}>
                    <StyledTextField
                      name="password"
                      label="Password"
                      type="password"
                      fullWidth
                      value={formData.password}
                      onChange={handleChange}
                      error={Boolean(errors.password)}
                      helperText={errors.password}
                      required
                    />
                  </Grid>
                  
                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Box textAlign="center">
                      <SubmitButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                      >
                        {loading ? <CircularProgress size={24} /> : "Login"}
                      </SubmitButton>
                    </Box>
                  </Grid>
                  
                  {/* Register Link */}
                  <Grid item xs={12}>
                    <Box textAlign="center">                      <Typography variant="body2">
                        Don&apos;t have an account? <RegisterLink href="/register">Register</RegisterLink>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </FormContainer>
          </Box>
        </Container>
      </Box>
      
      <Footer />
    </Box>
  );
};

export default LoginPage;
