const { retrieveFromGoogleAds } = require('../src/retreive-google-ads');
const { GoogleAdsApi } = require('./data/mock-google-ads-api'); 
const mockData = require('./mockDataForTest.json');

describe('retrieveFromGoogleAds', () => {
  it('should retrieve campaigns with IDs, labels, and costs', async () => {
    const customerId = mockData.testUserCustomerId;
    const sinceDate = '2023-06-12';
    const endDate = '2023-06-13';
    const credentials = {
      client_id: mockData.web.client_id,
      client_secret: mockData.web.client_secret,
      developer_token: mockData.developer_token,
    };

    // Create the instance of MockGoogleAdsApi
    const mockGoogleAdsApi = new GoogleAdsApi(mockData.mockCampaigns);

    
    jest.mock('./retreive-google-ads', () => ({
      retrieveFromGoogleAds: jest.fn(async (customerId, sinceDate, endDate, credentials) => {
        return mockGoogleAdsApi.Customer();
      }),
    }));

    const campaigns = await retrieveFromGoogleAds(customerId, sinceDate, endDate, credentials);

    expect(campaigns).toBeDefined();
    expect(Array.isArray(campaigns)).toBe(true);

    campaigns.forEach((campaign, index) => {
      const mockCampaign = mockData.mockCampaigns[index];

      expect(campaign.id).toBe(mockCampaign['campaign.id']);
      expect(campaign.labels).toEqual(mockCampaign['campaign.labels']);
      expect(campaign.cost_micros).toBe(mockCampaign['metrics.cost_micros']);
    });
  });
});
