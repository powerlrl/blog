let Router = require('koa-router')
let router = new Router()
router.get('/index',async ctx => {
  pageSize = 5
  startRow = 0
  let results = await ctx.db.query('select * from article  where user_id = ? limit ?,?',[sess.user_id,startRow,pageSize])
  let pageCounts = []
  let lg = results.length%5!=0?results.length/5:results.length/5+1
  for(let i = 1;i<= lg;i++){
    pageCounts.push(i)
  }
  console.log(pageCounts)
  if(ctx.session.user){
    ctx.render('index',{
      results,
      pageCounts
    })
    return
  }
  ctx.response.redirect('/login')
},)  





router.get('/add-blog',async ctx => {
  if(ctx.session.user){
    ctx.render('add-blog')
    return
  }
  ctx.response.redirect('/login')
})
router.post('/send-article',async ctx => {
  let {title,remark,editorValue} = ctx.request.fields
  let results = await ctx.db.query('insert into article (user_id,title,remark,editorValue,startTime,lastTime,article_id) values(?,?,?,?,?,?,?)',[ctx.session.user.user_id,title,remark,editorValue,new Date(),new Date(),ctx.query.article_id])
  ctx.body = {status: '200',msg: '发表博客成功'}
})
router.get('/delete-article',async ctx => {
    if(ctx.session.user){
      let results = await ctx.db.query('delete from article where article_id = ?',[ctx.query.article_id])
      // ctx.response.redirect('/index')
      ctx.body = {status: '200',msg: '删除博客成功'}
    }
})
router.get('/read-article',async ctx => {
    if(ctx.session.user){
      let results = await ctx.db.query('select * from article where article_id = ?',[ctx.query.article_id])
      ctx.render('read-article',{
        results: results[0]
      })
    }
})
router.get('/edit-blog',async ctx => {
  
  if(ctx.session.user){
    let results = await ctx.db.query('select * from article where article_id = ?',[ctx.query.article_id])
    console.log(results)
    ctx.render('edit-blog',{
      results: results[0]
    })
  }
})
router.post('/edit-article',async ctx => {
  let {title,remark,editorValue,article_id} = ctx.request.fields
  
  if(ctx.session.user){
    // let results = await ctx.db.query('update article set title = ? and  remark = ? and editorValue = ? where article_id = ?',[title,remark,editorValue,article_id])
    ctx.body = {code: '200',msg: '更新成功'}
    let results = await ctx.db.query('update article set title =?,remark =?,editorValue =?,lastTime =? where article_id =?',[title,remark,editorValue,new Date().toLocaleString(),article_id])
  }
  
})

module.exports = router