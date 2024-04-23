export function sleep(seconds) 
{
  const e = new Date().getTime() + (seconds * 1000);
  while (new Date().getTime() <= e) {}
}