export const CURRENT_SEARCH = "CURRENT_SEARCH";

//Array<Record<string, unknown>>

//change these to search
export interface ISearchActions {
  type: string;
  payload: ISearchState;
}

export interface ISearchState {
  tracks: trackState;
}

export interface trackState {
  href: string;
  items: Array<IindividualSongProps>;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

// export interface IindividualSongProps {
//   song :songProps
//}

export interface IindividualSongProps {
  album: albumProps;
  available_markets: Array<string>;
  disc_number: number;
  explicit: boolean;
  duration_ms: number;
  href: string;
  id: string;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  is_local: boolean;
  popularity: number;
  track_number: number;
  is_playable: boolean;
  name: string;
  preview_url: string;
  uri: string;
}

interface albumProps {
  images: Array<{
    height: number;
    url: string;
    width: number;
  }>;
  name: string;
  album_type: string;
  artists: Array<string>;
  release_date: string;
  release_data_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}
