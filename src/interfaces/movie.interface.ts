export interface IMovie {
  title: string;
  description: string;
  duration: string;
  top: number;
  status: string;
  genre: string;
  image: string | undefined;
  actorsId: object[];
  reviews: object[];
}