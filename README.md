# Scout
可能是东半球最灵活的URL监控系统

![demo](https://i.imgur.com/xblcsIS.png)

### 环境需求
```
Node.js v6+
MongoDB v3+
```
（应用处于开发阶段，低级版本未经测试）

### 安装与启动
```sh
git clone https://github.com/HandsomeOne/Scout.git
cd Scout
npm install
npm run build
npm install -g forever
forever start ./server mongodb://username:password@host/database
# MongoDB URI 格式参见 (https://docs.mongodb.com/manual/reference/connection-string/)
# 若不传，默认为 `mongodb://localhost/scout`
```
然后访问 http://your-ip:3001/ 。

### [使用指南](https://github.com/HandsomeOne/Scout/wiki)

### 升级
```sh
cd Scout
git pull --force
npm install
npm run build
forever restart ./server
```
或者（linux 环境下）
```sh
cd Scout
sh update.sh
```

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
- [ ] 表单验证
- [ ] 分布式
