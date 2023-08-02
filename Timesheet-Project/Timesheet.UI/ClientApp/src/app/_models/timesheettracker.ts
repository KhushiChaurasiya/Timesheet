export class TimesheetTracker {
    id?: number;
    taskId?: number;
    taskDescription?: string;
    projectId?:number;
    workplaceId?:number;
    reasonId?:number;
    dates?:Date;
    times?:string;
    createdBy?:string;
    isSubmitted?:boolean;
}
