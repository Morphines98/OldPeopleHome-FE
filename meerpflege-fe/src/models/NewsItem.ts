export interface NewsItem {
  id: number;
  title: string;
  content: string;
  homeId: number;
  forAllGroups: boolean | null;
  groupId: number | null;
  isDeleted: boolean;
  addedDate: string;
  newsItemAttachments: NewsItemAttachment[] | null;
}

export interface NewsItemAttachment {
  id: number;
  name: string;
  url: string;
}
