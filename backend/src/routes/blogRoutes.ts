import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt' 
import { createBlogInput, CreateBlogInput, updateBlogInput } from '@adarsh123/meduim-clone'

export const blogRouter = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET_KEY:string
  },
  Variables: {
    jwtPayload: string,
  }
}>()

//middleware
blogRouter.use('/*', async(c,next) => {

  const header = c.req.header("Authorization") || ""

  const user = await verify(header, c.env.JWT_SECRET_KEY)

  if(user){
    c.set("jwtPayload", user.id)
    await next()
  }
  else{
    c.status(403)
    return c.json({error:'Unauthorized'})
  }
})

blogRouter.get('/bulk', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
      }).$extends(withAccelerate()); 

    try {
        const blog = await prisma.post.findMany({
            select:{
                content:true,
                title:true,
                id:true,
                createdAt:true,
                author:{
                    select:{
                        name:true,
                    }
                }
            }
        })
        return c.json({blog})
    } catch (error) {
        c.status(411)
        return c.text('Invalid')
    }
})

blogRouter.get('/:id', async(c)=>{
    const id =  c.req.param('id')
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
      }).$extends(withAccelerate());

    
    try {
        const blog = await prisma.post.findFirst({
            where:{
                id: id,
            },
            select:{
                id:true,
                content:true,
                title:true,
                createdAt:true,
                author:{
                    select:{
                        name:true,
                    }
                }
            }
        })
        return c.json({blog})
    } catch (error) {
        c.status(411)
        return c.text('Invalid')
        
    }
     
})





blogRouter.post('/', async(c)=>{
    const body = await c.req.json()
    const {success} = createBlogInput.safeParse(body)
    if(!success){
        c.status(411)
        return c.json({
            message:'Inputs are incorrect'
        })
    }
    const authorId = c.get('jwtPayload')
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
      }).$extends(withAccelerate()); 

    const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            createdAt: body.createdAt ? new Date(body.createdAt) : new Date(), // Ensure createdAt is a valid DateTime

            authorId: authorId // replace with user id
        }
    }) 

    return c.json({
        'msg': 'Blog created',
        'id': blog.id
    })

})

blogRouter.put('/',async(c)=>{
    const body = await c.req.json()
    const {success} = updateBlogInput.safeParse(body)

    if(!success){
        c.status(411)
        return c.json({
            message:'Inputs are incorrect'
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
      }).$extends(withAccelerate()); 

    const blog = await prisma.post.update({
        where:{
            id: body.id,
        },
        data:{
            title: body.title,
            content: body.content,
        }
    }) 

    return c.json({
        'msg': 'Blog updated',
        'id': blog.id,
        'blog': blog
    })
})
