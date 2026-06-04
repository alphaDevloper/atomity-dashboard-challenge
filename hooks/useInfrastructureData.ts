"use client";

import { useQuery } from "@tanstack/react-query";
import type { DummyJsonResponse, DummyUser } from "../types/dashboard";

const USERS_ENDPOINT = "https://dummyjson.com/users?limit=40&skip=0";

async function fetchUsers(): Promise<DummyUser[]> {
  const res = await fetch(USERS_ENDPOINT);
  if (!res.ok) throw new Error(`Failed to fetch users: HTTP ${res.status}`);
  const data: DummyJsonResponse = await res.json();
  return data.users;
}

export const QUERY_KEY = ["infrastructure-users"] as const;

export function useInfrastructureData() {
  return useQuery<DummyUser[], Error>({
    queryKey: QUERY_KEY,
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes — no redundant requests
    gcTime: 10 * 60 * 1000, // 10 minutes — keep in cache after unmount
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
  });
}
