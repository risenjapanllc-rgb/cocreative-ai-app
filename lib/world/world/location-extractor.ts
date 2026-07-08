import { Location } from "../world-model";

export function buildLocations(
  environmentBible: unknown
): Location[] {
  if (!environmentBible) {
    return [];
  }

  // TODO:
  // environmentBible から Location[] を抽出する。
  // 今は責務分離のため、入口だけ作る。
  return [];
}