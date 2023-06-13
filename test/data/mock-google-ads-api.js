class MockGoogleAdsApi {
  constructor() {
    this.Customer = jest.fn(() => {
      return {
        report: jest.fn(() => {
          return Promise.resolve([
            {
              "campaign.id": "1",
              "campaign.name": "Campaign 1",
              "campaign.labels": ["Label 1", "Label 2"],
              "metrics.cost_micros": 5000000,
            },
            {
              "campaign.id": "2",
              "campaign.name": "Campaign 2",
              "campaign.labels": ["Label 3"],
              "metrics.cost_micros": 3000000,
            },
            {
              "campaign.id": "3",
              "campaign.name": "Campaign 3",
              "campaign.labels": ["Label 1", "Label 3"],
              "campaign.cost_micros": 8000000,
            },
          ]);
        }),
      };
    });
  }
}

module.exports = {
  GoogleAdsApi: MockGoogleAdsApi,
};
