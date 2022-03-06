import { Role } from "../types/domain";
import * as blueRoles from "./blueRoles";
import * as redRoles from "./readRoles";
import * as grayRoles from "./grayRoles";
import { sharedRoles } from "./sharedRoles";

export const ALL_ROLES = ([] as Role[]).concat(
  Object.values(blueRoles),
  Object.values(redRoles),
  Object.values(grayRoles),
  sharedRoles
);

export function isSpy(role: Role): boolean {
  return ["blue-spy", "red-spy"].includes(role.id);
}

export function isRole(role: Role | undefined): role is Role {
  return !!role;
}

export const equivalentRoles = [
  ["red-bomber", "blue-president"],
  ["blue-daughter", "red-martyr"],
  ["red-cupid", "blue-eris"],
  ["red-dr-boom", "blue-tuesday-knight"],
  ["red-engineer", "blue-doctor"],
  ["red-tinkerer", "blue-nurse"],
];

const isPresent = <T>(value: T | undefined | null): value is T => !!value;

export const pairByEquivalentRoles = (roles: Role[]) =>
  equivalentRoles
    .map((ids) =>
      ids.map((id) => roles.find((r) => r.id === id)).filter(isPresent)
    )
    .filter((pair) => pair.length === 2);
