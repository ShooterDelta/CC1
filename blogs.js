const fs = require('fs')
const chalk = require('chalk')

const listBlogs = () => {
    const blogs = loadBlogs()
    console.log(chalk.inverse('Your blogs...'))
    blogs.forEach((Blog) => console.log(Blog.title))
}

const readBlog = (title) => {
    const blogs = loadBlogs()
    const duplicateBlogs = blogs.filter((Blog) => Blog.title === title)
    if (duplicateBlogs.length === 0){
        console.log('Blog not exist')
    }else{blogs.filter(function (Blog) {
            if (Blog.title === title){
                console.log(chalk.inverse(Blog.title))
                console.log('Author: ' + Blog.author)
                console.log('Date: ' + Blog.date)
                console.log(Blog.body)
            }
        })
    } 
}

const addBlog = (title, author, date, body) => {
    const blogs = loadBlogs()
    const duplicateBlogs = blogs.filter((blog) => blog.title === title)

    if (duplicateBlogs.length === 0) {
        blogs.push({
            title: title,
            author: author,
            date: date,
            body: body
        })
        saveBlogs(blogs)
        console.log('New Blog added!')
    } else {
        console.log('Blog title taken')
    }
}

const saveBlogs = (blogs) => {
    const dataJSON = JSON.stringify(blogs)
    fs.writeFileSync('blogs.json', dataJSON)
}

const loadBlogs = () => {
    try {
        const dataBuffer = fs.readFileSync('blogs.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeBlog = (title) => {
    const blogs = loadBlogs()
    const duplicateBlogs = blogs.filter((Blog) => Blog.title === title)
    if(duplicateBlogs.length === 0){
        console.log(chalk.red.inverse("Blog doesn't exist"))
    }else{
        const blogsToKeep = blogs.filter((Blog) => Blog.title !== title)
        console.log(chalk.green.inverse('Blog removed'))
        saveBlogs(blogsToKeep)
    }   
}

const updateBlog = (title, newBody) => {
    const blogs = loadBlogs()
    const duplicateBlogs = blogs.filter((Blog) => Blog.title === title)
    const selectedBlog = blogs.forEach((Blog) => Blog.title === title)
    if(duplicateBlogs.length === 0){
        console.log(chalk.red.inverse("Blog doesn't exist"))
    }else{
        for (var i = 0; i < blogs.length; i++) {
            if (blogs[i].title === title) {
              blogs[i].body = newBody
              saveBlogs(blogs)
              return;
            }
        }   
    }
}




module.exports = {
    listBlogs: listBlogs,
    addBlog: addBlog,
    removeBlog: removeBlog,
    readBlog: readBlog,
    updateBlog: updateBlog
}