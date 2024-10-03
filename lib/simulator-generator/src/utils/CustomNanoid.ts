const urlAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

export default function Nanoid(size = 21) {
  let id = '';
  for (let i = 0; i < size; i++) {
    const random = Math.floor(Math.random() * urlAlphabet.length);
    id += urlAlphabet[random];
  }

  return id;
}