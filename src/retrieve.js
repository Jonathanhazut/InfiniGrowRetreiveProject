const { retrieveFromGoogleAds } = require("./retreive-google-ads");

const retrieveByModuleMethods = {
  "GoogleAds": retrieveFromGoogleAds,
  // "FacebookAds": retrieveFromFacebookAds,
  // "LinkedInAds": retrieveFromLinkedInAds,
};

async function retrieve(moduleName, customerId, sinceDate, endDate, credentials) {
  const retrieveMethod = retrieveByModuleMethods[moduleName];

  if (!retrieveMethod) {
    throw new Error(`Unsupported module: ${moduleName}`);
  }

  const campaigns = await retrieveMethod(customerId, sinceDate, endDate, credentials);

  console.log(`Campaigns from ${moduleName}: ${JSON.stringify(campaigns)}`);
  return campaigns;
}

module.exports = { retrieve };
