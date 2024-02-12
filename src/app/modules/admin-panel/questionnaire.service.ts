import { Observable } from "rxjs";
import { BasicInfoTemplate, QuestionnaireTemplateDto } from "./questionnaire";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class QuestionnaireService {
    url = "http://localhost:8080/api/template"

    constructor(private http: HttpClient){}

    addQuestionnaireTemplate(dto: QuestionnaireTemplateDto):Observable<QuestionnaireTemplateDto>{
        return this.http.post<QuestionnaireTemplateDto>(this.url, dto)
    }

    getTemplateList():Observable<BasicInfoTemplate[]>{
        return this.http.get<BasicInfoTemplate[]>(this.url);
    }

    deleteQuestionnaireTemplate(id: number):Observable<BasicInfoTemplate>{
        return this.http.delete<BasicInfoTemplate>(`${this.url}/${id}`);
    }
}