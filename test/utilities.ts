import * as sdk from "../src/api/Contacts"
import * as https from "https";

export function generateSdk(): sdk.Api<sdk.ApiConfig> {
    return new sdk.Api({
      httpsAgent: new https.Agent({rejectUnauthorized: false})
    });
  }