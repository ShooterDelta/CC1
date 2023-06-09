const chalk = require('chalk')
const yargs = require('yargs')
const { readBlog } = require('./blogs.js')
const blogs = require('./blogs.js')
//https://drive.google.com/drive/folders/1uv2tH7fG5nofWSKa_fgtZIf51RIufOf1

//add command
yargs.command({
    command: 'add',
    describe: 'Adds a new blog',
    builder: {
        title: {
            describe: 'Blog title',
            demandOption: true,
            type: 'string'
        },
        author: {
            describe: 'Blog author',
            demandOption: true,
            type: 'string'
        },
        date: {
            describe: 'Blog date',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Blog body',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        blogs.addBlog(argv.title, argv.author, argv.date, argv.body)
    }
})

//remove command
yargs.command({
    command: 'remove',
    describe: 'removes a blog',
    handler(argv) {
        blogs.removeBlog(argv.title)
    }
})

//list command
yargs.command({
    command: 'list',
    describe: 'lists all blogs',
    handler() {
        blogs.listBlogs()
    }
})

//read command
yargs.command({
    command: 'read',
    describe: 'reading the blog',
    handler(argv) {
        blogs.readBlog(argv.title)
    }

})

//update command
yargs.command({
    command: 'update',
    describe: 'updating the blog',
    
    handler(argv){
        blogs.updateBlog(argv.title, argv.body)
    }
})

yargs.parse()