export interface MoviePreview {
  id: number;
  title: string;
  year: number;
  poster: string;
}

export interface MovieDetail extends MoviePreview {
  genre: string[];
  rating: number;
  description: string;
}

export interface MovieFull extends MovieDetail {
  director: string;
  duration: string;
  cast: string[];
}
