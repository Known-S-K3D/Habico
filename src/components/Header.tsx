// Ensure this file exports the Header component
export function Header({ loggedIn }: { loggedIn: boolean }) {
  return (
    <header>
      <h1>Welcome {loggedIn ? 'Back' : 'Guest'}</h1>
    </header>
  );
}