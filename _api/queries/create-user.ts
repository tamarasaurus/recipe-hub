import query from '../query';
import { createHash } from 'crypto';

export default function (authId: string) {
  const hashedAuthId = createHash('sha256').update(authId).digest('base64');

  return query(`
    INSERT INTO auth_user (auth_id) VALUES ($1)
    ON CONFLICT DO NOTHING
  `, [hashedAuthId]);
}
