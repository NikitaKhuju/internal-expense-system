import SignUpAlertDialog from "@/components/signup-alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function Login() {
  return (
    <div className="flex flex-row h-screen ">
      <section className="w-2/5 p-8 flex flex-col justify-between">
        <div>InternalSys</div>
        <form className="px-30">
          <FieldGroup>
            <FieldSet>
              <div>
                <h1 className="text-2xl font-bold">Sign in</h1>
                <FieldDescription>Enter your credentials.</FieldDescription>
              </div>
              <FieldGroup>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input placeholder="Please enter your email " required />
                </Field>
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input placeholder="Please enter your password " required />
                </Field>
              </FieldGroup>
              <Button>Sign in</Button>
              <span className="flex flex-row gap-2">
                Don't have an account? <SignUpAlertDialog />
              </span>
            </FieldSet>
          </FieldGroup>
        </form>
        <div className="flex flex-row justify-between text-sm text-zinc-500">
          <p>&copy; internalSys.com</p>
          <p>internalsys@gmail.com</p>
        </div>
      </section>
      <section className="w-3/5">
        <img
          className="h-full"
          src="https://cdn.dribbble.com/userupload/43654274/file/original-937b26b656b93bbcac1b0f567912a843.jpg?resize=1504x967&vertical=center"
        />
      </section>
    </div>
  );
}
export default Login;
