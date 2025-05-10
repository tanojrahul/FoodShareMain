import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  CssBaseline, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List, 
  Typography, 
  Divider, 
  IconButton, 
  Container, 
  Grid, 
  Paper, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Avatar, 
  LinearProgress,
  useMediaQuery,
  useTheme,
  Badge,
  Menu,
  MenuItem,
  Link
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  LocalMall as RequestsIcon,
  BarChart as MetricsIcon,
  AccountCircle as ProfileIcon,
  ExitToApp as LogoutIcon,
  Notifications as NotificationsIcon,
  MenuOpen as MenuOpenIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import BrowseDonations from '../components/beneficiary/BrowseDonations';
import SearchDonations from '../components/beneficiary/SearchDonations';
import MyRequests from '../components/beneficiary/MyRequests';
import ImpactMetrics from '../components/beneficiary/ImpactMetrics';

// Define drawer width for sidebar
const drawerWidth = 240;

const BeneficiaryDashboardPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // State variables
  const [open, setOpen] = useState(!isMobile);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('browse');
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]); // Initialize as an empty array
  const [impactData, setImpactData] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Handle profile menu open/close
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  
  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if not authenticated
      navigate('/login');
      return;
    }
    
    // Fetch all necessary data for the dashboard
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const userId = JSON.parse(storedUser).user_id;
        
        // Fetch available donations
        const donationsResponse = await axios.get(`/api/v1/donations?user_id=${userId}&status=available`);
        
        // Fetch user's donation requests
        const requestsResponse = await axios.get(`/api/v1/donation_requests?user_id=${userId}`);
        
        // Fetch impact metrics
        const impactResponse = await axios.get(`/api/v1/impact_metrics/${userId}`);        // Update state with fetched data
        setDonations(donationsResponse.data?.content || donationsResponse.data || []);
        
        // Make sure requests is always an array
        const requestsData = requestsResponse.data?.content || requestsResponse.data;
        setRequests(Array.isArray(requestsData) ? requestsData : []);
        
        setImpactData(impactResponse.data);
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [navigate]);
  
  // Handle drawer open/close
  const toggleDrawer = () => {
    setOpen(!open);
  };
  
  // Handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Navigate to home page
    navigate('/');
  };
  
  // Function to create a donation request
  const handleCreateRequest = async (donationId) => {
    if (!user) return { success: false, error: 'User not authenticated' };
    
    try {
      setLoading(true);
      
      const response = await axios.post('/api/v1/donation_requests', {
        user_id: user.user_id,
        donation_id: donationId,
        beneficiary_id: user.user_id
      });
        // Add the new request to the state
      setRequests(prevRequests => Array.isArray(prevRequests) ? [response.data, ...prevRequests] : [response.data]);
      
      // Refresh available donations (remove the one that was just requested)
      const updatedDonations = Array.isArray(donations) ? 
        donations.filter(donation => donation.donation_id !== donationId) : [];
      setDonations(updatedDonations);
      
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error creating request:', err);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };
  
  // Function to cancel a donation request
  const handleCancelRequest = async (requestId) => {
    if (!user) return { success: false, error: 'User not authenticated' };
    
    try {
      setLoading(true);
      
      await axios.delete(`/api/v1/donation_requests/${requestId}`, {
        data: { user_id: user.user_id }
      });
        // Remove the cancelled request from the state
      const updatedRequests = Array.isArray(requests) ?
        requests.filter(request => request.request_id !== requestId) : [];
      setRequests(updatedRequests);
      
      // Refresh available donations list
      const donationsResponse = await axios.get(`/api/v1/donations?user_id=${user.user_id}&status=available`);
      setDonations(donationsResponse.data.content || donationsResponse.data);
      
      setLoading(false);
      return { success: true };
    } catch (err) {
      console.error('Error cancelling request:', err);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };
  
  // Function to search donations
  const handleSearchDonations = async (searchParams) => {
    if (!user) return { success: false, error: 'User not authenticated' };
    
    try {
      setLoading(true);
      
      // Build query parameters
      const queryParams = new URLSearchParams();
      queryParams.append('user_id', user.user_id);
      
      if (searchParams.keyword) queryParams.append('keyword', searchParams.keyword);
      if (searchParams.food_category) queryParams.append('food_category', searchParams.food_category);
      if (searchParams.location) queryParams.append('location', searchParams.location);
      
      const response = await axios.get(`/api/v1/donations/search?${queryParams.toString()}`);
      
      setLoading(false);
      return { 
        success: true, 
        data: response.data.content || response.data 
      };
    } catch (err) {
      console.error('Error searching donations:', err);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };
  
  // Render loading state
  if (loading && !donations.length && !requests.length) {
    return (
      <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Container maxWidth="sm">
          <Typography variant="h4" align="center" gutterBottom>
            Loading Dashboard...
          </Typography>
          <LinearProgress color="primary" />
        </Container>
      </Box>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Container maxWidth="sm">
          <Typography variant="h4" align="center" color="error" gutterBottom>
            Error
          </Typography>
          <Typography variant="body1" align="center">
            {error}
          </Typography>
        </Container>
      </Box>
    );
  }
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: theme => theme.zIndex.drawer + 1,
          transition: theme => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme => theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
          bgcolor: 'white',
          color: 'text.primary'
        }}
        elevation={2}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: theme.palette.primary.main, fontWeight: 'bold' }}>
            FoodShare Beneficiary
          </Typography>
          <IconButton color="inherit" aria-label="notifications" sx={{ mr: 1 }}>
            <Badge badgeContent={2} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" 
            aria-label="profile" 
            onClick={handleProfileMenuOpen}
            aria-controls="profile-menu"
            aria-haspopup="true"
          >
            <Avatar 
              sx={{ 
                bgcolor: theme.palette.secondary.main, 
                width: 32, 
                height: 32,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}
            >
              {user?.username?.charAt(0) || 'U'}
            </Avatar>
          </IconButton>
          
          {/* Profile Menu */}
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => {
              handleProfileMenuClose();
              navigate('/profile');
            }}>
              <ListItemIcon>
                <ProfileIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </MenuItem>
            <MenuItem onClick={() => {
              handleProfileMenuClose();
              handleLogout();
            }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      {/* Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={isMobile ? toggleDrawer : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider'
          },
        }}
      >
        <Toolbar />
        <Box 
          component={motion.div}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          sx={{ overflow: 'auto', p: 2 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: 1 }}>
            <Avatar 
              sx={{ 
                width: 64, 
                height: 64,
                bgcolor: theme.palette.secondary.main,
                boxShadow: 2
              }}
            >
              {user?.username?.charAt(0) || 'U'}
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6" noWrap>
                {user?.username || 'User'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Beneficiary
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <List>
            <ListItemButton 
              component={motion.div}
              whileHover={{ scale: 1.05, x: 5 }}
              selected={activeSection === 'browse'} 
              onClick={() => setActiveSection('browse')}
              sx={{ 
                borderRadius: 1, 
                mb: 1,
                borderLeft: activeSection === 'browse' ? `4px solid ${theme.palette.primary.main}` : 'none',
                pl: activeSection === 'browse' ? 1.5 : 2
              }}
            >
              <ListItemIcon>
                <DashboardIcon color={activeSection === 'browse' ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Browse Donations" />
            </ListItemButton>
            
            <ListItemButton 
              component={motion.div}
              whileHover={{ scale: 1.05, x: 5 }}
              selected={activeSection === 'search'} 
              onClick={() => setActiveSection('search')}
              sx={{ 
                borderRadius: 1, 
                mb: 1,
                borderLeft: activeSection === 'search' ? `4px solid ${theme.palette.primary.main}` : 'none',
                pl: activeSection === 'search' ? 1.5 : 2
              }}
            >
              <ListItemIcon>
                <SearchIcon color={activeSection === 'search' ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Search Donations" />
            </ListItemButton>
            
            <ListItemButton 
              component={motion.div}
              whileHover={{ scale: 1.05, x: 5 }}
              selected={activeSection === 'requests'} 
              onClick={() => setActiveSection('requests')}
              sx={{ 
                borderRadius: 1, 
                mb: 1,
                borderLeft: activeSection === 'requests' ? `4px solid ${theme.palette.primary.main}` : 'none',
                pl: activeSection === 'requests' ? 1.5 : 2
              }}
            >
              <ListItemIcon>
                <RequestsIcon color={activeSection === 'requests' ? 'primary' : 'inherit'} />
              </ListItemIcon>              <ListItemText primary="My Requests" />
              <Badge badgeContent={Array.isArray(requests) ? requests.filter(r => r.status === 'pending').length : 0} color="primary" />
            </ListItemButton>
            
            <ListItemButton 
              component={motion.div}
              whileHover={{ scale: 1.05, x: 5 }}
              selected={activeSection === 'impact'} 
              onClick={() => setActiveSection('impact')}
              sx={{ 
                borderRadius: 1, 
                mb: 1,
                borderLeft: activeSection === 'impact' ? `4px solid ${theme.palette.primary.main}` : 'none',
                pl: activeSection === 'impact' ? 1.5 : 2
              }}
            >
              <ListItemIcon>
                <MetricsIcon color={activeSection === 'impact' ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Impact Metrics" />
            </ListItemButton>
          </List>
          
          <Divider sx={{ my: 2 }} />
          
          <List>
            <ListItemButton 
              component={motion.div}
              whileHover={{ scale: 1.05, x: 5 }}
              onClick={() => navigate('/profile')}
              sx={{ borderRadius: 1, mb: 1 }}
            >
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
            
            <ListItemButton 
              component={motion.div}
              whileHover={{ scale: 1.05, x: 5 }}
              onClick={handleLogout}
              sx={{ borderRadius: 1, mb: 1 }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: { xs: 10, sm: 12 } }}>
        <Container maxWidth="lg">
          {/* Dashboard Content with AnimatePresence for smooth transitions */}
          <AnimatePresence mode="wait">
            {activeSection === 'browse' && (
              <motion.div
                key="browse"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h4" component="h1" gutterBottom>
                      Available Donations
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <BrowseDonations 
                      donations={donations} 
                      onRequest={handleCreateRequest}
                      loading={loading}
                    />
                  </Grid>
                </Grid>
              </motion.div>
            )}
            
            {activeSection === 'search' && (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h4" component="h1" gutterBottom>
                      Search Donations
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <SearchDonations 
                      onSearch={handleSearchDonations}
                      onRequest={handleCreateRequest}
                      loading={loading}
                    />
                  </Grid>
                </Grid>
              </motion.div>
            )}
            
            {activeSection === 'requests' && (
              <motion.div
                key="requests"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h4" component="h1" gutterBottom>
                      My Donation Requests
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <MyRequests 
                      requests={requests} 
                      onCancel={handleCancelRequest}
                      loading={loading}
                    />
                  </Grid>
                </Grid>
              </motion.div>
            )}
            
            {activeSection === 'impact' && (
              <motion.div
                key="impact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h4" component="h1" gutterBottom>
                      Your Impact
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <ImpactMetrics data={impactData} />
                  </Grid>
                </Grid>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
        
        {/* Footer */}
        <Box 
          component="footer"
          sx={{ 
            mt: 'auto', 
            py: 3, 
            bgcolor: 'background.paper', 
            borderTop: '1px solid', 
            borderColor: 'divider',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} FoodShare. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Link 
              sx={{ 
                color: 'primary.main', 
                textDecoration: 'none',
                transition: 'all 0.3s',
                '&:hover': { 
                  textDecoration: 'underline' 
                }
              }} 
              onClick={() => navigate('/')}
            >
              Back to Home
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BeneficiaryDashboardPage;
