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

export interface User {
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
  userId: string;
};

export interface getPlansByUserId {
  getPlansByUserId: Plan[];
}

export interface GetPlansByUserId {
  athlete: GetPlansByUserId | undefined;
  data: getPlansByUserId;
}

export interface UpdatePlanById {
  data: {
    updatePlanById: {
      success: Boolean;
    };
  };
}

export type Activity = {
  distance: number;
  id: string;
  start_date: number;
  name: string;
};

export type FetchActivities = {
  data: {
    getActivities: Activity[];
  };
};

export type CreatePlanFromGeoJson = {
  data: {
    createPlanFromGeoJson: {
      success: boolean;
    };
  };
};

export type CreatePlanFromActivity = {
  data: {
    createPlanFromActivity: {
      success: boolean;
    };
  };
};

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
    lastMileDistance: number;
  };
}

export type MileData = {
  index: number;
  elevationGain: number;
  elevationLoss: number;
  pace: number;
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
