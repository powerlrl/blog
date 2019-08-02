const fs = require('fs')
let len = 1024
let count = 2048
let arr = []
let char = 'fisDFADGFdkGDFAGFDSjfG&*&&&&()_)(**DAF4^^&*39906()_)_))_&&$$%6950iksjdf'
for(let i = 0; i < count; i++){
  let keys = ''
  for(let j = 0; j < len; j++){
    keys += char[Math.floor(Math.random()*char.length)]
  }
  arr.push(keys)
}
fs.writeFileSync('./key',arr.join('\n'))