# Scout
可能是东半球最灵活的URL监控系统

![demo](http://i.imgur.com/cNi98z1.png)

### 环境需求
```
Node.js v6+
MongoDB v3+
```

### 安装与启动
```sh
git clone https://github.com/HandsomeOne/Scout.git
cd Scout
npm install
npm run build
# if not Windows: npm run build-sh
npm install -g forever
forever start ./server
```
然后访问 http://localhost:3001/ 。

### 升级
```sh
cd Scout
git pull --force
npm install
npm run build
# if not Windows: npm run build-sh
forever restart ./server
```

### 使用

% 待补充 %

### 参与开发
```sh
cd Scout
node server
```
```sh
npm start
```
欢迎 issues 和 PRs。

### 待实现
- [ ] 监控可启动、暂停
- [ ] 高级选项的默认值可以配置
- [ ] 使用 Redux 重构前端数据层
- [ ] 详情页补全与优化
    - [ ] Apdex
    - [ ] 响应时间
    - [ ] 状态码
    - [ ] 状态信息用饼状图实现
