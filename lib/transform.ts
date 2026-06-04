import type {
  DummyUser,
  DashboardItem,
  DashboardData,
  ClusterKey,
  AggregationLevel,
  NamespaceKey,
} from "../types/dashboard";

const NAMESPACE_KEYS: NamespaceKey[] = ["Alpha", "Beta", "Gamma", "Delta"];
const POD_LETTERS = ["A", "B", "C", "D"] as const;

/** Deterministic hash so data stays stable across renders */
function hashNum(str: string, min: number, max: number): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) & 0xffffffff;
  }
  return min + (Math.abs(h) % (max - min + 1));
}

/** Seeded pseudo-random generator */
function createSeededRng(seed: string) {
  let s = hashNum(seed, 1, 2_147_483_646);
  return () => {
    s = (s * 16_807) % 2_147_483_647;
    return (s - 1) / 2_147_483_646;
  };
}

function buildItem(
  user: DummyUser,
  index: number,
  seed: string,
  agg: AggregationLevel,
): DashboardItem {
  const rng = createSeededRng(`${seed}-${index}-${user.id}`);
  const cpu = Math.round(rng() * 900 + 40);
  const ram = Math.round(cpu * (0.4 + rng() * 0.4));
  const storage = Math.round(cpu * (0.05 + rng() * 0.12));
  const network = Math.round(rng() * 120 + 10);
  const gpu = Math.round(rng() * 600 + 30);
  const efficiency = Math.round(rng() * 85 + 10);
  const total = cpu + ram + storage + network + gpu;

  const nsName = user.company?.name?.split(" ")[0] ?? `NS${index + 1}`;

  return {
    id: `${seed}-${index}`,
    name: agg === "pods" ? `Pod ${POD_LETTERS[index]}` : `${nsName} NS`,
    label: agg === "pods" ? user.firstName : nsName,
    cpu,
    ram,
    storage,
    network,
    gpu,
    efficiency,
    total,
  };
}

export function transformToDashboardData(
  users: DummyUser[],
  cluster: ClusterKey,
  agg: AggregationLevel,
  namespace: NamespaceKey,
): DashboardData {
  const clusterIndex = { A: 0, B: 1, C: 2, D: 3 }[cluster];
  const nsIndex = NAMESPACE_KEYS.indexOf(namespace);
  const offset = clusterIndex * 8 + nsIndex * 2;

  // Pull 4 users for the 4 pods/namespaces
  const slice = Array.from({ length: 4 }, (_, i) => {
    const idx = (offset + i) % users.length;
    return users[idx];
  });

  const seedStr = `${cluster}-${agg}-${namespace}`;
  const items = slice.map((user, i) => buildItem(user, i, seedStr, agg));

  const grandTotal = items.reduce((a, d) => a + d.total, 0);
  const avgEfficiency = Math.round(
    items.reduce((a, d) => a + d.efficiency, 0) / items.length,
  );
  const topSpender = items.reduce((a, b) => (b.total > a.total ? b : a));

  return {
    cluster,
    agg,
    namespace,
    items,
    grandTotal,
    avgEfficiency,
    topSpender,
  };
}

export function formatUSD(n: number): string {
  return "$" + n.toLocaleString();
}

export function efficiencyVariant(e: number): "low" | "mid" | "high" {
  if (e < 30) return "low";
  if (e < 60) return "mid";
  return "high";
}

export { NAMESPACE_KEYS };
