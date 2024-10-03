import { SVGProps } from "react";

export const POST_STATUS = {
  BASIC: "BASIC",
  PREMIUM: "PREMIUM",
} as const;

export const USER_ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IUser {
  _id: string;
  name: string;
  role: keyof typeof USER_ROLE;
  email: string;
  status: string;
  profilePhoto: string;
  followers: [];
  following: [];
  isVerified: boolean;
  postCount: number;
  totalUpvote: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPost {
  title: string;
  category:
    | "Adventure"
    | "Business Travel"
    | "Exploration"
    | "Family Travel"
    | "Luxury Travel"
    | "Budget Travel";
  description: string; // HTML template in string format
  image: string;
  postAuthor: string;
  upvote: number;
  downvote: number;
  status: keyof typeof POST_STATUS;
  createdAt?: Date;
}

export interface ICreatePostData {
  title: string;
  category: string;
  description: string;
  image: string;
  status: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  profilePhoto: string;
}

export interface IComment {
  text: string;
  email: string;
  user: string;
  post: string;
}

export interface IUpdateComment {
  text: string;
}
