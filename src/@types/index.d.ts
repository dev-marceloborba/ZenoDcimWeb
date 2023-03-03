import { RouteObject as R } from "react-router-dom";
import { BreadcrumbData } from "use-react-router-breadcrumbs";

declare module "react-router-dom" {
  export interface RouteObject extends R {
    title?: string;
    parameter?: string;
    resolver?(data: BreadcrumbData): JSX.Element | null | undefined;
    validatePermission?(permission: any): boolean;
  }
}
