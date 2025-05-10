// Mock data for FoodShare platform
export const mockKpiData = {
  kpi_id: "123e4567-e89b-12d3-a456-426614174000",
  total_food_saved_kg: 7580,
  total_donations: 1245,
  total_meals_served: 22740,
  total_beneficiaries: 5680,
  total_carbon_offset_kg: 15160,
  updated_at: "2025-05-09T08:00:00Z"
};

// Admin dashboard analytics
export const mockAdminAnalytics = {
  donations_over_time: [
    { month: 'Jan', count: 87, weight_kg: 435 },
    { month: 'Feb', count: 102, weight_kg: 510 },
    { month: 'Mar', count: 118, weight_kg: 590 },
    { month: 'Apr', count: 130, weight_kg: 650 },
    { month: 'May', count: 142, weight_kg: 710 }
  ],
  food_by_category: [
    { category: 'produce', percentage: 32, weight_kg: 2425.6 },
    { category: 'bakery', percentage: 18, weight_kg: 1364.4 },
    { category: 'dairy', percentage: 12, weight_kg: 909.6 },
    { category: 'pantry', percentage: 15, weight_kg: 1137 },
    { category: 'meals', percentage: 10, weight_kg: 758 },
    { category: 'non-perishable', percentage: 8, weight_kg: 606.4 },
    { category: 'other', percentage: 5, weight_kg: 379 }
  ],
  geographical_impact: [
    { region: 'Downtown', donations: 312, beneficiaries: 1420 },
    { region: 'North Side', donations: 275, beneficiaries: 1250 },
    { region: 'West End', donations: 210, beneficiaries: 950 },
    { region: 'East District', donations: 248, beneficiaries: 1130 },
    { region: 'South County', donations: 200, beneficiaries: 930 }
  ],
  top_donors: [
    { donor_id: '550e8400-e29b-41d4-a716-446655440010', name: 'Green Market', donations: 87, weight_kg: 675 },
    { donor_id: '550e8400-e29b-41d4-a716-446655440011', name: 'Fresh Bakery', donations: 65, weight_kg: 430 },
    { donor_id: '550e8400-e29b-41d4-a716-446655440012', name: 'City Supermarket', donations: 54, weight_kg: 520 },
    { donor_id: '550e8400-e29b-41d4-a716-446655440013', name: 'Family Restaurant', donations: 42, weight_kg: 315 },
    { donor_id: '550e8400-e29b-41d4-a716-446655440014', name: 'Daily Harvest', donations: 38, weight_kg: 290 }
  ],
  platform_growth: {
    users_growth: [
      { month: 'Jan', donors: 45, beneficiaries: 78 },
      { month: 'Feb', donors: 52, beneficiaries: 85 },
      { month: 'Mar', donors: 61, beneficiaries: 97 },
      { month: 'Apr', donors: 70, beneficiaries: 110 },
      { month: 'May', donors: 82, beneficiaries: 128 }
    ],
    monthly_active_users: 710,
    average_donation_per_donor: 15.2,
    average_claim_time_hours: 8.4
  }
};

// Mock user data for admin management
export const mockUsers = [
  {
    user_id: '550e8400-e29b-41d4-a716-446655440000',
    username: 'John Donor',
    email: 'donor@example.com',
    role: 'donor',
    status: 'active',
    created_at: '2025-01-15T12:30:00Z',
    donations_count: 27,
    address: '123 Main St, Anytown, USA',
    phone: '(555) 123-4567',
    organization: 'Green Market'
  },
  {
    user_id: '550e8400-e29b-41d4-a716-446655440001',
    username: 'Mary Beneficiary',
    email: 'beneficiary@example.com',
    role: 'beneficiary',
    status: 'active',
    created_at: '2025-01-20T14:45:00Z',
    claims_count: 18,
    address: '456 Oak Ave, Anytown, USA',
    phone: '(555) 234-5678',
    organization: 'Community Center'
  },
  {
    user_id: '550e8400-e29b-41d4-a716-446655440010',
    username: 'Green Market Official',
    email: 'market@greenmarket.com',
    role: 'donor',
    status: 'active',
    created_at: '2024-12-10T09:20:00Z',
    donations_count: 87,
    address: '789 Market St, Anytown, USA',
    phone: '(555) 345-6789',
    organization: 'Green Market'
  },
  {
    user_id: '550e8400-e29b-41d4-a716-446655440011',
    username: 'Fresh Bakery',
    email: 'contact@freshbakery.com',
    role: 'donor',
    status: 'active',
    created_at: '2024-12-15T11:30:00Z',
    donations_count: 65,
    address: '101 Bread Lane, Anytown, USA',
    phone: '(555) 456-7890',
    organization: 'Fresh Bakery'
  },
  {
    user_id: '550e8400-e29b-41d4-a716-446655440020',
    username: 'Food Pantry Network',
    email: 'help@foodpantry.org',
    role: 'beneficiary',
    status: 'active',
    created_at: '2024-11-05T10:15:00Z',
    claims_count: 124,
    address: '202 Charity Way, Anytown, USA',
    phone: '(555) 567-8901',
    organization: 'Food Pantry Network'
  },
  {
    user_id: '550e8400-e29b-41d4-a716-446655440021',
    username: 'Homeless Shelter',
    email: 'services@shelter.org',
    role: 'beneficiary',
    status: 'active',
    created_at: '2024-11-10T13:45:00Z',
    claims_count: 98,
    address: '303 Hope St, Anytown, USA',
    phone: '(555) 678-9012',
    organization: 'City Homeless Shelter'
  },
  {
    user_id: '550e8400-e29b-41d4-a716-446655440030',
    username: 'Inactive User',
    email: 'inactive@example.com',
    role: 'donor',
    status: 'inactive',
    created_at: '2025-02-01T09:00:00Z',
    donations_count: 3,
    address: '404 Gone St, Anytown, USA',
    phone: '(555) 789-0123',
    organization: 'Former Business'
  }
];

