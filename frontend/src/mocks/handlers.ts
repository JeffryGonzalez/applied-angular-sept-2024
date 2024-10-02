import userHandler from './user.handler';
import houseHandler from './house.handler';
export const handlers = [...userHandler, ...houseHandler];
