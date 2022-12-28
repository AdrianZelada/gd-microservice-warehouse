export class PurchaseHistoryService {
    static instance: PurchaseHistoryService;
    db: any;

    constructor(db: any) {
        if(PurchaseHistoryService.instance) {
            return PurchaseHistoryService.instance
        } else {
            this.db = db;            
            return this;
        }        
    }

    static configService(db: any) {
        PurchaseHistoryService.instance = new PurchaseHistoryService(db);
    }

    static getInstance() {        
        return PurchaseHistoryService.instance;
    }

    async add(history: any){
        return this.db.add(history);
    }

    async getAll() {
        return this.db.getAll();
    }
}
