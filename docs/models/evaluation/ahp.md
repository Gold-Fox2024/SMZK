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
对同一层中的因素做两两重要性比较（通常用 1-9 标度法，见<a class="smzk-accent" href="#tbl-ahp-scale">表1</a>），构造判断矩阵 $A = (a_{ij})_{n \times n}$ ，其中 $a_{ij}$ 代表第 $i$ 个因素对第 $j$ 个因素的重要程度。

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

::: tip 提示
两两比较的过程中因为忽略了其他因素，导致最后的结果会产生常理上的矛盾，所以需要<a class="smzk-accent" href="#fig-ahp-hierarchy">一致性检验</a>。（防止某个因素既重要又不重要）
- 例如，第1个因素比第2个因素明显重要，第2个因素比第3个因素明显重要，第3个因素比第1个因素明显重要。但其实如果前两句成立，第三句一定不成立，就会产生矛盾。
:::

### 第3步：一致性检验
在解释一致性检验的原理前，我们先要介绍两个矩阵：正互反矩阵和一致矩阵。
- **正互反矩阵**：若在矩阵 $A = (a_{ij})_{n \times n}$ 中，每个元素 $a_{ij} > 0$ 满足：
$$
a_{ij}=\frac{1}{a_{ji}},\quad \forall\, i,j\in\{1,2,\ldots,n\}
$$ 
我们称该矩阵为正互反矩阵。在层次分析法中，我们构造的判断矩阵都是正互反矩阵。
- **一致矩阵**：若在正互反矩阵 $A = (a_{ij})_{n \times n}$ 中，满足：
$$
a_{ij} \cdot a_{jk}=a_{ik},\quad \forall\, i,j,k\in\{1,2,\ldots,n\}
$$
我们称该矩阵为一致矩阵。

在实际运用中，由于因素的数量极多，构建理想的一致矩阵十分困难。一致性检验也就是在检验我们构造的判断矩阵和一致性矩阵是否有太大差别。

### <a class="smzk-accent" href="#fig-ahp-hierarchy">具体推导（选看）</a>
其实判断一个矩阵是否为一致矩阵的充要条件的证明比较复杂，实际运用并不需要证明，为了说明原理，我将进行冗长的证明。证明如下：
$$
\def\arraystretch{1.25}
\;\left(\,
\begin{array}{c@{\qquad}c@{\qquad}c@{\qquad}c}
a_{11} & a_{12} & \cdots & a_{1n}\\
a_{21} & a_{22} & \cdots & a_{2n}\\
\vdots & \vdots & \ddots & \vdots\\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{array}
\,\right)
\quad
\text{为一致矩阵的充要条件：}
\begin{cases}
a_{ij}>0,\quad \forall\, i,j\in\{1,2,\ldots,n\}\\
a_{ii}=1,\quad \forall\, i\in\{1,2,\ldots,n\}\\
(a_{i1},a_{i2},\ldots,a_{in})=k_i\,(a_{11},a_{12},\ldots,a_{1n}),\quad \forall\, i\in\{1,2,\ldots,n\}
\end{cases}
$$

