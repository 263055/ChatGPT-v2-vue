**项目简介**

这是一个前后端分离的项目，前端vue2后端springboot3.0+jdk17

## 该项目主要包含的功能如下：
-登录注册发邮件（包含邮件模板）
-支付功能（对接xorpay）
-简单的gpt对话功能,支持3.5以及4.0
-语音朗读模块（使用了speech库，调用的是浏览器的语音包）
-gpt的生成图片功能
-日志详情功能（包含对话日志，充值日志）
-邀请功能
-敏感词过滤

## 使用到的技术（这里针对后端springboot3.0+jdk17）
-责任链设计模式
-redis
-mybatis-plus
-jwt
-thymeleaf（主要针对邮件模板）
-kaptcha（参考若依的图片验证码）

## 其中，针对项目功能，我有如下补充：
-后端提供了发邮件的模板，具体代码可以查看我的开源项目 https://github.com/263055/springboot-wzy-all  我已经集成到了spring-boot-email模块中
-前端代码是根据一位大佬的代码去修改的，这位大佬的代码地址是：https://github.com/202252197/ChatGPT_JCM
-本项目引入了若依的相关代码，比如验证码，icon，request请求等相关迪马
-前后端代码，目前不在维护，2023年十月，我也大三了，开始准备找工作
-截止2023-10-13 后端代码暂时没有开源的意愿，我不喜欢别人拿我的代码去骗钱骗小白

## 项目的演示地址(截止到2023年10月13日，项目依然稳定运行)：
[www.4gi.me](https://www.4gai.me/)

ps:这个是我着手写的第二个项目，有了第一次前后端项目的经验，这次成熟了很多
