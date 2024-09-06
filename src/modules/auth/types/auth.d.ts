export interface MessageResponse {
    message: string;
    success: boolean;
  }
  import { DefaultSession} from "next-auth"
  import { UserRole } from "@prisma/client"

  /**
   * Here you can extend your session and auth types 
   */
  
 type SessionUser = DefaultSession["user"]  & {
    role : UserRole
 }
  declare module "next-auth" {
   interface Session extends DefaultSession {
   user : SessionUser
   } 
  }


  