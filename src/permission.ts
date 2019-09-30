import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Route } from "vue-router";
import { PermissionModule } from "@/store/modules/permission";

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to: Route, _: Route, next: any) => {
  // Start progress bar
  NProgress.start();
  if (PermissionModule.routes.length === 0) {
    PermissionModule.GenerateRoutes();
    router.addRoutes(PermissionModule.dynamicRoutes);
  }
  next();
});

router.afterEach((to: Route) => {
  // Finish progress bar
  NProgress.done();
  // set page title
  document.title = to.meta.title;
});
