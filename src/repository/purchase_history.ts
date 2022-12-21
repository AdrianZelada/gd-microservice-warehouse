const { DataTypes } = require("sequelize");

export class PurchaseModel {
    connection: any;
    model: any;

    constructor(connection: any){
        this.connection = connection;
        this.model = this.connection.define('purchase', {         
            id:{
                type: DataTypes.STRING,
                primaryKey: true
            },   
            ingredient:{
                type:DataTypes.STRING
            },
            quantitySold:{
                type:DataTypes.INTEGER
            },            
            orderName:{
                type:DataTypes.STRING
            },
        },{
            createdAt: false,
            updatedAt: false,
        });
    }

    async add(item: any) {        
        let id = uuidv4();
        let data = {
            ...item,
            id: id            
        };
        const value = await this.model.create({
            ...data
        })        
        return JSON.parse(JSON.stringify(value));
    }

    async getAll(){
        const response =  await this.model.findAll();
        return JSON.parse(JSON.stringify(response));
    }

}

function uuidv4() {
    return Math.random().toString(36).substring(2, 15);
    // Math.random().toString(36).substring(2, 15);
    }
  