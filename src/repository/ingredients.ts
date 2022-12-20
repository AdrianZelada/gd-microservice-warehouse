const { DataTypes } = require("sequelize");

export class IngredientModel {

    connection: any = null;
    model: any = null;

    constructor(connection: any){
        this.connection = connection;
        this.model = this.connection.define('ingredient', {         
            id:{
                type: DataTypes.STRING,
                primaryKey: true
            },   
            tomato:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            lemon:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            potato:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            rice:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            ketchup:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            lettuce:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            onion:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            cheese:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            meat:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            chicken:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
        },{
            createdAt: false,
            updatedAt: false,
        });
    }

    async update(ingredients: any) {
        return this.model.update({
            ...ingredients
        },{
            where:{
                id:1
            }
        });
    }

    async get(){
        const response =  await this.model.findAll({
            where: {
                id: 1
            }
        });
        const ingre = JSON.parse(JSON.stringify(response));
        return  ingre[0];
    }

}