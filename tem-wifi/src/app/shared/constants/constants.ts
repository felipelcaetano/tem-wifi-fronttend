import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Api-Key': environment.awsApiKey
    })
}

export const awsBaseUrl: string = environment.awsBaseUrl;

export const locationTypes: any[] = [
    {
        value: 'cafe', view: 'Café'
    },
    {
        value: 'restaurante', view: 'Restaurante'
    },
    {
        value: 'coworking', view: 'Coworking'
    },
    {
        value: 'livraria', view: 'Livraria'
    },
    {
        value: 'outro', view: 'Outro'
    }
]