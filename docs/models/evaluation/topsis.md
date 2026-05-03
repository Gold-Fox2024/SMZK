---
title: 优劣解距离法
description: 一种根据有限个评价对象与理想化目标的接近程度进行排序的方法。
---

# TOPSIS（优劣解距离法）

> 理想解的排序方法

**TOPSIS** (Technique for Order Preference by Similarity to Ideal Solution，优劣解距离法) 由 C. L. Hwang 和 K. Yoon 于 1981 年首次提出，基于他们的著作《Multiple Attribute Decision Making: Methods and Applications》，是一种多目标决策分析中常用的综合评价方法。

相比于 AHP 层次分析法的主观打分，TOPSIS 更依赖于真实的客观数据，且对样本量和指标个数没有严格限制，在数据齐全的评价类问题中非常实用。

## 适用场景
- **绩效评估**：如医院医疗质量评价、企业员工考核。
- **方案优选**：如供应商选择、厂址选择。
- **综合排名**：如各省市经济发展水平排名、生态环境质量评价。

## 相关衍生
- **熵权 TOPSIS / AHP TOPSIS**：先用<span class="smzk-accent">熵权法</span>或 <span class="smzk-accent">AHP</span> 求指标权重，再用 TOPSIS 计算相对贴近度，是最常见的组合形式。
- **灰色关联 TOPSIS**：用<span class="smzk-accent">灰色关联度</span>刻画“形状相似性”，并与欧氏距离等信息综合，适合样本少、信息不完备的情形。
- **模糊 TOPSIS / 直觉模糊 TOPSIS**：将指标值表示为<span class="smzk-accent">模糊数</span>或<span class="smzk-accent">直觉模糊集</span>，处理“语言评价、不确定区间、犹豫度”等不确定信息。
- **混合 TOPSIS**：面向<span class="smzk-accent">混合型指标</span>（精确值、区间数、序数/语言变量等），在规范化、理想点构造与距离度量上做扩展。

## 模型原理
TOPSIS 方法的基本原理是：通过检测评价对象与**最优解**（正理想解）和**最劣解**（负理想解）的距离，来进行排序。若某评价对象最靠近正理想解，同时又最远离负理想解，则认为它是最好（最优）的备选方案。

## 主要步骤
假设有 $n$ 个评价对象，每个对象有 $m$ 个评价指标，构成原始数据矩阵 $X = (x_{ij})_{n \times m}$。

### 第1步：原始矩阵正向化

在实际问题中，指标通常有不同类型：
- **极大型指标**（效益型）：越大越好（如利润、成绩）。
- **极小型指标**（成本型）：越小越好（如成本、污染率）。
- **中间型指标**：越接近某个特定值越好（如水体PH值）。
- **区间型指标**：落在某个区间内最好（如人的体温）。

为了方便统一计算，首先需要将所有非极大型指标转化为**极大型指标**，这个过程称为**正向化**。

1. **极小型 $\rightarrow$ 极大型**
   $$
   \tilde{x}_{ij} = \max_i \{x_{ij}\} - x_{ij} \quad \text{或} \quad \tilde{x}_{ij} = \frac{1}{x_{ij}} \text{（当 } x_{ij}>0 \text{ 时）}
   $$
2. **中间型 $\rightarrow$ 极大型**（设最理想的值为 $x_{best}$）
   $$
   \tilde{x}_{ij} = 1 - \frac{|x_{ij} - x_{best}|}{M},\quad \text{其中 } M = \max_i \{|x_{ij} - x_{best}|\}
   $$
3. **区间型 $\rightarrow$ 极大型**（设最理想的区间为 $[a, b]$，令 $M = \max\{a - \min_i \{x_{ij}\}, \max_i \{x_{ij}\} - b\}$）
   $$
   \tilde{x}_{ij} = \begin{cases}
   1 - \dfrac{a - x_{ij}}{M}, & x_{ij} < a \\
   1, & a \le x_{ij} \le b \\
   1 - \dfrac{x_{ij} - b}{M}, & x_{ij} > b
   \end{cases}
   $$

经过正向化处理后，得到新的矩阵 $\tilde{X} = (\tilde{x}_{ij})_{n \times m}$，此时所有指标都是“越大越好”。

### 第2步：数据标准化与加权

