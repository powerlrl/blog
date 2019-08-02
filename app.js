const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const fs = require('fs')
const router = new Router()
const static = require('koa-static')
const session = require('koa-session')
const body = require('koa-better-body')
const render = require('koa-art-template')
const path = require('path')
const db = require('./config')
const userRouter = require('./router/user')
const blogRouter = require('./router/blog')
app.context.db = db
let sess = {}
//渲染页面
render(app,{
  root: path.join(__dirname,'views'),
  extname: '.html',
})
//路由模块

//处理session
app.keys = fs.readFileSync('./key.js').toString().split('/n')
let store = {
  storage: {},
  get(key){
    return this.storage[key]
  },
  set(key,session){
    this.storage[key] = session
  },
  destroy(){
    delete this.storage[key]
  }
}
 
//使用中间件

app.use(body({uploadDir:'./public/upload'}))
app.use(session({store},app))
app.use(userRouter.routes())
app.use(blogRouter.routes())
app.use(router.allowedMethods())
app.use(async (ctx,next) => {
  if(ctx.url.startsWith('/public')){
    ctx.url = ctx.url.replace('/public','')
  }
  await next()
})
app.use(static(path.resolve('./public')))


//使用中间件结束

//处理异常
app.use(async ctx => {
  try{
    await next()
  }catch(e){
    ctx.status = 200
    ctx.body = '你访问的页面失联了'
  }
})
//处理异常结束

//开启本地服务器
const port = process.PORT || 3000
app.listen(port,() => {
  console.log(`server is running ${port}`)
})