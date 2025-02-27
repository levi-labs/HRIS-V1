import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

export const loginUser = async(username:string, password:string) =>{
  const user  =  await prisma.user.findFirst({
    where : {
      username : username,
    },
    include : {
      role : true
    }
  });

  if(!user){
    throw new Error("User not found");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if(!passwordMatch){
   throw new Error("Invalid password");
  } 

  const token = jwt.sign({id:user.id ,role:user.role.name}, process.env.JWT_SECRET || "",{
    expiresIn : "1h"
  });
  return ({ 
    message : "Login successful",
    status : 200,
    user,
    token
  });
}

export const registerUser = async(name:string, username:string, email:string, password:string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data : {
      name,
      username,
      email,
      password : hashedPassword,
      roleId : 1
    }
  });
  return user;
}