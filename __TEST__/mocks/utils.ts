// 型からスタブを作成する 便利関数
// https://medium.com/@john_oerter/simple-typescript-stubs-5bc9fdf0b808
export function stub<T>(partial?: Partial<T>): T {
  return partial != null ? (partial as T) : ({} as T);
}
