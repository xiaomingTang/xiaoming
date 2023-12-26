### publish

##### 从 master 切换到 release 分支
- `git checkout -b release/xxx`
- `pnpm version patch` (or `minor` or `major`)
- `git push origin release/xxx`
- github action 会发起向 master 的 mr, 只要同意一下就好了

### TODO

- release ci 中自动往 master 合
