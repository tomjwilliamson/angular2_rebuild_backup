export interface AirportLocationsModel {
  locations: Array<AirportLocationsItem>;
}
export interface AirportLocationsItem {
  locationId: String;
  type: Number;
  name: String;
  shortName: String;
  geoCoord: {
    latitude: Number;
    longitude: Number;
  };
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
