export function getGreeting(name: string) {
  const hour = new Date().getHours();

  if (hour < 12) return { title: `Hi, ${name}`, subtitle: 'Top of the morning to you 🌻' };
  if (hour < 18) return { title: `Hi, ${name}`, subtitle: 'Nice day, isn't it? 😎' };
  return { title: `Hi, ${name}`, subtitle: 'Greetings night owl 🦉' };
}
