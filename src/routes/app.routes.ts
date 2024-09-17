import express from "express";
import { todoController } from "../controllers/todo.controllers";
import { userController } from "../controllers/user.controller";
import { tokenController } from "../controllers/token.controller"
import { ecsController } from "../controllers/ecs.controller";
// import { auth } from '../controllers/auth.controller';
import { auth } from "../controllers/auth.controller";
import e from "express";


const routes = express.Router();

// routes.route('/').post(todoController.createTodo).get(todoController.getTodos);
// routes.route('/:id').get(todoController.getSingleTodo).patch(todoController.updateTodo).delete(todoController.deleteTodo);

routes.get('/user/getsign', userController.userGetSign)

routes.post('/user/gettoken', userController.userGetToken);
// routes.get('/user/list', auth, userController.userList);

routes.get('/ecs/en_flow_diagram', auth, ecsController.energyFlow);
routes.get('/ecs/site_list', auth, ecsController.getSiteList);
routes.get('/ecs/lastest', auth, ecsController.getLastest);
routes.get('/ecs/history', auth, ecsController.getHistory);
routes.get('/ecs/device_list', auth, ecsController.getDeviceList);

routes.get('/ecs/site_info_all', auth, ecsController.getSiteInfoAll);
routes.get('/ecs/site_info', auth, ecsController.getSiteInfo);
routes.get('/ecs/summary_power', auth, ecsController.getSummaryPower);
routes.get('/ecs/energy_comparison', auth, ecsController.getEnergyComparison);
routes.get('/ecs/power_distribution', auth, ecsController.getPowerDistribution);
routes.get('/ecs/daily_analysis', auth, ecsController.getDailyAnalysis);
routes.get('/ecs/daily_dc_power', auth, ecsController.getDailyDcPower);
routes.get('/ecs/daily_temperature', auth, ecsController.getDailyTemperature);
routes.get('/ecs/simulator/lastprocess', auth, ecsController.getSimulator);
routes.get('/ecs/prediction', auth, ecsController.getPrediction);

export default routes