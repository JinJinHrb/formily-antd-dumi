FROM registry.cn-hangzhou.aliyuncs.com/wangfan/nginx:20211215
#使用文档实际产物名称替换/docs-dist
ADD /docs-dist /formily-antd-dumi
ADD nginx.conf.tpl /etc/nginx/conf.d/default.conf
ENV PORT 80