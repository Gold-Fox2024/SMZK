---
title: 比赛实战：数据分析
description: 数学建模比赛中的数据处理与分析流程。
---

# 比赛实战：数据分析

在数学建模比赛中，数据分析是至关重要的一环。

## 流程
1. **数据清洗**：处理缺失值、异常值。
2. **特征工程**：构造新的特征，提升模型表现。
3. **可视化**：使用 `matplotlib`, `seaborn` 等工具。
4. **统计检验**：正态性检验、显著性检验。

## 常用代码 (Python)
```python
import pandas as pd
df = pd.read_csv('data.csv')
df.describe()
```
