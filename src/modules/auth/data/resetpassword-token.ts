import { db } from "@/lib/db";
import * as v4 from "uuid";

class ResetPasswordTokenRepository {
  private async  getResetPasswordToken(email: string) {
    try {
      const t = await db.resetPasswordToken.findFirst({
        where: {
          email,
        },
      });
      return t;
    } catch (error) {
      console.log("Error in getResetPasswordToken", error);
      return null;
    }
  }
  async getResetPasswordTokenByToken(token: string) {
    try {
      const t = await db.resetPasswordToken.findUnique({
        where: {
          token,
        },
      });
      return t;
    } catch (error) {
      console.log("Error in getResetPasswordToken", error);
      return null;
    }
  }
  async  createResetPasswordToken(email: string) {
    try {
      const exists = await this.getResetPasswordToken(email);
      if (exists) {
        await db.resetPasswordToken.delete({
          where: {
            id: exists.id,
          },
        });
      }
      //    creating a new token
      const token = await db.resetPasswordToken.create({
        data: {
          email,
          token: v4.v4(),
          expires: new Date(Date.now() + 1000 * 60 * 60),
        },
      });
      return token;
    } catch (error) {
      console.log("Error in getResetPasswordToken", error);
      return null;
    }
  }

}
let resetTokenRepo : ResetPasswordTokenRepository | null = null
const getResetTokenRepo = () : ResetPasswordTokenRepository => {
if (!resetTokenRepo) resetTokenRepo = new ResetPasswordTokenRepository()
return resetTokenRepo
}
const ResetTokenRepo = getResetTokenRepo()
export default ResetTokenRepo