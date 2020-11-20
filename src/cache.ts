import NodeCache from "node-cache";

class Cache {
  private readonly cache: NodeCache;

  constructor(ttlSeconds: number) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false
    });
  }

  get(key: string, defaultValue: unknown): unknown {
    const value = this.cache.get(key);
    if (value) {
      return value;
    }

    this.cache.set(key, defaultValue);
    return defaultValue;
  }

  set(key: string, value: unknown): void {
    this.cache.set(key, value);
  }

  del(key: string): void {
    this.cache.del(key);
  }

  flush(): void {
    this.cache.flushAll();
  }
}

export default Cache;
