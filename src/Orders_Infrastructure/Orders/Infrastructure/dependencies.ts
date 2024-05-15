import { GetOrderByIDUseCase } from "../Application/UseCases/Order/GetOrderByIDUseCase";
import { GetOrderByIDController } from "./Controllers/GetOrderByIDController";
import { MYSQL_OrderRepositoryImpl } from "./Repositories/MySQL_OrderRepositoryImpl";

// Repositories
const mySqlDB = new MYSQL_OrderRepositoryImpl();

// Usecases
const getOrderByIDUseCase = new GetOrderByIDUseCase(mySqlDB);

// Controllers
export const getOrderByIDController = new GetOrderByIDController(getOrderByIDUseCase);