import { SVGProps } from "react";

export const POST_TYPE = {
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
  planType: string;
  profilePhoto: string;
  followers: [];
  following: [];
  postCount: number;
  totalUpvote: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPost {
  _id?: string;
  title: string;
  category: "Tip" | "Story";
  description: string; // HTML template in string format
  image: string;
  postAuthor: string;
  upvote: number;
  downvote: number;
  planType: keyof typeof POST_TYPE;
  createdAt?: Date;
}

export interface ICreatePostData {
  title: string;
  category: string;
  description: string;
  image: string;
  planType: string;
}

export interface ISignup {
  name: string;
  email: string;
  password: string;
  profilePhoto?: string;
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
