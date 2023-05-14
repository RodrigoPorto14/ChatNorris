export const BASE_URL =  "http://localhost:8080";

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODQxNjE1MTEsInVzZXJfbmFtZSI6InJvZHJpZ29AZ21haWwuY29tIiwianRpIjoiZTFiNTRlMmYtZGZlOC00MGQ4LTgzYWItY2I3NTdjMGQ4MDU2IiwiY2xpZW50X2lkIjoiY2hhdG5vcnJpcyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdfQ.-wgvOAsPkapf69uc3LigulGFeuphdb55uJew_pbznZQ';

export const CONFIG = 
{
    headers: 
    {
        'Authorization': `Bearer ${TOKEN}`
    }
}