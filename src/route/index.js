import initWebRoutes from "./web.js";
import initApiRoutes from "./api.js";
import initAccountRoutes from "./accountRoutes.js";

const initAllRoutes = (app) => {
  // Gọi lần lượt từng router
  initWebRoutes(app);
  initApiRoutes(app);
  initAccountRoutes(app);
};

export default initAllRoutes;
