# slack勤怠メニューバー

アルファ版（あとはまかせた）

## install

replace settings in main.js
```
$ npm install
$ npx electron-forge make
$ cp -R out/slack-kintai-menubar-darwin-arm64/slack-kintai-menubar.app /Applications/
$ open -a slack-kintai-menubar
```

macのログイン項目に追加しておくと更に便利
