import type { User as IUser } from '../../typeDefinitions';

export const User = {
	fullName: (user: IUser) => `${user.firstName} ${user.lastName}`,
};

export default User;
