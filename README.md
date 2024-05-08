# formily-antd-dumi

# 安装依赖
yarn add puppeteer@19.2.2 --ignore-scripts

# 为了解决@formily-antd/array-base在加载和处理海量数据时出现的性能问题，采取了一系列优化措施。

## 问题描述
使用@formily-xtd/array-base时，当通过form.setValues一次性加载10000条数据时，页面会卡死。
数据加载完成后，页面滚动也会卡死。

* 解决方案
数据加载优化：
采用滚动加载方案，将10000条数据分批次加载。
使用react-infinite-scroll-component组件实现分批次滚动加载数据，以解决列表加载卡顿问题。

* 滚动性能优化：
使用react-window组件的VariableSizeList列表组件来处理海量数据滚动时的卡顿问题。
VariableSizeList组件需要动态计算每一个item的实际高度。
通过useRef来缓存每一个item加载完成后的真实高度。
