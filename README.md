### publish

##### 从 master 切换到 release 分支

> 艹了, 别在 master 开发完了再切分支啊, 先切分支, 再写代码 !!!

- `git checkout -b release/xxx`
- `git add .` + `git commit -m 'xxx'` + `pnpm changeset` + `pnpm changeset version`
   - or `pnpm changeset pre enter alpha`
- `pnpm version patch` (or `minor` or `major`)
- `git push origin release/xxx`
- github action 会发起向 master 的 mr, 只要同意一下就好了

### TODO

- release ci 中自动往 master 合
