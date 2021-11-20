export interface Restaurant{
    backgroundImageURL: string,
    category: string,
    contact: {phone: string, formattedPhone: string, twitter: string},
    location: {address: string, cc: string, city: string, country: string, crossStreet: string, formattedAddress: Array<string>, lat: number, 
      lng: number, postcalCode: string, state: string},
    name: string
  }
  
  export interface ViewPort{
    latitude: number,
    longitude: number,
    width: string,
    height: string,
    zoom: number
  }