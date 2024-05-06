server {
    listen       80;
    server_name  localhost;
    #使用项目名替换 formily-antd-dumi
    location /wf/formily-antd-dumi {
    	root /wangfan/;
    	try_files $uri $uri/ /wf/formily-antd-dumi/index.html;
    }
}