import * as request from 'request-promise';

export default function store(job: any, done: any) {
  const recipe = job.data;

  request({
    method: 'post',
    url: `${process.env.API_URL}/api/recipes`,
    body: recipe,
    json: true,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then((savedRecipe: any) => done(null, savedRecipe))
    .catch((error: Error) => {
      console.log('error', error);
      done(error);
    });
}
