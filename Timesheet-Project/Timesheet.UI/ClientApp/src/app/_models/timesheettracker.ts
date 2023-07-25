import { Time } from "@angular/common";

export class TimesheetTracker {
    id?: number;
    taskId?: number;
    taskDescription?: string;
    projectId?:number;
    workplaceId?:number;
    reasonId?:number;
    date?:Date;
    times?:Time;
    createdBy?:string;
    createdOn?:Date;
    isSaved?:boolean;
    isSubmitted?:boolean;
}