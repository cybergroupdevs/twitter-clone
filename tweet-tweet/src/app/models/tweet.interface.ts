import { IUser } from "./user.interface";

export interface IContent{
  tags: string[],
  mentions: string[],
  text: string,
  imageURL: string
}

interface Iuser{
  profileImageURL: string,
  _id: string,
  name: string,
  userhandle: string
}

export interface ITweet {
  content: IContent,
  date: Date,
  commentCount: number,
  likeCount: number,
  retweetCount: number,
  _id: string,
  user: Iuser
}
