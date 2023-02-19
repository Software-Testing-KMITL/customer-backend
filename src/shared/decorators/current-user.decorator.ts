import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

export const CurrentUser = createParamDecorator(
  (key: never, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
);
