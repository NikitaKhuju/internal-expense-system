import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { AlertDialogTrigger } from "./ui/alert-dialog";

type LogoutAlertDialogProps = {
  onLogout: () => void;
  userName: string;
};

export default function LogoutAlertDialogProps({
  onLogout,
  userName,
}: LogoutAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <p className="font-bold hover:cursor-pointer">{userName}</p>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log out ?</AlertDialogTitle>

          <AlertDialogDescription>
            You’re about to log out of your account. You’ll need to sign in
            again to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600"
          >
            {" "}
            Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
