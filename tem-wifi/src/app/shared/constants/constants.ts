import { HttpHeaders } from "@angular/common/http";

export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Api-Key': 'DFGQF0lJ8631BVTGkdckU9y4k0lbLaLg1SDfSJsG'
    })
}

export const awsBaseUrl: string = "https://33arogiloa.execute-api.us-east-1.amazonaws.com/dev";