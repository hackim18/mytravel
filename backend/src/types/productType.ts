import { UserType } from "./userType";

export interface ProductType {
  id: string;
  name: string;
  thumbnail: string;
  location: string;
  description: string;
  price: number;
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
  likes: UserType[];
}
