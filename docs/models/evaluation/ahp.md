---
title: 层次分析法
description: 一种定性与定量相结合的、系统化、层次化的分析方法。
---

# AHP (层次分析法)

> 数学建模中的“入门必修课”

**AHP** (Analytic Hierarchy Process，层次分析法) 由美国运筹学家 Thomas L. Saaty 创立。通过将复杂问题分解为若干层次和若干因素，对两两指标之间的重要程度作出比较判断（主观），建立判断矩阵，通过计算判断矩阵的最大特征值以及对应特征向量，就可得出不同方案重要性程度的权重，为最佳方案的选择提供依据。其应用领域极为广泛，涵盖了商业管理、项目评估、资源分配、公共政策制定、供应链管理、环境风险评估乃至军事领域的冲突解决等多个方面。

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
对同一层中的因素做两两重要性比较（通常用 1-9 标度法，见<a class="smzk-accent" href="#tbl-ahp-scale">表1</a>），构造判断矩阵 $A = (a_{ij})_{n \times n}$ ，其中 $a_{ij}$ 代表第 $i$ 个因素对第 $j$ 个因素的重要程度。在设定判断矩阵的程度值时，可以使用**德尔菲法 (Delphi Method)**，也可直接根据实际业务专家的建议来确定。

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
两两比较的过程中因为忽略了其他因素，导致最后的结果会产生常理上的矛盾，所以需要进行<a class="smzk-accent" href="#sec-ahp-consistency">一致性检验</a>（防止某个因素既重要又不重要）。
- 例如：第1个因素比第2个因素明显重要，第2个因素比第3个因素明显重要；若此时存在第3个因素比第1个因素重要的情况，就会在逻辑上产生矛盾。
:::

<a id="sec-ahp-consistency"></a>
### 第3步：一致性检验
*注：在实际操作中，第3步与第4步紧密相连，一致性检验需要用到第4步中计算出的最大特征值 $\lambda_{\max}$。*

在解释一致性检验的原理前，我们需要先了解两个概念：**正互反矩阵**和**一致矩阵**。
- **正互反矩阵**：若在矩阵 $A = (a_{ij})_{n \times n}$ 中，每个元素 $a_{ij} > 0$ 且满足：
$$
a_{ij}=\frac{1}{a_{ji}},\quad \forall\, i,j\in\{1,2,\ldots,n\}
$$ 
我们称该矩阵为正互反矩阵。在层次分析法中，我们构造的判断矩阵**都是**正互反矩阵。
- **一致矩阵**：若在正互反矩阵 $A = (a_{ij})_{n \times n}$ 中，进一步满足：
$$
a_{ij}a_{jk}=a_{ik},\quad \forall\, i,j,k\in\{1,2,\ldots,n\}
$$
我们称该矩阵为一致矩阵。

由于实际评价中指标数量较多，构建完美的一致矩阵十分困难。一致性检验的目的，就是检验我们主观构造的判断矩阵与理想的“一致矩阵”之间是否存在不可接受的偏差。

<details>
<summary><span class="smzk-accent">具体推导（选看）：一致矩阵的充要条件证明</span></summary>

判断一个矩阵是否为一致矩阵的充要条件证明较为复杂，实际运用中只需了解即可。证明如下：
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
  设矩阵 $A=(a_{ij})_{n\times n}$ 为一致矩阵。由一致矩阵的定义，$A$ 为正互反矩阵且满足 $a_{ij}a_{jk}=a_{ik}$。
  首先，由于 $A$ 为正互反矩阵，显然有 $a_{ij}>0$。
  其次，根据正互反矩阵的定义 $a_{ij}=\dfrac{1}{a_{ji}}$，令 $j=i$ 可得 $a_{ii}=1$。
  最后，在一致性关系中令 $k=1$，则 $a_{ij}a_{j1}=a_{i1}$，因此 $a_{ij}=\frac{a_{i1}}{a_{j1}}$。
  特别地，取 $i=1$，得 $a_{1j}=\dfrac{1}{a_{j1}}$。代回上式，有 $a_{ij}=a_{i1}a_{1j}$。
  令 $k_i=a_{i1}$（由于 $a_{11}=1$，此时 $k_1=1$），则第 $i$ 行满足 $(a_{i1},a_{i2},\ldots,a_{in})=k_i\,(a_{11},a_{12},\ldots,a_{1n})$。必要性证毕。
  
