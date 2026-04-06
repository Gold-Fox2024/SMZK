---
title: 层次分析法
description: 一种定性与定量相结合的、系统化、层次化的分析方法。
---

# 层次分析法 (AHP)

> 数学建模中的“入门必修课”

层次分析法，即 Analytic Hierarchy Process (AHP)，由美国运筹学家 Thomas L. Saaty 创立。通过将复杂问题分解为若干层次和若干因素，对两两指标之间的重要程度作出比较判断（主观），建立判断矩阵，通过计算判断矩阵的最大特征值以及对应特征向量，就可得出不同方案重要性程度的权重，为最佳方案的选择提供依据。其应用领域极为广泛，涵盖了商业管理、项目评估、资源分配、公共政策制定、供应链管理、环境风险评估乃至军事领域的冲突解决等多个方面。

## 适用场景
- **评价类问题**：如优秀论文评选、员工绩效考核。
- **选址类问题**：如工厂选址、物流中心布局。
- **风险评估**：如投资项目可行性分析。

## 模型原理
层次分析法要求将一个复杂、非结构化的决策问题，拆解成若干个更小、更易于理解和管理的组成部分，并将这些部分按照其内在的逻辑关系，组织成一个自上而下的层次结构模型。一个典型的层次分析法层次结构包含以下三个主要层面：
- **目标层**：位于层次结构的最顶端，代表决策的<span class="smzk-accent">最终目的</span>或<span class="smzk-accent">期望达成的结果</span>。
- **准则层**：位于中间层次，包含了用于评估备选方案优劣的一系列<span class="smzk-accent">标准</span>或<span class="smzk-accent">影响因素</span>。
- **方案层**：位于层次结构的最底层，包含了所有可供选择的<span class="smzk-accent">决策方案</span>或<span class="smzk-accent">行动路径</span>。

## 主要步骤

### 第1步：建立递阶层级结构模型
<p class="smzk-figref-line">把问题拆解为「目标层—准则层—方案层」的层次结构（见<a class="smzk-accent" href="#fig-ahp-hierarchy">图1</a>），并明确每一层包含的元素集合。</p>

<figure id="fig-ahp-hierarchy" class="smzk-figure">
  <img src="/assets/ahp-hierarchy.svg" alt="AHP 层次结构示意图" />
  <figcaption>图1 层次结构示意图</figcaption>
</figure>

### 第2步：构造出各层次中的所有判断矩阵
对同一层中的因素做两两重要性比较（通常用 1-9 标度法，见<a class="smzk-accent" href="#tbl-ahp-scale">表1</a>），构造判断矩阵 $A = (a_{ij})_{n \times n}$，其中 $a_{ij}$ 代表第 $i$ 个因素对第 $j$ 个因素的重要程度。

<div id="tbl-ahp-scale" class="smzk-table-center smzk-table-figure">

<div class="smzk-table-caption">表1 Saaty 的 1-9 标度法</div>

| 标度 | 含义 |
| --- | --- |
| 1 | 两个因素相比，具有同等重要性 |
| 3 | 两个因素相比，前者比后者稍微重要 |
| 5 | 两个因素相比，前者比后者明显重要 |
| 7 | 两个因素相比，前者比后者强烈重要 |
| 9 | 两个因素相比，前者比后者极端重要 |
| 2、4、6、8 | 上述相邻判断之间的中间值，表示重要性程度介于两者之间 |
| 倒数 | 如果因素 $i$ 与因素 $j$ 的比较值为 $a_{ij}$ ，则因素 $j$ 与因素 $i$ 的比较值为 $a_{ji}=\frac{1}{a_{ij}}$|

</div>

<details>
<summary>Eg：第1个因素比第4个因素明显重要</summary>

依据<a class="smzk-accent" href="#tbl-ahp-scale">表1</a>，当“第1个因素比第4个因素明显重要”时，可取 $a_{14}=5$，并满足互反性 $a_{41}=\frac{1}{5}$。

例如（只展示与第1、4个因素相关的元素）：

$$
\def\arraystretch{1.35}
A=\;\left(\, 
\begin{array}{c@{\qquad\qquad}c@{\qquad\qquad}c}
1 & \cdots & 5\\
\vdots & \ddots & \vdots\\
\frac{1}{5} & \cdots & 1
\end{array}
\,\right)
$$

</details>

### 第3步：计算权重向量
计算判断矩阵的最大特征值 $\lambda_{max}$ 及其对应的特征向量，并将特征向量归一化得到权重。

### 第4步：一致性检验
计算一致性指标 $CI = \frac{\lambda_{max} - n}{n - 1}$，若 $CR = \frac{CI}{RI} < 0.1$，则认为矩阵一致性可以接受。

::: tip 提示
在比赛中，推荐使用 `Python` 的 `scipy.optimize` 库或者 `MATLAB` 的 `linprog` 函数。
:::
