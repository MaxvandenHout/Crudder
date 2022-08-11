import axios from "axios";
import nameof from "ts-simple-nameof";

export default class Crudder<T> 
{
    baseUrl = '';
    constructor(baseUrl: string = 'url') {
        this.baseUrl = baseUrl;
    }

    public async getById(id: string): Promise<T> {
       const res = await axios.get<T>(`${this.baseUrl}/${this.getTypeName()}/${id}`);
       return res.data;
    }

    public async getList(query: string): Promise<Array<T>> {
       const res = await axios.get<Array<T>>(`${this.baseUrl}/${this.getTypeName()}?${query}`);
       return res.data;
    }

    public async create(model: T): Promise<boolean> {
       const res = await axios.post(`${this.baseUrl}/${this.getTypeName()}`, model);
       if (res.status == 200) {
        return true;
       }

       return false;
    }

    public async update(model: T): Promise<boolean> {
       const res = await axios.put(`${this.baseUrl}/${this.getTypeName()}`, model);
       if (res.status == 200) {
        return true;
       }

       return false;
    }

    public async delete(id: string): Promise<boolean> {
       const res = await axios.delete(`${this.baseUrl}/${this.getTypeName()}/${id}`);
       if (res.status == 200) {
        return true;
       }

       return false;
    }

    private getTypeName(): string {
        return nameof<T>(x => x)
    }
}