### publish

##### master 分支 `push` 所有变更
> 如果已经是 clean 状态, 则可以跳过下列步骤
- 注意在 `项目根目录` 下执行下列命令
- `git add -A .`
   - *(`-A`用于确保始终添加全部文件, 即使当前目录是子目录)*
- `git commit -m 'xxx: xxx'`
- `pnpm version patch` (or `minor` or `major`)
- `git push`

##### 切换到 release 分支
- `git checkout -b release/xxx`
- `pnpm changeset`
   - 然后把 change 文件提交到 git (即 `git add .` 和 `git commit -m 'xxx: xxx'`)
- `git push origin release/xxx`