为了消除不同指标之间量纲（单位）的影响，需要对正向化后的矩阵进行标准化（无量纲化）处理。TOPSIS 中最常用的是**向量归一化**（即除以该列元素的平方和的平方根）：

$$
z_{ij} = \frac{\tilde{x}_{ij}}{\sqrt{\sum_{i=1}^n \tilde{x}_{ij}^2}}
$$

得到标准化矩阵 $Z = (z_{ij})_{n \times m}$。

<details>
<summary>（可选）构造加权标准化矩阵</summary>

在实际问题中，各个指标的重要性往往不同。如果已知各指标的权重 $w=(w_1, w_2, \ldots, w_m)$（满足 $w_j\ge 0,\ \sum_{j=1}^m w_j=1$），我们需要将权重乘入标准化矩阵中，得到加权标准化矩阵 $V = (v_{ij})_{n \times m}$：

$$
v_{ij} = w_j \cdot z_{ij}
$$
</details>

> 若未给定权重，则默认各指标权重相等，直接取 $V = Z$ 进行后续计算即可。

### 第3步：确定正理想解与负理想解

在加权标准化矩阵 $V$ 中，找出每一列（即每个指标）的最大值和最小值，分别构成**正理想解** $V^+$ 和**负理想解** $V^-$：

- **正理想解**（所有指标的最优值组合）：
  $$
  V^+ = (V_1^+, V_2^+, \ldots, V_m^+) = (\max_{i} v_{i1}, \max_{i} v_{i2}, \ldots, \max_{i} v_{im})
  $$
- **负理想解**（所有指标的最劣值组合）：
  $$
  V^- = (V_1^-, V_2^-, \ldots, V_m^-) = (\min_{i} v_{i1}, \min_{i} v_{i2}, \ldots, \min_{i} v_{im})
  $$

### 第4步：计算距离与综合得分

计算第 $i$ 个评价对象与正理想解的欧氏距离 $D_i^+$，以及与负理想解的欧氏距离 $D_i^-$：

$$
D_i^+ = \sqrt{\sum_{j=1}^m (v_{ij} - V_j^+)^2}
$$
$$
D_i^- = \sqrt{\sum_{j=1}^m (v_{ij} - V_j^-)^2}
$$

最后，计算第 $i$ 个评价对象的**综合得分**（相对贴近度） $S_i$：

$$
S_i = \frac{D_i^-}{D_i^+ + D_i^-}
$$

- 显然，$0 \le S_i \le 1$。
- $S_i$ 越大，说明 $D_i^+$ 越小（越靠近最优解），$D_i^-$ 越大（越远离最劣解），该评价对象越优秀。
- 根据 $S_i$ 的大小对各评价对象进行降序排列，即可得到最终的评价结果。

::: tip 关于权重的来源
在上述流程中，如果权重 $w$ 是通过**熵权法**客观计算得出的，整个过程即为**熵权-TOPSIS**；如果是通过**层次分析法 (AHP)** 主观打分得出的，则为**AHP-TOPSIS**。这也是实际数学建模比赛中最常见、最实用的组合评价模型。
:::

## 优缺点与注意事项
- **优点**：思路直观、计算简单；能同时考虑 “接近最优” 和 “远离最劣”；对样本量与指标个数限制较少。
- **局限**：结果对标准化方式与权重较敏感；欧氏距离容易受极端值影响；默认指标相互独立、可比。
- **实践建议**：成本型指标要么先正向化、要么在理想解构造时用 “最小为正理想、最大为负理想”，避免重复处理；若某列全相等导致标准化分母为 0，可将该列标准化结果置为 0 并视为 “无区分力” 指标。

## 完整代码实现（Python / MATLAB）

下面给出一份可以直接复用的 TOPSIS 代码模板。

### Python（NumPy）

