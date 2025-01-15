import { UserDao } from "./user.dao";

export const UserDaoProvider = {
    provide: UserDao,
    useClass: UserDao,
}