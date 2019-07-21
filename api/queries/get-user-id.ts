import query from '../query';
import { createHash } from 'crypto';

export default async function (authId: string) {
  if (!authId) {
    return;
  }

  const hashedAuthId = createHash('sha256').update(authId).digest('base64');

  const queryResult = await query(`
      SELECT id
      FROM auth_user
      WHERE auth_id = $1
    `, [hashedAuthId]);

  if (queryResult.rowCount === 0) {
    return;
  }

  return queryResult.rows[0].id;
}
