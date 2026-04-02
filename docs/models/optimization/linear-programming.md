# 线性规划模型

> 数学建模中的“瑞士军刀”。

线性规划是研究线性约束条件下线性目标函数的极值问题的数学理论和方法。

## 核心算法
- **单纯形法**
- **内点法**

## 数学表达
线性规划的标准形式如下：
$$
\begin{aligned}
\min & \quad c^T x \\
\text{s.t.} & \quad Ax = b \\
& \quad x \ge 0
\end{aligned}
$$

## 常用工具
::: tip 提示
在比赛中，推荐使用 `Python` 的 `scipy.optimize` 库或者 `MATLAB` 的 `linprog` 函数。
:::