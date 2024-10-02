import { http, HttpResponse } from 'msw';

const handlers = [
  http.post('/api/houses', async ({ request }) => {
    const data = (await request.json()) as {};
    const response = { id: crypto.randomUUID(), ...data };
    return HttpResponse.json(response);
  }),
];

export default handlers;
