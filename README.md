### publish

##### 从 master 切换到 release 分支
- `git checkout -b release/xxx`
- `pnpm version patch` (or `minor` or `major`)
- `pnpm changeset`
   - 然后把 change 文件提交到 git (即 `git add .` 和 `git commit -m 'xxx: xxx'`)
- `git push origin release/xxx`
- 从 `release/xxx` 向 `master` 发起 `mr`

### TODO

- release ci 中自动往 master 合
