import SignUpAlertDialog from "@/components/signup-alert-dialog";
import { Button } from "@/components/ui/button";
import bgImage from "@/assets/images/internalSys.png";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuthViewModel } from "@/viewmodels/useAuthViewModel";
import { useAuth } from "@/App"; // Import useAuth from App.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login, error, loading } = useAuthViewModel();
  const auth = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(email, password);

      // Set role in context
      auth.setRole(user.role);

      // Navigate based on role
      if (user.role === "admin") {
        navigate("/"); // Admin dashboard
      } else {
        navigate("/staffDashboard"); // Staff dashboard
      }
    } catch (err) {
      // error is already handled in ViewModel
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex flex-row h-screen ">
      <section className="w-full md:w-1/2 p-8 flex flex-col justify-between ">
        <div>InternalSys</div>
        <form
          onSubmit={handleSubmit}
          className="px-10 md:px-10 lg:px-20 xl:px-30"
        >
          <FieldGroup>
            <FieldSet>
              <div>
                <h1 className="text-2xl font-bold">Sign in</h1>
                <FieldDescription>Enter your credentials.</FieldDescription>
              </div>
              <FieldGroup>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    placeholder="Please enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    type="password"
                    placeholder="Please enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>
              </FieldGroup>
              <Button type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <span className="flex flex-row gap-2">
                Don&apos;t have an account? <SignUpAlertDialog />
              </span>
            </FieldSet>
          </FieldGroup>
        </form>
        <div className="flex flex-row justify-between text-sm text-zinc-500">
          <p>&copy; internalSys.com</p>
          <p>internalsys@gmail.com</p>
        </div>
      </section>
      <section className="hidden md:block w-1/2 ">
        <img
          className="h-full w-full object-contain"
          src={bgImage}
          alt="Login illustration"
        />
      </section>
    </div>
  );
}

export default Login;
