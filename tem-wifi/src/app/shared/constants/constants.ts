import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Api-Key': 'DFGQF0lJ8631BVTGkdckU9y4k0lbLaLg1SDfSJsG'
    })
}

export const awsBaseUrl: string = environment.awsBaseUrl;