export interface WallItem {
    id: number;
    title: string;
    description: string;
    stringDate: string;
    date: Date;
    wallItemAttachments: WallItemAttachment[] | null;
    groupId:number | null;
    forAllGroups: boolean | null;
    slide:string|undefined;

  }

  export interface WallItemAttachment {
    id: number;
    name: string;
    url: string;
  }