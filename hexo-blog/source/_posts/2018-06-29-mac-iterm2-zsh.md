title: 'iterm+zsh配置'
date: 2018-06-29 10:20:52
tags:
    -
---

配置
<!--more-->
下载安装
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
配置文件
~/.zshrc
主题
ZSH_THEME="dracula"
插件holo
plugins=(
  git node npm yarn history sublime z autojump
)
别名
alias g='git'

快捷开启webstorm
webstorm 开启快捷键
webstorm 菜单栏 Tools -> Create Command Line Launcher
/usr/local/bin/webstorm 其中webstorm就是脚本命令
[官网命令](https://www.jetbrains.com/help/webstorm/opening-files-from-command-line.html)
webstorm path 打开path
webstorm . 打开当前文件夹

快捷开启subline
zsh 插件 sublime
st 打开文件[夹]
st . 当前文件夹

还可以指定链接
alias atom='/Applications/Atom.app/Contents/MacOS/Atom'
// sublime3
alias subl='/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl'
// sublime2
alias subl='/Applications/Sublime\ Text\ 2.app/Contents/SharedSupport/bin/subl'
alias code='/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code'


插件
web-search 命令行使用搜索引擎
google content
baidu content
bing content

zsh-autosuggestions 历史搜索记录提示
git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions


https://ohmyz.sh/
https://draculatheme.com/zsh/
