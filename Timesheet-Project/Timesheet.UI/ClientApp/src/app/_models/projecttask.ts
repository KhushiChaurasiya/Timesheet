export class ProjectTask {
    id?: number;
    taskName?: string;
    taskDescription?: string;
    projectId?:number;
    estimationhrs?:string;
    startDate?:Date;
    endDate?:Date;
    createdBy?:string;
    createdOn?:Date;
    projects?:Project;
}

export class Project {
    id?: number;
    name?: string;
    description?: string;
    startDate?:Date;
    endDate?:Date;
    createdBy?:string;
    createdOn?:Date;
}