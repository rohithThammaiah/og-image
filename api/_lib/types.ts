export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    theme: Theme;
    md: boolean;
    fontSize: string;
    images: string[];
    widths: string[];
    heights: string[];
}

export interface ActivityRequest {
    activityId: string;
}

export interface ActivityDetails {
    activityId: string;
    location: string;
    date: string;
    time: string;
    hostInfo: UserInfo;
}

export interface UserInfo {
    userId: string;
    profilePic: string;
    name: string;
}