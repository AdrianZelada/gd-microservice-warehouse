import { Request, Response, Router } from "express";
import { IngredientsService } from "../services/ingredients.service";
import { PurchaseHistoryService } from "../services/purchase_history.service";
import { buildOrder } from "../services/warehouse.service";

export default function WarehouseRoute(router: Router) {

    router.post('/', async (req: Request, res: Response) => {
        const ing = req.body.ingredients;
        const orderId = req.body.orderId;
        console.log("warehouse");
        console.log(ing)
        console.log(orderId)
        const ingredientsService = IngredientsService.getInstance();
        const ingredientStore = await ingredientsService.get(); 
        const purchaseHistoryService = PurchaseHistoryService.getInstance();
        buildOrder(ing, ingredientStore, (data:any) =>{
            console.log(data);
            purchaseHistoryService.add({
                ...data,
                orderName: orderId
            }).then(( pHistory: any)=>{
                console.log("pHistory");
                console.log(pHistory);
            })
        }, (stock: any)=> {
            ingredientsService.update(stock);
            console.log('responseeeeee ', orderId);
            res.json({
                orderId
            });
        })
    });
    
    return router;
}


const takeOutIngredients = (recipe: any, ingredients: any)=>{
    for(const key in recipe) {
        ingredients[key] = ingredients[key] - recipe[key];        
    }
    return ingredients;
}