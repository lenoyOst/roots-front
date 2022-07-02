import { Class, ClassFunctionality } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class ClassFunctionalityService {
    public static async getAll() {
        return (await axiosInstance.get<ClassFunctionality[]>("/classFunctionality")).data;
    }
}
