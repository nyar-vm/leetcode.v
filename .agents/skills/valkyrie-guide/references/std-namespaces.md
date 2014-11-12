# std 集合命名空间

集合类型统一在 **`std.collection`**（单数）。

| 典型类型                                        | 说明           |
|-------------------------------------------------|----------------|
| `ArrayList`、`Array`                            | 动态/固定数组  |
| `HashMap`、`HashSet`、`Deque`、`Queue`、`Stack` | 哈希与序列容器 |
| `OrderedMap`、`BTreeMap`、`SortedMap`           | 有序映射       |
| `Map`、`Set`                                    | trait 与抽象   |

源码目录：`valkyrie.v/projects/std/source/collection/`。`using std::collection::*` 导入。

与 **下标 ordinal/cardinal** 无关，见 [indexing.md](indexing.md)。
