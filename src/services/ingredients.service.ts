// const { generateUuid } = require("../services/utils");

export class IngredientsService {
    static instance : IngredientsService;
    db:any;
    constructor(db :any) {
        if(IngredientsService.instance) {
            return IngredientsService.instance
        } else {
            this.db = db;            
            return this;
        }        
    }

    static configService(db: any) {
        IngredientsService.instance = new IngredientsService(db);
    }

    static getInstance() {        
        return IngredientsService.instance;

    }

    async update(ingredients: any){
        return this.db.update(ingredients);
    }

    async get() {
        return this.db.get();
    }
}