- **再证充分性：**
  反过来，若 $a_{ij}>0$，且 $a_{ii}=1$，并存在 $k_i>0$ 使得 $(a_{i1},a_{i2},\ldots,a_{in})=k_i\,(a_{11},a_{12},\ldots,a_{1n})$。
  则有 $a_{ij}=k_i a_{1j}$。取 $j=i$，由 $a_{ii}=1$ 得 $1=k_i a_{1i}$，从而 $a_{1i}=\dfrac{1}{k_i}$。
  因此 $a_{ij}=k_i a_{1j}=k_i\frac{1}{k_j}=\frac{k_i}{k_j}$。
  于是 $a_{ij}a_{jk}=\frac{k_i}{k_j}\frac{k_j}{k_k}=\frac{k_i}{k_k}=a_{ik}$，即 $A$ 为一致矩阵。充分性证毕。
</details>

<details>
<summary><span class="smzk-accent">具体推导（选看）：一致矩阵的一些特点</span></summary>

**引理**：$A$ 为 $n$ 阶方阵，且 $r(A)=1$，则 $A$ 有一个特征值为 $tr(A)$，其余特征值为 $0$。

由秩-零化度定理可知，$\dim\ker(A)=n-r(A)=n-1$。因此 $\ker(A)$ 中存在 $n-1$ 个线性无关的非零向量。对任意 $x\in\ker(A)$，都有 $Ax=0=0\,x$，这说明 $x$ 是特征值 $0$ 的特征向量。于是特征值 $0$ 的代数重数至少为 $n-1$。
除去至少 $n-1$ 个为 $0$ 的特征值外，至多还剩下一个非零特征值 $\lambda$。又由“特征值之和等于迹”，得出 $\lambda=tr(A)$。

**特点一：最大特征值**
在一致矩阵中，由于对角线元素都为 $1$，因此 $tr(A)=n$，即：
$$
\lambda_1=n,\qquad \lambda_2=\lambda_3=\cdots=\lambda_n=0
$$

**特点二：对应的特征向量**
特征值为 $n$ 时，对应的特征向量刚好为 $k\,(\frac{1}{a_{11}},\frac{1}{a_{12}},\ldots,\frac{1}{a_{1n}})^{\mathsf T}$。

*(注：此处省去了繁琐的解齐次方程组 $(A-nE)x=0$ 的行变换过程，核心在于一致矩阵的行与行之间成比例，经过初等行变换后，仅需解第一行的约束即可得出上述特征向量。)*
</details>

#### 不一致性与最大特征值
在一致矩阵中，我们已经得出 $\lambda_{\max}=n$。当判断矩阵出现不一致时（即存在 $i,j,k$ 使 $a_{ij}a_{jk}\neq a_{ik}$），矩阵会导致最大特征值严格大于 $n$，即：
$$
\lambda_{\max}>n
$$
因此 $\lambda_{\max}-n$ 可以用来刻画“偏离一致性”的程度：判断越不一致，$\lambda_{\max}$ 往往越大，$\lambda_{\max}-n$ 也越大。

基于这个思想，Saaty 提出了常用的一致性指标（Consistency Index, CI）：
$$
\mathrm{CI}=\frac{\lambda_{\max}-n}{n-1}
$$
其中 $\lambda_{\max}=n$ 时有 $\mathrm{CI}=0$，表示完全一致；$\mathrm{CI}$ 越大，表示不一致程度越高。

#### ▌ 一致性检验的具体步骤

① **计算一致性指标 $\mathrm{CI}$**：
$$
\mathrm{CI}=\frac{\lambda_{\max}-n}{n-1}
$$

② **查表获取平均随机一致性指标 $\mathrm{RI}$**（由矩阵阶数 $n$ 决定）：

<div class="smzk-table-center smzk-table-figure">

<div class="smzk-table-caption">表2 平均随机一致性指标 RI</div>

| n | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RI | 0 | 0 | 0.525 | 0.882 | 1.110 | 1.250 | 1.341 | 1.404 | 1.451 | 1.486 | 1.514 | 1.536 | 1.555 | 1.570 | 1.584 |

<div class="smzk-table-note">注：RI 值采用近年来更受认可的 Franek and Kresta (2014) 的方式。实际运用中，n 很少超过 10，如果 n 过大，则可考虑建立多级评价体系或使用其他模型。</div>

</div>

③ **计算一致性比例 $\mathrm{CR}$**：
$$
\mathrm{CR}=\frac{\mathrm{CI}}{\mathrm{RI}}
$$
- 若 $\mathrm{CR}<0.1$，通常认为判断矩阵的一致性可以接受。
- 若 $\mathrm{CR}\ge 0.1$，认为一致性较差，需要对判断矩阵进行适当调整。（调整方向：将矩阵元素尽可能向行与行呈倍数关系的“一致矩阵”方向修正）。

