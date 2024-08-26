export interface AppInfo {
  name: string;
  image: {
    label: string;
    attributes: {
      height: string;
    };
  }[];
  summary: string;
  artist: string;
  id: string;
  category: string;
  artistId: number;
  artistName: string;
  genres: string[];
  price: string;
  description: string;
  userRatingCount: number;
  averageUserRating: number;
}

export interface ApiAppInfo {
  "im:name": {
    label: string;
  };
  "im:image": {
    label: string;
    attributes: {
      height: string;
    };
  }[];
  summary: {
    label: string;
  };
  "im:artist": {
    label: string;
  };
  id: {
    label: string;
    attributes: {
      "im:id": string;
    };
  };
  category: {
    attributes: {
      label: string;
    };
  };
  "im:price": {
    label: string;
    attributes: {
      amount: string;
      currency: string;
    };
  };
}

export interface AppListResponse {
  feed: {
    entry: ApiAppInfo[];
  };
}

export interface ApiAppDetailInfo {
  trackId: number;
  trackName: string;
  artistId: number;
  artistName: string;
  genres: string[];
  price: number;
  description: string;
  userRatingCount: number;
  averageUserRating: number;
}

export interface AppDetailResponse {
  resultCount: number;
  results: ApiAppDetailInfo[];
}
