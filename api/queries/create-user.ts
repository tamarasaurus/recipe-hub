import query from '../query';

export default function (authId: string) {
  return query(`
    INSERT INTO auth_user (auth_id) VALUES ($1)
    ON CONFLICT DO NOTHING
  `, [authId]);
}
