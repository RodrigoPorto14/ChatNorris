export const BASE_URL =  "http://localhost:8080";

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODQzNDM4NjEsInVzZXJfbmFtZSI6InJvZHJpZ29AZ21haWwuY29tIiwianRpIjoiZDZhNmExMzEtMzg5Yy00ZDhlLWE1ZGItZTRlODhkZWFkZDRjIiwiY2xpZW50X2lkIjoiY2hhdG5vcnJpcyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdfQ.jw9RUxFtIwI_bZegG2ld9MjNU416LgBey8v_Gz3Lcno';

export const CONFIG = 
{
    headers: 
    {
        'Authorization': `Bearer ${TOKEN}`
    }
}