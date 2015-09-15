# grunt基础架构

## 一、基本操作

### 1. 安装node

######通过 <https://nodejs.org/download/> ，下载与自己操作系统相符的包进行安装

### 2. 项目架子
 
> #### 2.1 安装grunt-cli
1. window在窗口左下角的程序中找到运行，在运行文本框中输入cmd，然后回车打开dos命令行
2. 输入 npm install -g grunt-cli 命令，回车进行安装，如安装失败可能是因为执行权限不足

> #### 2.2 下载脚手架
1. 目前直接完全运用到我们目前的开发环境可能会带来很多弊端，
   所以可以先下载这个架子<https://github.com/guopengfei1992/laboratory/archive/master.zip>
2. 然后可以根据文档本地试用一下，看看效果，也可以先作为本地的工具使用，把构建后的代码传到cdn，
3. 欢迎提出各种不满和需要改进的地方，待后续完善之后，再尝试如何集成到我们的版本控制中。

### 3. 安装grunt依赖
1.  进入命令行，进入项目路径
2.  先切换到项目所在的磁盘下，输入D:，回车便切换到D盘
3.  然后输入cd 项目路径，进入grunt项目的根目录，
    grunt工具所需的两个基本文件package.json和Gruntfile.js按照规范需放在项目的根目录，所以输入dir，会看到这俩文件
4.  输入 npm install, 回车自动安装package.json文件配置的依赖包

### 4. 运行grunt
1.  同样打开dos命令行，进入项目根目录
2.  输入 grunt，回车执行grunt默认任务，默认生产production代码

### 5. 部署
* 通过添加参数，来告诉grunt要生产部署环境的代码
* dos命令行运行 grunt --deploy 即可

## 二、目录结构

### 1. 整体结构

1.  最外层是整个grunt项目
2.  根目录Gruntfile.js和package.json是必要的两个文件，分别用来自定义grunt任务和项目元数据
3.  根目录lib目录存放了一些公共的node模块和一些自定义的grunt任务
4.  根目录develop是我们开发时所写代码的目录，也就是构建代码的源文件目录
5.  根目录production是grunt构建生产的代码目录，包含一些合并，替换操作，用来调试代码
6.  根目录deploy是grunt构建生产的用来部署的代码，相比production多了压缩、变量混淆功能，不方便外界查看源码，当然也不方便我们开发调试。
7.  根目录grunt_task_cfg里的子文件是对不同任务的配置，大多数配置都是通过约定实现的，如果不想遵守约定，可以在配置的基础上增加自定义配置。

### 2. 目录名称

1.  开发目录develop，生产目录production、以及最终的部署目录deploy，
    三者的目录名字不是定死的，可以修改，任务配置目录grunt_task_cfg同样被写活了，
    但修改之后需要在package.json同步修改才可保证grunt运行时不会出错
2.  在package.json里，配置了一些项目基本信息，
    其中devDependencies属性是所有的grunt任务依赖包，
    而projectCfg配置的是一些关于项目构建所需的信息，
    包含grunt任务配置目录，开发代码目录，生产代码目录，部署代码目录等，用来使一些项目名称可以修改

## 三、开发

### 1. 静态资源存放

1. 假设开发目录为develop，它的每一个子目录代表一个项目。
   每个项目里，有属于自己的css，img, js, tpl文件夹，用来分别存放不同种类的文件。
2. 在css，img，js目录里可以建立子目录，把不同功能的代码进行拆分编写，
   在运行grunt任务之后，会把这些子目录的文件进行合并，并以目录名进行命名生成新的合并文件
3. 不懂？在develop目录，新建一个项目，然后在项目下建一个js目录，然后再建立一个子目录，里面存放两个js文件，
   命令行里运行grunt，然后再查看production目录，你就明白啦！

### 2. 静态资源引用

1. 开发时，我们的静态资源都在develop目录，但是这些文件是零散的，模块化的，
   如果在页面中引入这些文件，会造成因http请求过多带来的网络性能问题。
2. 因为手动做这些操作又过于繁琐，因此有了自动构建，
   在代码开发完毕后，运行一条命令，即可生产调试代码，
   因为调试的是生产后的代码，所以也需要我们在html里引用静态资源时也直接引用production目录。
3. 在生产部署环境代码时，会自动把html里的静态引用路径替换为cdn路径，所以部署时不需要额外的修改
   



