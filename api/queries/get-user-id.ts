import query from '../query';

export default async function (authId: string) {
  const queryResult = await query(`
      SELECT id
      FROM auth_user
      WHERE auth_id = $1
    `, [authId]);

  if (queryResult.rowCount === 0) {
    return;
  }

  return queryResult.rows[0].id;
}
