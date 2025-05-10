import { http, HttpResponse, delay } from 'msw';
import { mockKpiData, mockDonations, mockRewards, mockDonorImpact, foodCategories, mockUsers, mockAdminAnalytics } from './mockData';

export const handlers = [
  http.get('/api/v1/kpis', async () => {
    // Simulate network delay
    await delay(800);
    return HttpResponse.json(mockKpiData);
  }),
  
  // Handler for user registration
  http.post('/api/v1/users/register', async ({ request }) => {
    // Simulate network delay
    await delay(1000);
    
    const requestBody = await request.json();
    
    // Basic validation - email format and required fields
    if (!requestBody.email || !requestBody.email.includes('@')) {
      return new HttpResponse(
        JSON.stringify({ message: 'Invalid email format' }),
        { status: 400 }
      );
    }
    
    if (!requestBody.username || !requestBody.password_hash || !requestBody.role) {
      return new HttpResponse(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400 }
      );
    }
    
    // Simulating an existing email (for demo purposes)
    if (requestBody.email === 'existing@example.com') {
      return new HttpResponse(
        JSON.stringify({ message: 'Email already registered' }),
        { status: 409 }
      );
    }
    
    // Success response
    return HttpResponse.json({
      user_id: crypto.randomUUID(),
      username: requestBody.username,
      email: requestBody.email,
      role: requestBody.role
    });
  }),
    
  // Handler for user login
  http.post('/api/v1/users/login', async ({ request }) => {
    // Simulate network delay
    await delay(1000);
    
    const requestBody = await request.json();
    
    // Basic validation
    if (!requestBody.email || !requestBody.password_hash) {
      return new HttpResponse(
        JSON.stringify({ message: 'Email and password are required' }),
        { status: 400 }
      );
    }
    
    // Demo credentials for testing
    const validCredentials = [
      { 
        email: 'donor@example.com', 
        password: 'password123',
        userData: {
          user_id: '550e8400-e29b-41d4-a716-446655440000',
          username: 'John Donor',
          email: 'donor@example.com',
          role: 'donor'
        }
      },
      { 
        email: 'beneficiary@example.com', 
        password: 'password123',
        userData: {
          user_id: '550e8400-e29b-41d4-a716-446655440001',
          username: 'Mary Beneficiary',
          email: 'beneficiary@example.com',
          role: 'beneficiary'
        }
      },
      { 
        email: 'admin@example.com', 
        password: 'password123',
        userData: {
          user_id: '550e8400-e29b-41d4-a716-446655440002',
          username: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        }
      },
    ];
    
    // Find matching user
    const user = validCredentials.find(
      cred => cred.email === requestBody.email && cred.password === requestBody.password_hash
    );
    
    if (user) {
      return HttpResponse.json(user.userData);
    } else {
      return new HttpResponse(
        JSON.stringify({ message: 'Invalid email or password' }),
        { status: 401 }
      );
    }
  }),

  // Handler to get donor's donations
  http.get('/api/v1/donations', async ({ request }) => {
    await delay(800);
    
    // Check for donor_id in URL params
    const url = new URL(request.url);
    const donorId = url.searchParams.get('donor_id');
    
    if (donorId) {
      const donorDonations = mockDonations.filter(
        donation => donation.donor_id === donorId
      );
      return HttpResponse.json(donorDonations);
    }
    
    // If no donor_id specified, return all donations (admin view)
    return HttpResponse.json(mockDonations);
  }),
  
  // Handler to get a single donation
  http.get('/api/v1/donations/:donationId', async ({ params }) => {
    await delay(500);
    
    const { donationId } = params;
    const donation = mockDonations.find(d => d.donation_id === donationId);
    
    if (donation) {
      return HttpResponse.json(donation);
    } else {
      return new HttpResponse(
        JSON.stringify({ message: 'Donation not found' }),
        { status: 404 }
      );
    }
  }),
  
  // Handler to create a new donation
  http.post('/api/v1/donations', async ({ request }) => {
    await delay(1000);
    
    const requestBody = await request.json();
    
    // Basic validation
    if (!requestBody.food_name || !requestBody.quantity || !requestBody.food_type) {
      return new HttpResponse(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400 }
      );
    }
    
    // Create new donation
    const newDonation = {
      donation_id: crypto.randomUUID(),
      donor_id: requestBody.donor_id,
      food_name: requestBody.food_name,
      quantity: requestBody.quantity,
      quantity_unit: requestBody.quantity_unit,
      food_type: requestBody.food_type,
      expiry_date: requestBody.expiry_date,
      pickup_address: requestBody.pickup_address,
      status: 'available',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      image_url: requestBody.image_url || 'https://images.unsplash.com/photo-1506484381205-f7945653044d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D'
    };
    
    // In a real app, this would be added to a database
    // For the mock, we're just returning the new donation
    return HttpResponse.json(newDonation);
  }),
  
  // Handler to update a donation
  http.put('/api/v1/donations/:donationId', async ({ request, params }) => {
    await delay(800);
    
    const { donationId } = params;
    const requestBody = await request.json();
    
    // In a real app, find and update the donation in the database
    // For the mock, return the updated donation
    return HttpResponse.json({
      ...requestBody,
      donation_id: donationId,
      updated_at: new Date().toISOString()
    });
  }),
  
  // Handler to delete a donation
  http.delete('/api/v1/donations/:donationId', async ({ params }) => {
    await delay(800);
    
    // In a real app, this would delete from the database
    // For the mock, just return success
    return HttpResponse.json({ 
      message: 'Donation deleted successfully',
      donation_id: params.donationId
    });
  }),
  
  // Handler to get donor rewards
  http.get('/api/v1/rewards', async ({ request }) => {
    await delay(800);
    
    // Check for donor_id in URL params
    const url = new URL(request.url);
    const donorId = url.searchParams.get('donor_id');
    
    if (donorId === mockRewards.donor_id) {
      return HttpResponse.json(mockRewards);
    }
    
    // If donor_id doesn't match, return empty rewards
    return HttpResponse.json({
      donor_id: donorId,
      points: 0,
      level: "Bronze",
      rewards_available: [],
      rewards_redeemed: []
    });
  }),
  
  // Handler to redeem a reward
  http.post('/api/v1/rewards/redeem', async ({ request }) => {
    await delay(1000);
    
    const requestBody = await request.json();
    
    // Basic validation
    if (!requestBody.donor_id || !requestBody.reward_id) {
      return new HttpResponse(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400 }
      );
    }
    
    // Check if reward exists
    const reward = mockRewards.rewards_available.find(
      r => r.reward_id === requestBody.reward_id
    );
    
    if (!reward) {
      return new HttpResponse(
        JSON.stringify({ message: 'Reward not found' }),
        { status: 404 }
      );
    }
    
    // Check if user has enough points
    if (mockRewards.points < reward.points_required) {
      return new HttpResponse(
        JSON.stringify({ message: 'Not enough points to redeem this reward' }),
        { status: 400 }
      );
    }
    
    // In a real app, this would update the database
    // For the mock, return redemption success
    return HttpResponse.json({
      success: true,
      message: 'Reward redeemed successfully',
      reward_code: `REWARD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      points_remaining: mockRewards.points - reward.points_required
    });
  }),
  
  // Handler to get donor impact metrics
  http.get('/api/v1/donors/:donorId/impact', async ({ params }) => {
    await delay(800);
    
    const { donorId } = params;
    
    if (donorId === mockDonorImpact.donor_id) {
      return HttpResponse.json(mockDonorImpact);
    }
    
    return new HttpResponse(
      JSON.stringify({ message: 'Donor not found' }),
      { status: 404 }
    );
  }),
  // Get food categories
  http.get('/api/v1/categories/food', async () => {
    await delay(300);
    return HttpResponse.json(foodCategories);
  }),

  // ADMIN HANDLERS
  
  // Get all users for admin management
  http.get('/api/v1/admin/users', async () => {
    await delay(800);
    return HttpResponse.json(mockUsers);
  }),
  
  // Get a specific user by ID
  http.get('/api/v1/admin/users/:userId', async ({ params }) => {
    await delay(500);
    
    const { userId } = params;
    const user = mockUsers.find(u => u.user_id === userId);
    
    if (user) {
      return HttpResponse.json(user);
    } else {
      return new HttpResponse(
        JSON.stringify({ message: 'User not found' }),
        { status: 404 }
      );
    }
  }),
  
  // Update user status (activate/deactivate)
  http.put('/api/v1/admin/users/:userId/status', async ({ request, params }) => {
    await delay(800);
    
    const { userId } = params;
    const requestBody = await request.json();
    
    const user = mockUsers.find(u => u.user_id === userId);
    
    if (!user) {
      return new HttpResponse(
        JSON.stringify({ message: 'User not found' }),
        { status: 404 }
      );
    }
    
    // In a real app, this would update the database
    return HttpResponse.json({
      ...user,
      status: requestBody.status,
      updated_at: new Date().toISOString()
    });
  }),
  
  // Get admin analytics
  http.get('/api/v1/admin/analytics', async () => {
    await delay(1000);
    return HttpResponse.json(mockAdminAnalytics);
  }),
  
  // Override donation status
  http.put('/api/v1/admin/donations/:donationId/status', async ({ request, params }) => {
    await delay(800);
    
    const { donationId } = params;
    const requestBody = await request.json();
    
    const donation = mockDonations.find(d => d.donation_id === donationId);
    
    if (!donation) {
      return new HttpResponse(
        JSON.stringify({ message: 'Donation not found' }),
        { status: 404 }
      );
    }
    
    // In a real app, this would update the database
    return HttpResponse.json({
      ...donation,
      status: requestBody.status,
      admin_note: requestBody.admin_note || null,
      updated_at: new Date().toISOString(),
      modified_by: requestBody.admin_id
    });
  }),
  
  // Admin action logs
  http.get('/api/v1/admin/logs', async () => {
    await delay(800);
    
    // Mocked admin logs
    const adminLogs = [
      {
        log_id: '1',
        action_type: 'user_status_change',
        admin_id: '550e8400-e29b-41d4-a716-446655440002',
        target_id: '550e8400-e29b-41d4-a716-446655440030',
        details: 'Changed user status from active to inactive',
        timestamp: '2025-05-08T14:30:22Z'
      },
      {
        log_id: '2',
        action_type: 'donation_status_override',
        admin_id: '550e8400-e29b-41d4-a716-446655440002',
        target_id: 'a9b8c7d6-e5f4-3210-a9b8-c7d6e5f43210',
        details: 'Changed donation status from claimed to completed',
        timestamp: '2025-05-08T10:15:48Z'
      },
      {
        log_id: '3',
        action_type: 'platform_settings_update',
        admin_id: '550e8400-e29b-41d4-a716-446655440002',
        target_id: null,
        details: 'Updated notification settings',
        timestamp: '2025-05-07T16:42:05Z'
      },
      {
        log_id: '4',
        action_type: 'user_status_change',
        admin_id: '550e8400-e29b-41d4-a716-446655440002',
        target_id: '550e8400-e29b-41d4-a716-446655440021',
        details: 'Changed user status from pending to active',
        timestamp: '2025-05-06T09:18:33Z'
      },
      {
        log_id: '5',
        action_type: 'donation_status_override',
        admin_id: '550e8400-e29b-41d4-a716-446655440002',
        target_id: 'f6e7d8c9-b0a1-2345-f6e7-d8c9b0a12345',
        details: 'Changed donation status from expired to available',
        timestamp: '2025-05-05T11:24:17Z'
      }
    ];
    
    return HttpResponse.json(adminLogs);
  }),
  
  // Get platform settings
  http.get('/api/v1/admin/settings', async () => {
    await delay(600);
    
    // Mocked platform settings
    const platformSettings = {
      notification_settings: {
        donation_expiry_warning_days: 2,
        enable_email_notifications: true,
        enable_push_notifications: true
      },
      rewards_settings: {
        points_per_kg: 5,
        enable_rewards_system: true
      },
      user_settings: {
        require_email_verification: true,
        auto_approve_users: false,
        inactive_user_days: 90
      },
      donation_settings: {
        max_donation_days: 14,
        minimum_donation_quantity: 1,
        allow_partial_claims: true
      }
    };
    
    return HttpResponse.json(platformSettings);
  }),
  
  // Update platform settings
  http.put('/api/v1/admin/settings', async ({ request }) => {
    await delay(1000);
    
    const requestBody = await request.json();
    
    // In a real app, this would update the database
    return HttpResponse.json({
      ...requestBody,
      updated_at: new Date().toISOString()
    });
  }),
];
