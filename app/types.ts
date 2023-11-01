export interface Athlete {
  id: number;
  username: string | null;
  resource_state: number;
  firstname: string;
  lastname: string;
  bio: string;
  city: string;
  state: string;
  country: string;
  sex: string;
  premium: boolean;
  summit: boolean;
  created_at: string;
  updated_at: string;
  badge_type_id: number;
  weight: number;
  profile_medium: string;
  profile: string;
  friend: any; // You might want to define a type for friend and follower
  follower: any;
}

export interface TokenResponse {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: Athlete;
  iat: number;
}

export type Plan = {
  id: string;
  name: string;
  mileData: MileData[];
  startTime: number;
};

export interface getPlansByUserId {
  getPlansByUserId: Plan[];
}

export interface GetPlansByUserId {
  data: getPlansByUserId;
}

export interface PlanProps {
  user: number;
  setPlans: Function;
  plans: GetPlansByUserId;
}

export type LatLng = [number, number];
export type Altitude = [number];
export type LatLngAltitude = [number, number, number];

export interface Feature {
  type: string;
  geometry: {
    type: string;
    coordinates: LatLngAltitude[];
  };
  properties: {
    id: number;
    name: string;
    mileData: MileData[];
  };
}

export type MileData = {
  index: number;
  elevationGain: number;
  elevationLoss: number;
};

export interface FeatureCollection {
  type: string;
  features: Feature[];
}

export interface MapViewProps {
  geoJson: GraphQLFeatureCollection;
}

export interface GraphQLFeatureCollection {
  data: GetGeoJsonBySortKey;
}

export interface GetGeoJsonBySortKey {
  getGeoJsonBySortKey: FeatureCollection;
}
