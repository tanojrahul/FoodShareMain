import { useState, useEffect } from 'react';
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
  Badge
} from '@mui/material';
import { 
  Home as HomeIcon,
  MenuOpen as MenuOpenIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  LocalShipping as DeliveryIcon,
  BarChart as BarChartIcon,
  EmojiEvents as RewardsIcon,
  AccountCircle as ProfileIcon,
  ExitToApp as LogoutIcon,
  AddCircle as AddCircleIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../components/Navbar';
import DonationForm from '../components/donor/DonationForm';
import DonationsList from '../components/donor/DonationsList';
import ImpactMetrics from '../components/donor/ImpactMetrics';
import Rewards from '../components/donor/Rewards';

// Define drawer width for sidebar
const drawerWidth = 240;

const DonorDashboardPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State variables
  const [open, setOpen] = useState(!isMobile);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('donations');
  const [donations, setDonations] = useState([]);
  const [rewardsData, setRewardsData] = useState(null);
  const [impactData, setImpactData] = useState(null);
  const [error, setError] = useState(null);
  
  // Mock user ID for now - this would come from auth context in a real app
  const donorId = '550e8400-e29b-41d4-a716-446655440000';
  
  useEffect(() => {
    // Fetch all necessary data for the dashboard
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch donations
        const donationsResponse = await axios.get(`/api/v1/donations?donor_id=${donorId}`);
        
        // Fetch rewards data
        const rewardsResponse = await axios.get(`/api/v1/rewards?donor_id=${donorId}`);
        
        // Fetch impact metrics
        const impactResponse = await axios.get(`/api/v1/donors/${donorId}/impact`);
        
        // Update state with fetched data
        setDonations(donationsResponse.data);
        setRewardsData(rewardsResponse.data);
        setImpactData(impactResponse.data);
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [donorId]);
  
  // Handle drawer open/close
  const toggleDrawer = () => {
    setOpen(!open);
  };
  
  // Function to add a new donation
  const handleAddDonation = async (newDonation) => {
    try {
      const response = await axios.post('/api/v1/donations', {
        ...newDonation,
        donor_id: donorId
      });
      
      // Add the new donation to the state
      setDonations([response.data, ...donations]);
      
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error adding donation:', err);
      return { success: false, error: err.message };
    }
  };
  
  // Function to update donation
  const handleUpdateDonation = async (donationId, updatedData) => {
    try {
      const response = await axios.put(`/api/v1/donations/${donationId}`, updatedData);
      
      // Update donation in state
      setDonations(donations.map(donation => 
        donation.donation_id === donationId ? response.data : donation
      ));
      
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error updating donation:', err);
      return { success: false, error: err.message };
    }
  };
  
  // Function to delete donation
  const handleDeleteDonation = async (donationId) => {
    try {
      await axios.delete(`/api/v1/donations/${donationId}`);
      
      // Remove donation from state
      setDonations(donations.filter(donation => donation.donation_id !== donationId));
      
      return { success: true };
    } catch (err) {
      console.error('Error deleting donation:', err);
      return { success: false, error: err.message };
    }
  };
  
  // Function to redeem a reward
  const handleRedeemReward = async (rewardId) => {
    try {
      const response = await axios.post('/api/v1/rewards/redeem', {
        donor_id: donorId,
        reward_id: rewardId
      });
      
      // Update rewards data with new points balance
      setRewardsData({
        ...rewardsData,
        points: response.data.points_remaining,
        // In a real app, you would also update the rewards_available and rewards_redeemed arrays
      });
      
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error redeeming reward:', err);
      return { success: false, error: err.message };
    }
  };
  
  // Render loading state
  if (loading) {
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
        }}
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
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Donor Dashboard
          </Typography>
          <IconButton color="inherit" aria-label="notifications">
            <Badge badgeContent={2} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" aria-label="profile" edge="end">
            <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 32, height: 32 }}>
              J
            </Avatar>
          </IconButton>
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
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: 1 }}>
            <Avatar 
              sx={{ 
                width: 64, 
                height: 64,
                bgcolor: theme.palette.primary.main,
                boxShadow: 2
              }}
            >
              JD
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6" noWrap>
                John Donor
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {rewardsData?.level} Member
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <List>
            <ListItemButton 
              selected={activeSection === 'dashboard'} 
              onClick={() => setActiveSection('dashboard')}
              sx={{ borderRadius: 1, mb: 1 }}
            >
              <ListItemIcon>
                <DashboardIcon color={activeSection === 'dashboard' ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            
            <ListItemButton 
              selected={activeSection === 'donations'} 
              onClick={() => setActiveSection('donations')}
              sx={{ borderRadius: 1, mb: 1 }}
            >
              <ListItemIcon>
                <DeliveryIcon color={activeSection === 'donations' ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="My Donations" />
            </ListItemButton>
            
            <ListItemButton 
              selected={activeSection === 'impact'} 
              onClick={() => setActiveSection('impact')}
              sx={{ borderRadius: 1, mb: 1 }}
            >
              <ListItemIcon>
                <BarChartIcon color={activeSection === 'impact' ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Impact" />
            </ListItemButton>
            
            <ListItemButton 
              selected={activeSection === 'rewards'} 
              onClick={() => setActiveSection('rewards')}
              sx={{ borderRadius: 1, mb: 1 }}
            >
              <ListItemIcon>
                <RewardsIcon color={activeSection === 'rewards' ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Rewards" />
            </ListItemButton>
          </List>
          
          <Divider sx={{ my: 2 }} />
          
          <List>
            <ListItemButton 
              onClick={() => navigate('/profile')}
              sx={{ borderRadius: 1, mb: 1 }}
            >
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
            
            <ListItemButton 
              onClick={() => navigate('/')}
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
          {/* Dashboard Content */}
          <Box component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeSection === 'dashboard' && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h4" component="h1" gutterBottom>
                    Welcome back, John!
                  </Typography>
                </Grid>
                
                {/* Quick summary cards */}
                <Grid item xs={12} md={4}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      height: '100%',
                      borderRadius: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: 'primary.light',
                      color: 'white'
                    }}
                  >
                    <Typography variant="h6" gutterBottom>Total Donations</Typography>
                    <Typography variant="h3" component="div" sx={{ mt: 'auto', fontWeight: 'bold' }}>
                      {impactData?.total_donations || 0}
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      height: '100%',
                      borderRadius: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: 'secondary.light',
                      color: 'white'
                    }}
                  >
                    <Typography variant="h6" gutterBottom>Meals Provided</Typography>
                    <Typography variant="h3" component="div" sx={{ mt: 'auto', fontWeight: 'bold' }}>
                      {impactData?.total_meals_provided || 0}
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      height: '100%',
                      borderRadius: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: 'success.light',
                      color: 'white'
                    }}
                  >
                    <Typography variant="h6" gutterBottom>Reward Points</Typography>
                    <Typography variant="h3" component="div" sx={{ mt: 'auto', fontWeight: 'bold' }}>
                      {rewardsData?.points || 0}
                    </Typography>
                  </Paper>
                </Grid>
                
                {/* Recent donations section */}
                <Grid item xs={12}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      mt: 3,
                      borderRadius: 3,
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h5" component="h2">
                        Recent Donations
                      </Typography>
                      <IconButton 
                        color="primary" 
                        aria-label="add donation"
                        onClick={() => setActiveSection('donations')}
                      >
                        <AddCircleIcon />
                      </IconButton>
                    </Box>
                    
                    <DonationsList 
                      donations={donations.slice(0, 3)} 
                      onUpdate={handleUpdateDonation}
                      onDelete={handleDeleteDonation}
                    />
                  </Paper>
                </Grid>
              </Grid>
            )}
            
            {activeSection === 'donations' && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h4" component="h1" gutterBottom>
                    My Donations
                  </Typography>
                </Grid>
                
                {/* Donation form */}
                <Grid item xs={12}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 3,
                    }}
                  >
                    <Typography variant="h5" component="h2" gutterBottom>
                      Create New Donation
                    </Typography>
                    <DonationForm onSubmit={handleAddDonation} />
                  </Paper>
                </Grid>
                
                {/* Donations list */}
                <Grid item xs={12}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 3,
                      mt: 3,
                    }}
                  >
                    <Typography variant="h5" component="h2" gutterBottom>
                      Donation History
                    </Typography>
                    <DonationsList 
                      donations={donations} 
                      onUpdate={handleUpdateDonation}
                      onDelete={handleDeleteDonation}
                    />
                  </Paper>
                </Grid>
              </Grid>
            )}
            
            {activeSection === 'impact' && (
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
            )}
            
            {activeSection === 'rewards' && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h4" component="h1" gutterBottom>
                    Rewards Program
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Rewards data={rewardsData} onRedeem={handleRedeemReward} />
                </Grid>
              </Grid>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default DonorDashboardPage;
