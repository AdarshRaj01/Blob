import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt' 
import { signinInput, signupInput } from '@adarsh123/meduim-clone' 

export const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET_KEY:string
  }
}>()



userRouter.post('/signup',async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate()); 


  const body = await c.req.json()
  const {success} = signupInput.safeParse(body)
  

  if(!success){
    c.status(411)
    return c.json({
      message:'Inputs are incorrect'
    })
  }

  try {
    const user = await prisma.user.create({
        data:{
          email: body.email,
          password:body.password,
          name: body.name,
        }
      })
    const token = await sign({id:user.id}, c.env.JWT_SECRET_KEY )
    return c.json({
        'msg': 'New user created',
        'username': user.email,
        'jwt': token
      })

  } catch (error) {
    console.error(error)
    c.status(411)
    return c.text('Invalid')
  }

  


})

userRouter.post('/signin',async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate()); 
  const body = await c.req.json()
  const {success} = signinInput.safeParse(body)
  if(!success){
    c.status(411)
    return c.json({
      message:'Inputs are incorrect'
    })
  }




  try {
        const user = await prisma.user.findFirst({where:{
        email:body.email,
        password:body.password,
    }})
  if(!user){
    c.status(403) // Unauthorized
    return c.json({error:'User not found'})
  }
  const token = await sign({id:user.id}, c.env.JWT_SECRET_KEY )
  return c.json({jwt:token})


  } catch (error) {
    console.error(error)
    c.status(411)
    return c.text('Invalid')
  }

})


//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZjEwYzFlYTAtZjZkMC00OWMzLTkzNmItMTRjODJhZGRlNTRiIiwidGVuYW50X2lkIjoiYjE0ZmFiMjBmZDlhZTFmOGU3YzUxYWQ2ZjQ3OWUzMjg5ZDc3ODY5YzM4ZGM3NzFjZjI1YWQzMjNlNDQ1NjgwMCIsImludGVybmFsX3NlY3JldCI6IjQxOGY2YTY3LTRmZGQtNDlmZi04OGM4LTMzNDFjNTNiZjNhYyJ9.8msWy_vXb1udYAxLa56K_9rHtVnLta0gSWf3Cg0jDaI"




