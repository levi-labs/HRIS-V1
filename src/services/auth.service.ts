import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateAccessToken } from "../utils/tokenUtils.js";

dotenv.config();

const prisma = new PrismaClient();

export const loginUser = async(username:string, password:string) =>{
  const user  =  await prisma.user.findFirst({
    where : {
      username : username,
    },
   select : {
    id : true,
    name : true,
    username : true,
    email : true,
    password : true,
    role : {
      select : {
        name : true
      }
    }
   }
  });

  if(!user){
    throw new Error("User not found");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if(!passwordMatch){
   throw new Error("Invalid password");
  } 

  const token = generateAccessToken({id : user.id, role : user.role.name});
  
  const {password:__dirname, ...userWithoutPassword} = user;
  return ({ 
    message : "Login successful",
    status : 200,
    user : userWithoutPassword,
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
    },
    
  });
  return user;
}