// Mock data for donations
export const mockDonations = [
  {
    donation_id: "d1a2b3c4-e5f6-7890-a1b2-c3d4e5f67890",
    donor_id: "550e8400-e29b-41d4-a716-446655440000",
    food_name: "Fresh Vegetables Assortment",
    quantity: 15,
    quantity_unit: "kg",
    food_type: "produce",
    expiry_date: "2025-05-20T00:00:00Z",
    pickup_address: "123 Main St, Anytown, USA",
    status: "available",
    created_at: "2025-05-01T14:30:00Z",
    updated_at: "2025-05-01T14:30:00Z",
    image_url: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    donation_id: "f6e7d8c9-b0a1-2345-f6e7-d8c9b0a12345",
    donor_id: "550e8400-e29b-41d4-a716-446655440000",
    food_name: "Canned Goods",
    quantity: 24,
    quantity_unit: "cans",
    food_type: "non-perishable",
    expiry_date: "2025-12-31T00:00:00Z",
    pickup_address: "123 Main St, Anytown, USA",
    status: "claimed",
    claimed_by: "550e8400-e29b-41d4-a716-446655440001",
    created_at: "2025-04-15T10:45:00Z",
    updated_at: "2025-04-16T08:20:00Z",
    image_url: "https://images.unsplash.com/photo-1584473457293-57140647d158?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FubmVkJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    donation_id: "a9b8c7d6-e5f4-3210-a9b8-c7d6e5f43210",
    donor_id: "550e8400-e29b-41d4-a716-446655440000",
    food_name: "Bakery Items",
    quantity: 30,
    quantity_unit: "items",
    food_type: "bakery",
    expiry_date: "2025-05-10T00:00:00Z",
    pickup_address: "123 Main St, Anytown, USA",
    status: "completed",
    claimed_by: "550e8400-e29b-41d4-a716-446655440001",
    created_at: "2025-05-08T16:00:00Z",
    updated_at: "2025-05-09T10:30:00Z",
    image_url: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFrZXJ5fGVufDB8fDB8fHww"
  }
];

// Mock reward data
export const mockRewards = {
  donor_id: "550e8400-e29b-41d4-a716-446655440000",
  points: 750,
  level: "Silver",
  rewards_available: [
    {
      reward_id: "r1e2w3a4-r5d6-7890-r1e2-w3a4r5d67890",
      name: "10% Discount at GreenGrocers",
      description: "Get 10% off your next purchase at GreenGrocers stores",
      points_required: 500,
      expires_at: "2025-12-31T00:00:00Z",
      partner: "GreenGrocers",
      image_url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JvY2VyeXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      reward_id: "r9e8w7a6-r5d4-3210-r9e8-w7a6r5d43210",
      name: "Free Coffee at EcoCafe",
      description: "Enjoy a free coffee at any EcoCafe location",
      points_required: 200,
      expires_at: "2025-08-31T00:00:00Z",
      partner: "EcoCafe",
      image_url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlfGVufDB8fDB8fHww"
    },
    {
      reward_id: "r5e4w3a2-r1d0-9876-r5e4-w3a2r1d09876",
      name: "Sustainability Workshop",
      description: "Free entry to the upcoming sustainability workshop",
      points_required: 1000,
      expires_at: "2025-06-30T00:00:00Z",
      partner: "EcoEducation",
      image_url: "https://images.unsplash.com/photo-1544928147-79a2dbc1f373?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3Nob3B8ZW58MHx8MHx8fDA%3D"
    }
  ],
  rewards_redeemed: [
    {
      reward_id: "r7e6w5a4-r3d2-1098-r7e6-w5a4r3d21098",
      name: "Reusable Produce Bags",
      description: "Set of 5 reusable mesh produce bags",
      points_required: 350,
      redeemed_at: "2025-04-10T09:15:00Z",
      partner: "EcoEssentials",
      image_url: "https://images.unsplash.com/photo-1610411083065-94517f22df47?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmV1c2FibGUlMjBiYWdzfGVufDB8fDB8fHww"
    }
  ]
};

// Donation impact data
export const mockDonorImpact = {
  donor_id: "550e8400-e29b-41d4-a716-446655440000",
  total_donations: 27,
  total_food_donated_kg: 342,
  total_meals_provided: 1026,
  carbon_footprint_saved_kg: 684,
  monthly_stats: [
    { month: "Jan", donations: 3, kg: 45 },
    { month: "Feb", donations: 2, kg: 30 },
    { month: "Mar", donations: 4, kg: 52 },
    { month: "Apr", donations: 6, kg: 78 },
    { month: "May", donations: 12, kg: 137 }
  ]
};

// Food categories
export const foodCategories = [
  { value: "produce", label: "Fresh Produce" },
  { value: "bakery", label: "Bakery Items" },
  { value: "dairy", label: "Dairy Products" },
  { value: "meat", label: "Meat & Poultry" },
  { value: "pantry", label: "Pantry Items" },
  { value: "meals", label: "Prepared Meals" },
  { value: "non-perishable", label: "Non-Perishable" },
  { value: "beverages", label: "Beverages" },
  { value: "other", label: "Other" }
];
