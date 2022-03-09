import { AddressData, GeocodingResponse } from "../types/interfaces";

export const AddresFormater = (location: GeocodingResponse) => {
  let data:AddressData = {
    street:'',
    numExt:'',
    numInt:null,
    suburb:'',
    town:'',
    zip:'',
    city:'',
    state:'',
    country:''
  }
  for (let i = 0; i < location.address_components.length; i++) {
    for (let j = 0; j < location.address_components[i].types.length; j++) {
      switch (location.address_components[i].types[j]) {
        case "street_number":
          data.numExt = Number(location.address_components[i].long_name)
          break;
        case "route":
          data.street = location.address_components[i].long_name;
          break;
        case "locality":
          data.city = location.address_components[i].long_name;
          data.town = location.address_components[i].long_name;
          break;
        case "sublocality":
          data.suburb = location.address_components[i].long_name;
          break;
        case "administrative_area_level_1":
          data.state = location.address_components[i].long_name;
          break;
        case "country":
          data.country = location.address_components[i].long_name;
          break;
        case "postal_code":
          data.zip = location.address_components[i].long_name;
          break;
      }
    }
  }
  return data;
};