- **先证必要性：**
  
  设矩阵 $A=(a_{ij})_{n\times n}$ 为一致矩阵。由一致矩阵的定义，$A$ 为正互反矩阵且满足
  $$
  a_{ij} \cdot a_{jk}=a_{ik},\quad \forall\, i,j,k\in\{1,2,\ldots,n\}
  $$
  
  首先，由于 $A$ 为正互反矩阵，显然有 $a_{ij}>0,\quad \forall\, i,j\in\{1,2,\ldots,n\}$
  
  其次，根据正互反矩阵的定义 $a_{ij}=\dfrac{1}{a_{ji}}$，令 $j=i$ 可得 $a_{ii}=1,\quad \forall\, i\in\{1,2,\ldots,n\}$
  
  最后，在一致性关系中令 $k=1$，则
  $$
  a_{ij}a_{j1}=a_{i1},\quad \forall\, i,j\in\{1,2,\ldots,n\}
  $$
  因此
  $$
  a_{ij}=\frac{a_{i1}}{a_{j1}},\quad \forall\, i,j\in\{1,2,\ldots,n\}
  $$
  特别地，取 $i=1$，得 $a_{1j}=\dfrac{1}{a_{j1}}$ 代回上式，
  $$
  a_{ij}=a_{i1}\cdot a_{1j},\quad \forall\, i,j\in\{1,2,\ldots,n\}
  $$
  令 $k_i=a_{i1}$ （由于 $a_{11}=1$，此时 $k_1=1$），则第 $i$ 行满足
  $$
  (a_{i1},a_{i2},\ldots,a_{in})=k_i\,(a_{11},a_{12},\ldots,a_{1n}),\quad \forall\, i\in\{1,2,\ldots,n\}
  $$
  必要性证毕。
  
- **再证充分性：**
  
  反过来，若 $a_{ij}>0$，且 $a_{ii}=1$，并存在 $k_i>0$ 使得
  $$
  (a_{i1},a_{i2},\ldots,a_{in})=k_i\,(a_{11},a_{12},\ldots,a_{1n}),\quad \forall\, i\in\{1,2,\ldots,n\}
  $$
  则对任意 $i,j$ 有 $a_{ij}=k_i a_{1j}$。取 $j=i$，由 $a_{ii}=1$ 得 $1=k_i a_{1i}$，从而 $a_{1i}=\dfrac{1}{k_i}$。
  因此
  $$
  a_{ij}=k_i a_{1j}=k_i\cdot \frac{1}{k_j}=\frac{k_i}{k_j}
  $$
  于是对任意 $i,j,k$，
  $$
  a_{ij}a_{jk}=\frac{k_i}{k_j}\cdot\frac{k_j}{k_k}=\frac{k_i}{k_k}=a_{ik}
  $$
  即 $A$ 为一致矩阵。充分性证毕。

### <a class="smzk-accent" href="#fig-ahp-hierarchy">一致矩阵的性质（选看）</a>
引理：$A$ 为 $n$ 阶方阵，且 $r(A)=1$，则 $A$ 有一个特征值为 $tr(A)$，其余特征值为 $0$

<details>
<summary>具体说明</summary>

由秩-零化度定理可知
$$
\dim\ker(A)=n-r(A)=n-1
$$
因此线性方程组 $Ax=0$ 的解空间中存在 $n-1$ 个线性无关的非零解向量。对任意 $x\in\ker(A)$，都有
$$
Ax=0=0\cdot x
$$
这说明 $x$ 是特征值 $0$ 的特征向量。于是特征值 $0$ 的几何重数至少为 $n-1$，从而它的代数重数也至少为 $n-1$。

由于 $A$ 是 $n$ 阶方阵，全部特征值（按代数重数计）共有 $n$ 个，因此除去至少 $n-1$ 个为 $0$ 的特征值外，至多还剩下一个非零特征值，记为 $\lambda$。

又由“特征值之和等于迹”这一结论，
$$
\lambda_1+\lambda_2+\cdots+\lambda_n=tr(A)
$$
其中 $\lambda_1=\cdots=\lambda_{n-1}=0$，因此
$$
\lambda=tr(A)
$$
综上，$A$ 的特征值为
$$
\lambda_1=tr(A),\qquad \lambda_2=\cdots=\lambda_n=0.
$$

</details>

这样我们就能得到第一条性质：在一致矩阵中，由于对角线元素都为 $1$，因此 $tr(A)=n$。即：
$$
\lambda_1=n,\qquad \lambda_2=\cdots=\lambda_n=0
$$

另外，我们很容易得到第二条性质：特征值为 $n$ 时，对应的特征向量刚好为 $k\,(\frac{1}{a_{11}},\frac{1}{a_{12}},\ldots,\frac{1}{a_{1n}})^{\mathsf T}$
