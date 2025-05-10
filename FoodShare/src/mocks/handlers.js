import { http, HttpResponse, delay } from 'msw';
import { mockKpiData, mockDonations, mockRewards, mockDonorImpact, foodCategories } from './mockData';

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
];
