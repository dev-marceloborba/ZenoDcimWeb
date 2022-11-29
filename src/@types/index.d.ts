import { RouteObject as R } from "react-router-dom";

declare module "react-router-dom" {
  export interface RouteObject extends R {
    title?: string;
    parameter?: string;
    params?: any;
  }
}
