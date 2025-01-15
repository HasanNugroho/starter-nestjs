import { User } from "./user.entity";

export const UserProvider = {
    provide: User,
    useClass: User,
}