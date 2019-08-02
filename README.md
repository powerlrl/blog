---
title: 实战md
---







## 项目描述

> 使用nodejs中的koa2框架先实现登录注册功能

## 项目功能

+ 用户登录
+ 用户注册
+ 增加记录
+ 删除记录
+ 修改记录
+ 查询记录



<!--more-->

## 项目所依赖的模块

+ koa
+ co-mysql
+ mysql
+ koa-session
+ koa-art-template
+ koa-router
+ koa-static
+ Koa-better-body

## 项目中路由设计

+ 首页（/index）get
+ 登录（/login）get
+ 注册（/regesiter）get

+ 添加博客（add-blog）post
+ 删除博客（delete-article）get
+ 发表博客（send-article）post
+ 阅读博客（read-article）get
+ 编辑博客（edit-blog）get
+ 编辑博客（edit-blog）post



## 项目中数据库设计

数据库用的是mysql

users表

| user_id | username | password | email  |
| ------- | -------- | -------- | ------ |
| 1       | admin    | 123      | 邮箱名 |
| 2       | yo       | 222      |        |
| 3       | yo2      | 222      |        |

| user_id  | article_id | title  | remark   | editorValue | startTime | lastTime     | author |
| -------- | ---------- | ------ | -------- | ----------- | --------- | ------------ | ------ |
| 用户的id | 文章id     | 文章名 | 文章简介 | 正文        | 创建时间  | 最后编辑时间 | 作者   |

ps：命名不太规范，谨记以后使用驼峰命名法。

## 使用

nodemon app