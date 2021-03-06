// const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function setEntry() {
  const files = glob.sync('./src/pages/*/index.tsx')
  const entry = {}
  files.forEach(file => {
    const ret = file.match(/^\.\/src\/pages\/(\S*)\/index\.tsx$/)
    if (ret) {
      entry[ret[1]] = {
        import: file,
        dependOn: 'react_vendors',
      }
    }
  })

  // 拆分react依赖
  entry['react_vendors'] = {
    import: ['react', 'react-dom'],
    filename: 'static/js/vendors.js'
  }

  return entry
}

function getTemplate(name) {
  const files = glob.sync(`./src/pages/${name}/index.html`)
  if (files.length > 0) {
    return files[0]
  }
  return './src/template.html'
}

function setHtmlPlugin() {
  const files = glob.sync('./src/pages/*/index.tsx')
  const options = []
  files.forEach(file => {
    const ret = file.match(/^\.\/src\/pages\/(\S*)\/index\.tsx$/)
    if (ret) {
      const name = ret[1]
      
      let templateConfig = {}
      try{
        templateConfig = require(`../src/pages/${name}/templateConfig.js`)
      }catch(e){}
      
      options.push(new HtmlWebpackPlugin({
        filename: `${name}.html`,
        title: templateConfig.title || '',
        template: getTemplate(name),
        chunks: ['react_vendors', name, '[name]/index.css']
      }))
    }
  })
  return options
}

module.exports = {
  setEntry,
  setHtmlPlugin
}