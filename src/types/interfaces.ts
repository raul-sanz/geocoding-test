export interface Window {
  width: undefined | any;
  height: undefined | any;
}

export interface GeocodingResponse {
  types: Array<string>;
  formatted_address: string;
  address_components: [
    {
      short_name: string;
      long_name: string;
      postcode_localities: Array<string>;
      types: Array<string>;
    }
  ];
  partial_match: boolean;
  place_id: string;
  postcode_localities: Array<string>;
  geometry: {
    location: any;
    location_type: any;
    viewport: any;
    bounds: any;
  };
}

interface PredictionSubstring{
  length:number,
  offset:number
}

interface PredictionTerm{
  offset:number,
  value:string
}

interface StructuredFormatting{
  main_text:  string
main_text_matched_substrings:  Array<PredictionSubstring>
secondary_text:string
}

export interface AutocompletePredictions {
  description: string;
  matched_substrings: Array<PredictionSubstring>;
  place_id: string;
  structured_formatting: StructuredFormatting;
  terms: Array<PredictionTerm>;
  types: Array<string>;
  Type?: number;
}

export interface SuggestionsListProps{
  data: AutocompletePredictionsArray
  onSelect:(val:AutocompletePredictions)=>void
}

export interface OnSelectPlaceProps{
  onSelectPlace:(val:GeocodingResponse)=>void
}

export interface AddressData {
  street:string,
  numExt:number|string,
  numInt?:number|string,
  suburb:string,
  town:string,
  zip:string,
  city:string,
  state:string,
  country:string
}

export interface AddressDataProps{
  data:AddressData
}

export interface GeocodingArrayResponse extends Array<GeocodingResponse> {}


export interface AutocompletePredictionsArray extends Array<AutocompletePredictions> {}


