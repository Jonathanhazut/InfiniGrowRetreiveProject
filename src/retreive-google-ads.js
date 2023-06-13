const { GoogleAdsApi, enums } = require("google-ads-api");

function authenticateGoogleAdsClient(credentials) {
  return new GoogleAdsApi({
    client_id: credentials.client_id,
    client_secret: credentials.client_secret,
    developer_token: credentials.developer_token,
  });
}

async function retrieveFromGoogleAds(customerId, sinceDate, endDate, credentials) {
  const googleAdsClient = authenticateGoogleAdsClient(credentials);

  if (!googleAdsClient) {
    throw new Error(`Authentication for ClientId: ${credentials.client_id} with developer token: ${credentials.developer_token} has failed`);
  }

  const customer = googleAdsClient.Customer({
    customer_id: customerId,
    refresh_token: credentials.refresh_token,
  });

  let campaigns = [];

  try {
    campaigns = await customer.report({
      entity: "campaign",
      attributes: ["campaign.id", "campaign.labels"],
      metrics: ["metrics.cost_micros"],
      segments: ["segments.date"],
      from_date: sinceDate,
      to_date: endDate,
      constraints: {
        "campaign.status": enums.CampaignStatus.ENABLED,
      },
    });

    return campaigns;
  } catch (error) {
    throw new Error(`Error during campaign retrieval: ${error}`);
  }
}

module.exports = { retrieveFromGoogleAds, authenticateGoogleAdsClient };
