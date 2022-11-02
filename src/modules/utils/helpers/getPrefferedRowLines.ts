import { UserPreferenciesModel } from "modules/user/models/user-preferencies.model";

export default function getPreferedRowLines(
  property: keyof UserPreferenciesModel
) {
  const userPreferences = JSON.parse(
    localStorage.getItem("user-preferencies") as string
  ) as UserPreferenciesModel;
  return userPreferences[property] as number;
}
