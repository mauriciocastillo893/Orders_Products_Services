import { CreateOrderUseCase } from "../Application/UseCases/Order/CreateOrderUseCase";
import { DeleteOrderUserCase } from "../Application/UseCases/Order/DeleteOrderUseCase";
import { GetAllOrdersUseCase } from "../Application/UseCases/Order/GetAllOrdersUseCase";
import { GetOrderByIDUseCase } from "../Application/UseCases/Order/GetOrderByIDUseCase";
import { UpdateOrderUseCase } from "../Application/UseCases/Order/UpdateOrderUseCase";
import { CreateOrderController } from "./Controllers/Orders/CreateOrderController";
import { DeleteOrderController } from "./Controllers/Orders/DeleteOrderController";
import { GetAllOrdersController } from "./Controllers/Orders/GetAllOrdersController";
import { GetOrderByIDController } from "./Controllers/Orders/GetOrderByIDController";
import { UpdateOrderController } from "./Controllers/Orders/UpdateOrderController";
import { MYSQL_OrderRepositoryImpl } from "./Repositories/Orders/MySQL_OrderRepositoryImpl";

// Repositories
const mySqlDB = new MYSQL_OrderRepositoryImpl();

// Usecases
const getOrderByIDUseCase = new GetOrderByIDUseCase(mySqlDB);
const getAllOrdersUseCase = new GetAllOrdersUseCase(mySqlDB);
const createOrderUseCase = new CreateOrderUseCase(mySqlDB);
const updateOrderUserCase = new UpdateOrderUseCase(mySqlDB);
const deleteOrderUserCase = new DeleteOrderUserCase(mySqlDB);

// Controllers
export const getOrderByIDController = new GetOrderByIDController(getOrderByIDUseCase);
export const getAllOrdersController = new GetAllOrdersController(getAllOrdersUseCase);
export const createOrderController = new CreateOrderController(createOrderUseCase);
export const updateOrderController = new UpdateOrderController(updateOrderUserCase);
export const deleteOrderController = new DeleteOrderController(deleteOrderUserCase);