<details>
<summary><span class="smzk-accent">层次总排序及一致性检验（选看，通常不予考虑）</span></summary>

最终我们要得到各元素（特别是最低层中各方案）对于总目标的排序权重。总排序权重需要自上而下地将各准则下的权重进行合成。

设上一层次（$A$ 层）包含 $m$ 个因素，总排序权重为 $a_1,\ldots,a_m$。下一层次（$B$ 层）包含 $n$ 个因素，它们关于 $A_j$ 的单排序权重为 $b_{1j},\ldots,b_{nj}$。则 $B$ 层中各因素关于总目标的层次总排序权重为：
$$
b_i=\sum_{j=1}^m b_{ij}a_j,\quad i=1,2,\ldots,n
$$

对层次总排序也需要做一致性检验，以防止各层次的微小非一致性累积。
$$
\mathrm{CR}=\frac{\sum_{j=1}^m \mathrm{CI}(j)a_j}{\sum_{j=1}^m \mathrm{RI}(j)a_j}
$$
当总排序 $\mathrm{CR}<0.10$ 时，接受分析结果。
</details>

### 第4步：计算权重向量

在得到判断矩阵 $A=(a_{ij})_{n\times n}$ 并确认一致性后，我们需要求出权重向量：
$$
w=(w_1,\ldots,w_n)^{\mathsf T},\quad w_i\ge 0,\quad \sum_{i=1}^n w_i=1
$$
在一致性较好时，下述三种方法算出来的权重通常非常接近。

#### 4.1 算术平均法（列归一化）
**直观理解**：先把每一列“缩放成同一个尺度”，再把每一行取平均。
- 第 1 步：按列归一化
$$
\tilde a_{ij}=\frac{a_{ij}}{\sum_{k=1}^n a_{kj}},\quad i,j=1,2,\ldots,n
$$
- 第 2 步：对归一化后的矩阵按行取平均，得到权重
$$
w_i=\frac{1}{n}\sum_{j=1}^n \tilde a_{ij},\quad i=1,2,\ldots,n
$$

#### 4.2 几何平均法（方根法）
**直观理解**：每一行代表“该因素相对其它因素的总体优势”，用几何平均更符合“成比例比较”的特点。
- 第 1 步：计算每一行元素的几何平均
$$
g_i=\sqrt[n]{\prod_{j=1}^n a_{ij}},\quad i=1,2,\ldots,n
$$
- 第 2 步：归一化得到权重
$$
w_i=\frac{g_i}{\sum_{k=1}^n g_k},\quad i=1,2,\ldots,n
$$

#### 4.3 特征值法（AHP 经典方法）
**直观理解**：寻找一个向量 $w$，使得 $Aw$ 与 $w$ 的方向尽量一致。这个方向由最大特征值对应的特征向量给出。
- 第 1 步：求最大特征值 $\lambda_{\max}$ 及对应特征向量 $w$
$$
Aw=\lambda_{\max}w
$$
- 第 2 步：将特征向量归一化，使其和为 1
$$
w_i=\frac{w_i}{\sum_{k=1}^n w_k},\quad i=1,2,\ldots,n
$$

## 完整代码实现（Python / MATLAB）

下面给出一份可以直接复用的 AHP 代码模板。

### Python（NumPy）

