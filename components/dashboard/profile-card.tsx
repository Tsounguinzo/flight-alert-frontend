import { User } from "@supabase/supabase-js";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Avatar,
} from "@nextui-org/react";

type ProfileCardProps = {
  user: User;
};

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-auto bg-gray-100/10 text-card-foreground">
      <CardHeader className="pb-4">
        <h1 className="text-xl font-semibold">Profile</h1>
      </CardHeader>
      <CardBody className="flex flex-row flex-grow space-x-4 pt-4">
        <Avatar
          className="h-16 w-16 uppercase text-lg"
          fallback={
            user?.user_metadata.full_name?.[0] || user?.email?.[0] || "U"
          }
          src={user.user_metadata.avatar_url}
        />
        <div className="mt-2">
          <p className="text-lg font-medium">
            {user?.user_metadata.full_name || "User"}
          </p>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
      </CardBody>
      <CardFooter className="mt-auto pt-4">
        {user?.app_metadata.provider === "email" && (
          <Button as={Link} className="ml-auto p-2" href={"/update-password"}>
            Update Password
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
