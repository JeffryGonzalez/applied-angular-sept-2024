import { http, HttpResponse, delay } from 'msw';

const handlers = [
  http.get('/api/user-info', async () => {
    await delay(3000);
    // return new HttpResponse('Not Authorized', {
    //   status: 401,
    // });
    return HttpResponse.json({ userName: 'Gene Simmons' });
  }),
];

export default handlers;
