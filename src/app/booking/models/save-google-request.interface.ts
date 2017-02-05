export interface SaveGoogleRequest {
  location: SaveGoogleLocationObject;
  userId: null;
  googlePlaceId: String;
}

export interface SaveGoogleLocationObject {
  locationId: String;
  dateTimeCreatedUTC: String;
  dateTimeModifiedUTC: String;
  type: Number;
  name: String;
  shortName?: String;
  geoCoord: Object;
  phoneNumber: String;
  addressLine1: String;
  addressLine2: String;
  addressLine3: String;
  addressTown: String;
  addressPostCode: String;
  addressCounty: String;
  addressCountry: String;
  locationContactEmail: String;
}
