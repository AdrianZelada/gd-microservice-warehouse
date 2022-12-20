import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as bodyParser from "body-parser";
// import kitchen from './routes/kitchen.route';

dotenv.config();
import MysqlConnection from './repository/connection';
import { IngredientModel } from './repository/ingredients';
import { IngredientsService } from './services/ingredients.service';
import WarehouseRoute from './routes/warehouse.route';

const ingredientModel = new IngredientModel(MysqlConnection);
IngredientsService.configService(ingredientModel)
const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use('/warehouse', WarehouseRoute(express.Router()));
app.listen(port, () => {
  console.log(`⚡️[server]: Server Warehouse is running at https://localhost:${port}`);
}); 
