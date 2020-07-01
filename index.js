//Imports prisma client
const { PrismaClient } = require("@prisma/client")
//creates new prisma instance
const prisma = new PrismaClient()

async function main() {
  async function createPost(title,content){
      await prisma.posts.create({
          data: {
              title: title,
              content: content,
              users: {
                  connect: {id : 2}
              }
          }
      })
  }

  async function createComment(content){
      await prisma.comments.create({
          data: {
              content: content,
              posts: {
                  connect: {id: 2}
                },
                users: {
                    connect: {id : 1}
                }
            }
        })
    }

 
  async function createUser(first_name, dob, email, password){
      await prisma.users.create({
          data: {
              first_name: first_name,
              email: email,
              dob: dob,
              password: password
            }
        })
    }
    
    try{
    // await createUser('user2', new Date(1992-04-27), 'new2@email.com', 'pw1')
    // await createComment('adding a comment on post 2 by user 1')
    // await createPost('New test post for user2', 'This should create a post for user 2')
        const allPosts= await prisma.posts.findMany({
            include: { 
                comments: true
            },
        })

        const allusers= await prisma.users.findMany({
            include: { 
                posts: true
            },
        })
        console.dir(allPosts, { depth: null })
    }
    catch(e){
        console.log(e)
    }
}

 main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })