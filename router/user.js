let Router = require('koa-router')
let router = new Router()
router.get('/',async ctx => {
  ctx.response.redirect('/login')
})
router.get('/login',async ctx => {
  ctx.render('login')
})
router.get('/register',async ctx => {
  ctx.render('register')
})
router.post('/do-register',async ctx => {
  let {username,password,email} = ctx.request.fields
  let results = await ctx.db.query('select * from users where username = ?',username)
  if(results.length != 0){
    ctx.body = {code: '201',msg:'该用户已经注册'}
    return
  }
  await ctx.db.query('insert into users(username,password,email) values(?,?,?)',[username,password,email])
  ctx.body = {code: '200',msg: '注册成功'}
  
})
router.post('/do-login',async ctx => {
  let {username,password} = ctx.request.fields
  let results = await ctx.db.query('select * from users where username = ? and password = ?',[username,password])
    if(results.length == 0){
      ctx.body = {code: '201',msg: '登录失败'}
      return
    }
    ctx.session.user = results[0]
    sess = ctx.session.user
    ctx.body = {code: '200',msg: '登录成功'}
})



module.exports = router