```python
import numpy as np
import io

def topsis_calculator(matrix_str, kinds):
    """
    计算 TOPSIS 综合评价得分及排名
    
    参数:
    matrix_str : str, 评估矩阵的字符串形式
    kinds      : list, 每一列指标的类型和参数
                 - 1: 极大型
                 - 2: 极小型
                 - 3: 中间型，例如 (3, 165) 表示最佳值为 165
                 - 4: 区间型，例如 (4, 90, 100) 表示最佳区间为 [90, 100]
    """
    # 1. 解析矩阵
    A = np.loadtxt(io.StringIO(matrix_str.strip()))
    X = A.copy()

    # 2. 指标正向化
    for i, k in enumerate(kinds):
        col = X[:, i]
        k_type = k[0] if isinstance(k, (list, tuple)) else k  # 获取指标大类
        
        if k_type == 2:   # 极小型
            X[:, i] = np.max(col) - col
        elif k_type == 3: # 中间型 (k[1] 为最优值)
            M = np.max(np.abs(col - k[1])) or 1
            X[:, i] = 1 - np.abs(col - k[1]) / M
        elif k_type == 4: # 区间型 (k[1] 为下限, k[2] 为上限)
            _, a, b = k
            M = max(a - np.min(col), np.max(col) - b) or 1
            X[:, i] = np.where(col < a, 1 - (a - col) / M, np.where(col > b, 1 - (col - b) / M, 1))

    # 3. 矩阵标准化 
    Z = X / np.sqrt(np.sum(X**2, axis=0))

    # 4. 计算距离与得分
    d_z = np.linalg.norm(Z - np.max(Z, axis=0), axis=1) # 距离正理想解
    d_f = np.linalg.norm(Z - np.min(Z, axis=0), axis=1) # 距离负理想解

    score = d_f / (d_z + d_f)
    Score_100 = 100 * score / np.sum(score)             # 归一化百分制得分

    # 5. 输出结果
    print("--- TOPSIS 评估结果 ---")
    for i, s in enumerate(Score_100):
        print(f"方案 {i+1} 得分: {s:.4f}")

    # argsort排序逻辑：加负号变降序，再argsort得到名次
    print(f"\n综合排名: {np.argsort(-Score_100) + 1}")
    
    return Score_100

if __name__ == "__main__":
    # TODO: 在此处手动输入或替换为你的评估矩阵
    matrix_str = """
    9  10 175 120
    8  7  164 80
    6  3  157 90
    """

    # TODO: 定义每一列指标的类型和参数
    kinds =[1, 2, (3, 165), (4, 90, 100)]
    
    topsis_calculator(matrix_str, kinds)
```

### MATLAB

```matlab
clc, clear;

% TODO: 请在此处手动输入评估矩阵 X
X = [
    9 10 175 120; 
    8 7  164 80; 
    6 3  157 90
];

% TODO: 定义每一列指标的类型和参数
% 1: 极大型
% 2: 极小型
% 3: 中间型，例如 [3, 165] 表示最佳值为165
% 4: 区间型，例如 [4, 90, 100] 表示最佳区间为[90, 100]
kinds = {1, 2, [3, 165], [4, 90, 100]};
% ====================================================

% --- 核心算法区 ---
[n, m] = size(X);
X_forward = X;

% 1. 指标正向化
for i = 1:m
    k = kinds{i};
    type = k(1);
    col = X(:, i);
    
    if type == 2       % 极小型
        X_forward(:, i) = max(col) - col;
    elseif type == 3   % 中间型
        M = max(abs(col - k(2)));
        X_forward(:, i) = 1 - abs(col - k(2)) / max(M, eps); % max(M, eps) 防止分母为0
    elseif type == 4   % 区间型
        a = k(2); b = k(3);
        M = max([a - min(col), max(col) - b]);
        M = max(M, eps); % 防止分母为0
        
        new_col = ones(n, 1); % 默认落在区间内，值为1
        new_col(col < a) = 1 - (a - col(col < a)) / M; % 小于下限的逻辑计算并替换
        new_col(col > b) = 1 - (col(col > b) - b) / M; % 大于上限的逻辑计算并替换
        X_forward(:, i) = new_col;
    end
end

% 2. 矩阵标准化
Z = X_forward ./ vecnorm(X_forward, 2, 1);

% 3. 计算距离与得分
D_P = vecnorm(Z - max(Z), 2, 2); % 距离正理想解的距离
D_N = vecnorm(Z - min(Z), 2, 2); % 距离负理想解的距离

% 4. 百分制得分
score = D_N ./ (D_P + D_N);
Score_100 = 100 * score / sum(score);

% 5. 综合排名排序
[~, rank_idx] = sort(Score_100, 'descend');
final_rank = zeros(n, 1);
final_rank(rank_idx) = 1:n;

% --- 输出结果 ---
disp('====== TOPSIS 评估结果 ======')
result_table = table((1:n)', Score_100, final_rank, 'VariableNames', {'方案', '百分制得分', '综合排名'});
disp(result_table)
```