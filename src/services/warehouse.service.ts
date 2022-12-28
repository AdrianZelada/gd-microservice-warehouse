import axios from "axios";


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



function buyInStore(ingredients: any, itemsMissing: any, cbBought: Function ,cbResult: Function, ind=0){
    if(itemsMissing.length > ind){
        axios.get(`http://${process.env.URL_MARKETPLACE}:${process.env.URL_MARKETPLACE_PORT}/sell`).then((result)=>{
            console.log(`${itemsMissing[ind]}`, result.data.count);
            if(result.data.count > 0) {
                cbBought({
                    ingredient: itemsMissing[ind],
                    quantitySold: result.data.count,
                })                
                ingredients[itemsMissing[ind]] = ingredients[itemsMissing[ind]] + result.data.count;
                buyInStore(ingredients,itemsMissing,cbBought,cbResult,ind + 1);                                
            } else {
                buyInStore(ingredients,itemsMissing,cbBought,cbResult,ind);
            }
        })
    } else {
        cbResult(ingredients);
    }
}

export const buildOrder = (recipe: any, ingredients: any,cbBought: Function, cbResult: Function) =>{
    let mIngredients = missingIngredients(recipe, ingredients);

    console.log("mIngredients");
    console.log(mIngredients);
     
    if(mIngredients.length > 0) {
        buyInStore(ingredients,mIngredients, cbBought, (newIng:any) =>{
            buildOrder(recipe, newIng, cbBought, cbResult);
        });
    } else {
        const newIngredients = takeOutIngredients(recipe, ingredients);
        cbResult(newIngredients);
    }
}