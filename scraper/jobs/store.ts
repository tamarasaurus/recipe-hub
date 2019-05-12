import * as request from 'request-promise';

export default function store(job: any, done: any) {
  const recipe = job.data;

  request({
    method: 'post',
    url: `${process.env.API_URL}/recipes`,
    body: recipe,
    json: true,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then((savedRecipe: any) => done(null, savedRecipe))
    .catch((error: Error) => done(error));
}
