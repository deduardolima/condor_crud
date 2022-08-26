import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config()

export default class Authenticator {
  public generateToken(input: AuthenticationData,
    expiresIn: string = process.env.ACCESS_TOKEN_EXPIRES_IN!): string {
    const token = jwt.sign(
      {
        id: input.id,
        email: input.email
      },
      process.env.JWT_KEY as string,
      {
        expiresIn,
      }
    );
    return token;
  }

  public getTokenData = (token: string): AuthenticationData | null => {
    try {
        const tokenData = jwt.verify(
            token,
            process.env.JWT_KEY as string
        ) as any

        return tokenData

    } catch (error) {
        console.log(error)
        return null
    }

}
}

export interface AuthenticationData {
  id: string;
  email: string;
}