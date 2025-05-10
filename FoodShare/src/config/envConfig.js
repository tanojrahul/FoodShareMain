/**
 * Environm    // Local development (uses MSW for mocking API)
    development: {
      BASE_URL: '/api/v1',  // Changed to relative URL for proxy support
      TIMEOUT: 10000, // 10 seconds
      MOCK_ENABLED: trueonfiguration for FoodShare application
 * This file centralizes environment-specific settings
 */
import { env } from '../utils/environmentUtils';

// Determine current environment
const NODE_ENV = env.get('NODE_ENV', 'development');

// Environment Variables
const ENV = {
  // Current environment (development, staging, production)
  NODE_ENV,
  
  // API configuration
  API: {
    // Local development (uses MSW for mocking API)
    development: {
      BASE_URL: 'https://kvfdgmhh-2016.inc1.devtunnels.ms/api/v1',  // Using relative URL for proxy support
      TIMEOUT: 15000, // 10 seconds
      MOCK_ENABLED: true
    },
    
    // Staging environment
    staging: {
      BASE_URL: 'https://staging-api.foodshare.example.com/api/v1',
      TIMEOUT: 15000, // 15 seconds
      MOCK_ENABLED: false
    },
    
    // Production environment
    production: {
      BASE_URL: 'https://api.foodshare.example.com/api/v1',
      TIMEOUT: 20000, // 20 seconds
      MOCK_ENABLED: false
    }
  },
  
  // Feature flags - enable/disable features based on environment
  FEATURES: {
    REWARDS_ENABLED: true,
    MAP_VIEW_ENABLED: true,
    ANALYTICS_ENABLED: true,
    NOTIFICATIONS_ENABLED: true
  }
};

// Get current environment config
export const getCurrentEnvConfig = () => {
  return ENV.API[NODE_ENV] || ENV.API.development;
};

// Export environment variables
export default {
  ENV,
  getCurrentEnvConfig,
  // Current active configuration (based on environment)
  CURRENT: getCurrentEnvConfig(),
  // Feature flags
  FEATURES: ENV.FEATURES
};
