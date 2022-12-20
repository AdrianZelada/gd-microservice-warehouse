import { Request, Response, Router } from "express";
import { IngredientsService } from "../services/ingredients.service";

export default function WarehouseRoute(router: Router) {

    router.post('/', async (req: Request, res: Response) => {
        const ing = req.body;        
        const ingredientsService = IngredientsService.getInstance();
        const ingredientStore = await ingredientsService.get();        
        const missingIng = missingIngredients(ing, ingredientStore);
        if(missingIng.length > 0 ) {

        } else {
            const newStock = takeOutIngredients(ing, ingredientStore);
            ingredientsService.update(newStock);
            res.json(newStock);
        }
    });
    
    return router;
}

const missingIngredients = (recipe: any, ingredients: any)=>{
    const missing = [];
    for(const key in ingredients) {
        const value = ingredients[key] - recipe[key] ;        
        if(value <= 0) {
            missing.push(key);
        }
    }
    return missing;
}

const takeOutIngredients = (recipe: any, ingredients: any)=>{
    for(const key in recipe) {
        ingredients[key] = ingredients[key] - recipe[key];        
    }
    return ingredients;
}