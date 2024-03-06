export interface Pet {
    id: number;
    name: string;
    // other properties
}



export class Pet{
    id: number;
    category: {id: number, name:string};
    name: string;
    photourl: {url: string} ;
    tags: [{id: number, name: string}];
    status: string;

    constructor(data: any){
        this.id = data.id;
        this.category = data.category;
        this.name = data.name;
        this.photourl = data.photourl;
        this.tags = data.tags;
        this.status = data.status;
    }
}