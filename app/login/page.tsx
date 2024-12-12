import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required />
      <button formAction={login}>Login</button>
      <button formAction={signup}>Signup</button>
    </form>
  );
}
