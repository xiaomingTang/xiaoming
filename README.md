### publish
- 注意在 `项目根目录` 下执行下列命令
- `git add -A .`
   - (用于确保始终添加全部文件, 即使当前目录是子目录)
- `git commit -m 'xxx: xxx'`
- `pnpm version patch` (or `minor` or `major`)
- `git push`
- `git push --tags`
