import hash from 'object-hash';

export default function generateRandomHash(
  stringToHash: string,
  size?: number
) {
  const result = hash(
    stringToHash + Math.random().toString(36).substring(2, 15),
    {
      algorithm: 'md5',
    }
  ).substring(0, size || 32);

  return result;
}