```python
import numpy as np

def ahp_calculator(matrix):
    """
    计算 AHP 判断矩阵的权重及一致性检验
    """
    # 1. 获取输入并检查矩阵有效性
    A = np.array(matrix, dtype=float)
    n, m = A.shape
    if n != m:
        raise ValueError("错误：判断矩阵必须是方阵！")

    # 2. 求解特征值与特征向量
    eigvals, eigvecs = np.linalg.eig(A)
    
    # 提取最大特征值的索引及数值
    max_eig_idx = np.argmax(np.real(eigvals))
    max_eig = np.real(eigvals[max_eig_idx])

    # 3. 一致性检验
    # n=1 或 2 时，矩阵一定具有完全一致性
    if n <= 2:
        CR = 0.0
    else:
        CI = (max_eig - n) / (n - 1)
        # 标准RI表 (n=1~15)
        RI = [0, 0, 0.52, 0.89, 1.11, 1.25, 1.35, 1.40, 1.45, 1.49, 1.52, 1.54, 1.56, 1.58, 1.59]
        if n > len(RI):
            raise ValueError("错误：矩阵维度超出15，无法查表获取RI值！")
        CR = CI / RI[n - 1]

    print(f"\n=== 一致性检验结果 ===")
    print(f"最大特征值 Max_eig = {max_eig:.4f}")
    print(f"一致性比例 CR = {CR:.4f}")

    if CR < 0.10:
        print("-> 因为 CR < 0.10，该判断矩阵A的一致性通过检验！")
        print("\n=== 权重计算结果 ===")

        # 方法1：算术平均法 (按列求和归一化后，按行求平均)
        W_arith = np.mean(A / np.sum(A, axis=0), axis=1)
        
        # 方法2：几何平均法 (按行连乘求n次方根后，再归一化)
        W_geom = np.prod(A, axis=1) ** (1 / n)
        W_geom = W_geom / np.sum(W_geom)
        
        # 方法3：特征值法 (取最大特征值对应的特征向量进行归一化)
        W_eigen = np.real(eigvecs[:, max_eig_idx])
        W_eigen = W_eigen / np.sum(W_eigen)

        # 格式化输出结果
        print("1. 算术平均法权重:", np.round(W_arith, 4))
        print("2. 几何平均法权重:", np.round(W_geom, 4))
        print("3. 特征值法权重:",   np.round(W_eigen, 4))
        
        return W_arith, W_geom, W_eigen
    else:
        print("-> 警告：CR >= 0.10，该判断矩阵A未通过一致性检验，需要重新调整矩阵元素!")
        return None, None, None


if __name__ == "__main__":
    # TODO: 在此处手动输入或替换为你的判断矩阵
    A = [
        [1,   2,   3,   5],
        [1/2, 1,   1/2, 2],
        [1/3, 2,   1,   2],
        [1/5, 1/2, 1/2, 1]
    ]
    ahp_calculator(A)
```

### MATLAB

```matlab
clc, clear;

% TODO: 请在此处手动输入判断矩阵 A
A = [
    1,   2,   3,   5;
    1/2, 1,   1/2, 2;
    1/3, 2,   1,   1/2;
    1/5, 1/2, 2,   1
];

% 1. 获取输入并检查矩阵有效性
[n, m] = size(A);            
if n ~= m
    error('错误：判断矩阵必须是方阵！');
end

% 2. 求解特征值与特征向量
[V, D] = eig(A);

% 提取对角线元素（特征值），并直接获取最大特征值及其所在列的索引 c
[Max_eig, c] = max(diag(D));

% 3. 一致性检验
% n=1 或 2 时，矩阵一定具有完全一致性
if n <= 2
    CR = 0;
else
    CI = (Max_eig - n) / (n - 1);
    % 标准RI表（支持到 n=15 ）
    RI = [0, 0, 0.52, 0.89, 1.11, 1.25, 1.35, 1.40, 1.45, 1.49, 1.52, 1.54, 1.56, 1.58, 1.59];
    if n > length(RI)
        error('错误：矩阵维度超出15，无法查表获取RI值！');
    end
    CR = CI / RI(n);
end

fprintf('\n=== 一致性检验结果 ===\n');
fprintf('最大特征值 Max_eig = %.4f\n', Max_eig);
fprintf('一致性比例 CR = %.4f\n', CR);

if CR < 0.10
    disp('-> 因为 CR < 0.10，该判断矩阵A的一致性通过检验！');
    fprintf('\n=== 权重计算结果 ===\n');

    % 方法1：算术平均法 (按列归一化后按行求平均)
    W_arith = sum(A ./ sum(A, 1), 2) / n; 
    
    % 方法2：几何平均法 (按行连乘求n次方根后归一化)
    W_geom = prod(A, 2) .^ (1/n);         
    W_geom = W_geom / sum(W_geom);        
    
    % 方法3：特征值法 (取最大特征值对应的特征向量进行归一化)
    W_eigen = V(:, c) / sum(V(:, c));     
    
    % 输出展示
    disp('1. 算术平均法权重:'); disp(W_arith');
    disp('2. 几何平均法权重:'); disp(W_geom');
    disp('3. 特征值法权重:');   disp(W_eigen');
    
else
    disp('-> 警告：CR >= 0.10，该判断矩阵A未通过一致性检验，需要重新调整矩阵元素!');
end
```

## 参考资料
- [层次分析法 你真的懂了吗？（完更）_一致矩阵的特征值为什么是n-CSDN博客](https://blog.csdn.net/Fighting_swh/article/details/107085934)
- [《数学建模》课程教学资源（教材讲义）第八章 层次分析法](https://www.xiaokudang.com/docs/view/70bc2d770b9e4defbd97ecb1830ff89f.html)
- [数学建模学习笔记（1）：层次分析法（AHP）（附有详细使用步骤）](https://blog.csdn.net/hanmo22357/article/details/126097360)
- GPT-5.3
